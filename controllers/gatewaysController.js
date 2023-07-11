// controllers/gatewaysController.js


const { db } = require('../database/database');
const express = require('express');

const routerGateways = express.Router();
routerGateways.use(express.json());

const app = express();


const getAllGateways = (req, res) => {
    res.status(200).json(db);
};

const getGatewayBySerialNumber = (req, res) => {

    const gateway = db.gateways.find((gw) => gw.serial_number === req.params.serialNumber);
    let both = []
    if (!gateway) {
        return res.status(404).json({ error: 'Gateway not found' });
    }
    both.push(gateway)
    res.status(200).json(both)
};

const getGatewayBySerialNumberWithDevices = (req, res) => {

    const gateway = db.gateways.find((gw) => gw.serial_number === req.params.serialNumber);
    const devices = db.devices.filter(value => gateway.devices.includes(value.uid))
    let both = []
    if (!gateway) {
        return res.status(404).json({ error: 'Gateway not found' });
    }
    both.push(gateway)
    both.push(devices)
    res.status(200).json(both)
};

const createGateway = (req, res) => {
    
    const newGateway = req.body;
    let serial = db.gateways.find(value => value.serial_number == newGateway.serial_number)

    if (newGateway.devices.length >= 10 || serial) {
        if (newGateway.devices.length >= 10) {
            return res.status(400).json({ error: 'Maximum number of devices reached for this gateway' });
        }

        if (serial) {
            return res.status(400).json({ error: 'There is already a gateway with the same serial number. Please change it and try again.' });
        }
    } else {
        db.gateways.push(newGateway);
        res.status(201).json(newGateway);
    }
    
};

const addDeviceToGateway = (req, res) => {
    const newDevice = req.body;
    const serialNumber = req.params.serialNumber
    let gateway = db.gateways.find(value => value.serial_number.includes(serialNumber))
    if (!gateway) {
        return res.status(404).json({ error: 'Gateway not found' });
    }

    if (gateway.devices.length >= 10) {
        return res.status(400).json({ error: 'Maximum number of devices reached for this gateway' });
    }
    let device = gateway.devices.find(value => value == +newDevice.uid)
    
    
    if (device) {
        return res.status(400).json({ error: 'There is already a device with the same UID. Please change it and try again.' });
    }

    db.devices.push(newDevice);
    gateway.devices.push(newDevice.uid)
    res.status(201).json(newDevice);
};

const removeDeviceFromGateway = (req, res) => {

    const serial = req.params.serialNumber
    const deviceUid = req.params.deviceUid
    const gateway = db.gateways.find((value) => value.serial_number == serial);
    console.log('gateway ',gateway)
    if (!gateway) {
        return res.status(404).json({ error: 'Gateway not found' });
    }

    const deviceIndex = db.devices.findIndex((device) => device.uid == +deviceUid)
    const gatewayIndex = gateway.devices.findIndex((device) => device == +deviceUid)
    console.log('gatewayIndex ',gatewayIndex)
    console.log('deviceIndex ',deviceIndex)
    if (deviceIndex === -1) {
        return res.status(404).json({ error: 'Device not found' });
    }

    db.devices.splice(deviceIndex, 1);
    gateway.devices.splice(gatewayIndex,1)
    console.log(db)
    
    res.sendStatus(204)
};

module.exports = {
    getAllGateways,
    getGatewayBySerialNumber,
    getGatewayBySerialNumberWithDevices,
    createGateway,
    addDeviceToGateway,
    removeDeviceFromGateway,
};