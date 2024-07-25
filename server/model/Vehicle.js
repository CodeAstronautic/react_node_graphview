const mongoose = require('mongoose');
const stageSchema = require('./Stage');

const vehicleSchema = new mongoose.Schema({
  name: String,
  route: String,
  stages: [stageSchema]
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
