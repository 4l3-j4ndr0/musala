## Routers

GET /gateways: Retrieves all gateways.
GET /gateways/:serialNumber: Retrieves a gateway by its serial number without its devices.
GET /gateways/:serialNumber/device: Retrieves a gateway by its serial number with its devices.
POST /create/gateways: Creates a new gateway. It also validates the request body using the validateCreate middleware.
POST /create/device/:serialNumber: Creates a new device at the specified gateway. It also validates the request body using the validateCreateDevice middleware.
DELETE /gateways/:serialNumber/devices/:deviceUid: Removes a device from the specified gateway.

// Route to retrieve all gateways router.get('/gateways', gatewaysController.getAllGateways);

// Route to retrieve a gateway by its serial number without its devices router.get('/gateways/:serialNumber', gatewaysController.getGatewayBySerialNumber);

// Route to retrieve a gateway by its serial number with its devices router.get('/gateways/:serialNumber/device', gatewaysController.getGatewayBySerialNumberWithDevices);

// Route to create a new gateway router.post('/create/gateways', validateCreate, gatewaysController.createGateway);

// Route to create a new device at the specified gateway router.post('/create/device/:serialNumber', validateCreateDevice, gatewaysController.addDeviceToGateway);

// Route to remove a device from the specified gateway router.delete('/gateways/:serialNumber/devices/:deviceUid', gatewaysController.removeDeviceFromGateway);

## Build Instructions:

1. Make sure you have Node.js installed on your machine. You can download and install it from the official Node.js website.
2. In the root directory of your project, run the following command at the command line to install the dependencies: npm install

### Execution instructions

1. Make sure you have completed the build step before continuing.
2. To start the Express server and run your REST API, run the following command: npm start
3. The server will run on the port specified in your code, previously set to port 3000. You can access the REST API via http://localhost:3000 (or whatever port you configured).

### Testing instructions

1. Make sure you have completed the build step before continuing.
2. To run automated tests against this REST API, a testing framework such as Jest is used.
3. Run your tests using the following command: npm test
4. Verify that all tests pass without errors.
