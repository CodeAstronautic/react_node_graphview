const mongoose = require('mongoose');

const stageSchema = new mongoose.Schema({
  stageName: String,
  time: String
});

module.exports = stageSchema;
