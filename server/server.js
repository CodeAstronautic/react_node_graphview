const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vehicleRoutes = require("./routes/vehicleRoutes.js")
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/vehicleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("mongodb connected successfully");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});

// Routes
app.use('/api', vehicleRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
