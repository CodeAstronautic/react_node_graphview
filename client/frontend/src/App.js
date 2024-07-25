import React, { useEffect, useState } from "react";
import VehicleForm from "./components/VehicleForm";
import VehicleChart from "./components/VehicleChart";
import "./App.css";
import axios from "axios";
const App = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState('');

  useEffect(() => {
    const fetchRoutes = async () => {
      const response = await axios.get('http://localhost:5000/api/routes');
      setRoutes(response.data);
    };
    fetchRoutes();
  }, []);
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };
  const handleRouteChange = async (event) => {
    setRoute(event.target.value);
    const response = await axios.get(`http://localhost:5000/api/vehicles/${event.target.value}`);
    setVehicles(response.data);
  };

  const handleVehicleChange = (event) => {
    const selectedVehicle = vehicles.find(vehicle => vehicle.name === event.target.value);
    handleVehicleSelect(selectedVehicle);
  };

  return (
    <div>
      <h1>Vehicle Stages App</h1>
      <select value={route} onChange={handleRouteChange}>
        <option value="">Select Route</option>
        {routes.map(route => (
          <option key={route?._id} value={route?.name}>{route?.name}</option>
        ))}
      </select>
      <select onChange={handleVehicleChange}>
        <option value="">Select Vehicle</option>
        {vehicles.map(vehicle => (
          <option key={vehicle.name} value={vehicle.name}>{vehicle.name}</option>
        ))}
      </select>
      <VehicleForm onVehicleSelect={handleVehicleSelect} />
      <VehicleChart vehicle={selectedVehicle} />
    </div>
  );
};

export default App;
