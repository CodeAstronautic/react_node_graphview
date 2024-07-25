import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const VehicleChart = ({ vehicle }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (vehicle) {
        const chartData = vehicle.stages.map((stage) => ({
          vehicle: vehicle.name,
          stage: stage.stageName,
          time: stage.time,
        }));
        setData(chartData);
      } else {
        const response = await axios.get("http://localhost:5000/api/vehicles");
        const chartData = response.data.flatMap((vehicle) =>
          vehicle.stages.map((stage) => ({
            vehicle: vehicle.name,
            stage: stage.stageName,
            time: stage.time,
          }))
        );
        setData(chartData);
      }
    };
    fetchData();
  }, [vehicle]);

  // Convert time string to a numerical value for proper plotting
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  const processedData = data.map((item) => ({
    ...item,
    time: formatTime(item.time),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={processedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          type="number"
          domain={[0, 24]}
          tickFormatter={(tick) =>
            `${Math.floor(tick)}:${tick % 1 === 0 ? "00" : "30"}`
          }
          label={{ value: "Time", position: "insideBottomRight", offset: 0 }}
        />
        <YAxis
          dataKey="stage"
          type="category"
          label={{ value: "Stages", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="stage"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          dot={{ fill: "red" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VehicleChart;
