const Vehicle = require("../model/Vehicle");

const createVehicle = async (req, res) => {
  try {
    const { name, route, stages } = req.body;
    const newVehicle = new Vehicle({ name, route, stages });
    await newVehicle.save();
    res.status(201).send(newVehicle);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).send(vehicles);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getRoutes = async (req, res) => {
  try {
    const routes = await Vehicle.distinct("route");
    res.status(200).send(routes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getRoutesById = async (req, res) => {
    try {
        const { route } = req.params;
        const vehicles = await Vehicle.find({ route });
        res.status(200).send(vehicles);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
module.exports = {
  createVehicle,
  getVehicles,getRoutes,getRoutesById
};
