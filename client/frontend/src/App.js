// src/App.js

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import VehicleForm from "./components/VehicleForm";
import VehicleChart from "./components/VehicleChart";
import "./App.css";
import { getRoutes, getVehiclesByRoute } from "./apiService"; // Import the API service

const App = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState("");

  useEffect(() => {
    const fetchRoutes = async () => {
      const routesData = await getRoutes();
      setRoutes(routesData);
    };
    fetchRoutes();
  }, []);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleRouteChange = async (event) => {
    setRoute(event.target.value);
    const vehiclesData = await getVehiclesByRoute(event.target.value);
    setVehicles(vehiclesData);
  };

  const handleVehicleChange = (event) => {
    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.name === event.target.value
    );
    handleVehicleSelect(selectedVehicle);
  };

  return (
    <Router>
      <div>
        <h1>Vehicle Stages App</h1>
        <nav>
          <Link className="button" to="/">Home</Link>
          <Link className="button" to="/add">Add Stage</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="chart-container">
                <div className="form-container">
                  <select value={route} onChange={handleRouteChange} className="button">
                    <option value="">Select Route</option>
                    {routes.map((route) => (
                      <option key={route?._id} value={route?.name}>
                        {route?.name}
                      </option>
                    ))}
                  </select>
                  <select onChange={handleVehicleChange} className="button">
                    <option value="">Select Vehicle</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle.name} value={vehicle.name}>
                        {vehicle.name}
                      </option>
                    ))}
                  </select>
                </div>
                <VehicleChart vehicle={selectedVehicle} />
              </div>
            }
          />
          <Route path="/add" element={<VehicleForm onVehicleSelect={handleVehicleSelect} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
