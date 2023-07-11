// routes/gateways.js

const express = require('express');
const router = express.Router();
router.use(express.json())
const gatewaysController = require('../controllers/gatewaysController');
const { validateCreate } = require('../validator/gateway');
const { validateCreateDevice } = require('../validator/device');



// show all
router.get('/gateways', gatewaysController.getAllGateways);

// show gateway by serial number without its devices
router.get('/gateways/:serialNumber', gatewaysController.getGatewayBySerialNumber);

// show gateway by serial number with their devices
router.get('/gateways/:serialNumber/device', gatewaysController.getGatewayBySerialNumberWithDevices); //

// create a new gateway
router.post('/create/gateways',validateCreate , gatewaysController.createGateway);

// create device at the gateway
router.post('/create/device/:serialNumber',validateCreateDevice, gatewaysController.addDeviceToGateway);

// delete device from gateway
router.delete('/gateways/:serialNumber/devices/:deviceUid', gatewaysController.removeDeviceFromGateway);


module.exports = router;
