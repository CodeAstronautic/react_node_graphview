// src/apiService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getRoutes = async () => {
  const response = await axios.get(`${API_BASE_URL}/routes`);
  return response.data;
};

export const getVehiclesByRoute = async (routeName) => {
  const response = await axios.get(`${API_BASE_URL}/vehicles/${routeName}`);
  return response.data;
};

export const getAllVehicles = async () => {
  const response = await axios.get(`${API_BASE_URL}/vehicles`);
  return response.data;
};

export const postVehicle = async (vehicleData) => {
  const response = await axios.post(`${API_BASE_URL}/vehicles`, vehicleData);
  return response.data;
};
