const { db } = require('../database/database');
const app = require('../server');
const supertest = require('supertest');
beforeEach(() => {
  const initialData = {
    gateways: [],
    devices: []
  };
  db.gateways = initialData.gateways;
  db.devices = initialData.devices;
});

describe('Gateway API', () => {
  // Test cases for GET /gateways
  describe('GET /gateways', () => {
    it('should return all gateways and devices', async () => {
      const res = await supertest(app).get('/api/gateways');
      const gateway1 = {
      serial_number: "newGategay1",
      name: "Gateway 10",
      ipv4_address: "192.168.1.1",
      devices: []
    };
    const gateway2 = {
      serial_number: "newGategay2",
      name: "Gateway 11",
      ipv4_address: "192.168.1.10",
      devices: []
    };
      db.gateways.push(gateway1)
      db.gateways.push(gateway2)

      expect(res.statusCode).toEqual(200);
      expect(res.get('Content-Type')).toMatch(/application\/json/);
      expect(res.body).not.toEqual({});
    });
  });
  
  // Test cases for GET /gateways/:serialNumber
  describe('GET /gateways/:serialNumber', () => {
    it('should return a gateway by serial number without devices', async () => {
      const gateway = {
        serial_number: "serialNumberWithoutDevices",
        name: "Gateway 11",
        ipv4_address: "192.168.1.10",
        devices: []
      };
        db.gateways.push(gateway)
      const res = await supertest(app).get('/api/gateways/serialNumberWithoutDevices');
      expect(res.statusCode).toEqual(200);
      expect(res.get('Content-Type')).toMatch(/application\/json/);
      expect(res.body[0]).toEqual(gateway);
    });
    it('should not get a non-existent gateway', async () => {
      const res = await supertest(app).get(`/api/gateways/serialNumberWithoutDevicesInexist`);
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBe('Gateway not found');
    });
  });

  // Test cases for GET /gateways/:serialNumber/device
  describe('GET /gateways/:serialNumber/device', () => {
    it('should return a gateway by serial number with devices', async () => {
      const gateway = {
        serial_number: "serialNumberWithDevices",
        name: "Gateway 11",
        ipv4_address: "192.168.1.10",
        devices: [1]
      };
      const device = {
        uid: 1,
        vendor: "vendor 5",
        creation_date: "2023-07-08",
        status: "offline"
      };
        db.gateways.push(gateway)
        db.devices.push(device)
      const res = await supertest(app).get('/api/gateways/serialNumberWithDevices/device');
      expect(res.statusCode).toEqual(200);
      expect(res.get('Content-Type')).toMatch(/application\/json/);
    });
    it('should not get a non-existent gateway', async () => {
      
      const res = await supertest(app).get(`/api/gateways/serialNumberWithDevicesInexist`);
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBe('Gateway not found');
    });
  });

  // Test cases for POST /create/gateways
  describe('POST /create/gateways', () => {
    it('should create a new gateway', async () => {
      const gatewayData = {
      serial_number: "createGateway",
      name: "Gateway 10",
      ipv4_address: "192.168.1.1",
      devices: []
      };
      const res = await supertest(app).post('/api/create/gateways').send(gatewayData);
      expect(res.statusCode).toEqual(201);
      expect(res.get('Content-Type')).toMatch(/application\/json/);
    });
    it('should not create a new gateway with wrong ipv4_address', async () => {
      const gatewayData = {
      serial_number: "createGatewayWrongIP",
      name: "Gateway 10",
      ipv4_address: "192.168.1",
      devices: []
      };
      const res = await supertest(app).post('/api/create/gateways').send(gatewayData);
      expect(res.statusCode).toEqual(403);
      expect(res.body.errors.some(error => error.msg === 'Invalid IP')).toBeTruthy();
    });
  });

  // Test cases for POST /create/device/:serialNumber
  describe('POST /create/device/:serialNumber', () => {
    it('should screate device at the gateway', async () => {
      const gatewayData = {
        serial_number: "createDeviceAtGateway",
        name: "Gateway 10",
        ipv4_address: "192.168.1",
        devices: []
        };
        db.gateways.push(gatewayData)
      const deviceData = {
        uid: 1,
        vendor: "vendor 5",
        creation_date: "2023-07-08",
        status: "offline"
      };
      const res = await supertest(app).post(`/api/create/device/createDeviceAtGateway`).send(deviceData);
      expect(res.statusCode).toEqual(201);
      expect(res.get('Content-Type')).toMatch(/application\/json/);
    });
    it('should not screate device at the gateway inexist', async () => {
      const device = {
        "uid": 10,
      "vendor": "Vendor A",
      "creation_date": "2023-07-08",
      "status": "online"
      }
      const res = await supertest(app).post(`/api/create/device/createDeviceAtGatewayInexist`).send(device);
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBe('Gateway not found');
    });
    it('should not create a device on the gateway if the gateway has more than 10 devices', async () => {
      const gateway = {
        serial_number: "gatewayWithLimitDevice",
        name: "Gateway 11",
        ipv4_address: "192.168.1.10",
        devices: [1,2,3,4,5,6,7,8,9,10]
      };
        db.gateways.push(gateway)
      const device = {
        "uid": 11,
      "vendor": "Vendor A",
      "creation_date": "2023-07-08",
      "status": "online"
      }
      const res = await supertest(app).post(`/api/create/device/gatewayWithLimitDevice`).send(device);
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('Maximum number of devices reached for this gateway');
    });
    it('should not create a device on the gateway if the gateway already has the uid of the device to add', async () => {
      const gateway = {
        serial_number: "datewayWithSameDevice",
        name: "Gateway 11",
        ipv4_address: "192.168.1.10",
        devices: [1,2,3,4,5,6,7,8,9]
      };
        db.gateways.push(gateway)
      const device = {
        "uid": 9,
      "vendor": "Vendor A",
      "creation_date": "2023-07-08",
      "status": "online"
      }
      const res = await supertest(app).post(`/api/create/device/datewayWithSameDevice`).send(device);
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toBe('There is already a device with the same UID. Please change it and try again.');
    });
  });

  // Test cases for DELETE /gateways/:serialNumber/devices/:deviceUid
  describe('DELETE /gateways/:serialNumber/devices/:deviceUid', () => {
    it('should delete a device from a gateway', async () => {
      const gateway = {
        serial_number: "gatewayToDelete",
        name: "Gateway 11",
        ipv4_address: "192.168.1.10",
        devices: [1,2,3,4,5,6,7,8,9,10]
      };
      const device = {
        "uid": 7,
      "vendor": "Vendor A",
      "creation_date": "2023-07-08",
      "status": "online"
      }
      db.gateways.push(gateway)
      db.devices.push(device)
      const res = await supertest(app).delete('/api/gateways/gatewayToDelete/devices/7');
      expect(res.statusCode).toEqual(204);
    });
    it('you should not remove a device on the gateway if the gateway is not found', async () => {
      const res = await supertest(app).delete(`/api/gateways/gatewayToDeleteInexist/devices/6`);
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBe('Gateway not found');
    });
    it('you should not remove a device on the gateway if the device is not found', async () => {
      const gateway = {
        serial_number: "gatewayToDelete",
        name: "Gateway 11",
        ipv4_address: "192.168.1.10",
        devices: [1,2,3,4,5,6,7,8,9,10]
      };
      db.gateways.push(gateway)
      const res = await supertest(app).delete(`/api/gateways/gatewayToDelete/devices/uidInexist`);
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toBe('Device not found');
    });
  });
});
