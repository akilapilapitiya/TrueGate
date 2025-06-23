import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import "../styles/pages/Dashboard.css";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Sample data for line chart (API latency)
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "API Latency (ms)",
        data: [120, 110, 105, 115, 100, 90],
        fill: false,
        borderColor: "#3f51b5",
        tension: 0.3,
      },
    ],
  };

  // Sample data for bar chart (Request counts)
  const barData = {
    labels: ["GET", "POST", "PUT", "DELETE"],
    datasets: [
      {
        label: "Requests",
        data: [5000, 3000, 1200, 700],
        backgroundColor: ["#3f51b5", "#f50057", "#00bcd4", "#ff9800"],
      },
    ],
  };

  // Sample data for pie chart (Error rate distribution)
  const pieData = {
    labels: ["4xx Errors", "5xx Errors", "Success"],
    datasets: [
      {
        label: "Error Rate",
        data: [15, 5, 80],
        backgroundColor: ["#f44336", "#9c27b0", "#4caf50"],
      },
    ],
  };

  // Options with smaller chart sizes handled via CSS

  return (
    <div className="dashboard-container">
      <h2>API Performance Dashboard</h2>
      <div className="grid-container">
        <div className="chart-box">
          <h3>API Latency (ms)</h3>
          <Line data={lineData} />
        </div>
        <div className="chart-box">
          <h3>Request Counts</h3>
          <Bar data={barData} />
        </div>
        <div className="chart-box">
          <h3>Error Rate Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-item">
          <h4>Total Requests</h4>
          <p>10,900</p>
        </div>
        <div className="stat-item">
          <h4>Average Latency</h4>
          <p>105 ms</p>
        </div>
        <div className="stat-item">
          <h4>Error Rate</h4>
          <p>20%</p>
        </div>
        <div className="stat-item">
          <h4>Uptime</h4>
          <p>99.9%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
