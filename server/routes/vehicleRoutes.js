const express = require('express');
const { createVehicle, getVehicles } = require('../controller/vehicleController');

const router = express.Router();

router.post('/vehicles', createVehicle);
router.get('/vehicles', getVehicles);
router.get('/routes', getVehicles);
router.get('/vehicles/:route', getVehicles);

module.exports = router;
