import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Property Prices ($)",
        data: [50000, 55000, 53000, 58000, 60000, 62000],
        borderColor: "#1976d2",
        backgroundColor: "rgba(25, 118, 210, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Price Trends</Typography>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default Chart;
