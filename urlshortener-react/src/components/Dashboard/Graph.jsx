import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
  Title,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler,
  Title
);

const Graph = ({ graphData }) => {
  const hasData = graphData && graphData.length > 0;

  const labels = hasData ? graphData.map((item) => item.clickDate) : [];
  const userPerDay = hasData ? graphData.map((item) => item.count) : [];

  const data = {
    labels,
    datasets: [
      {
        label: "Total Clicks",
        data: userPerDay,
        backgroundColor: "rgba(54, 162, 235, 0.5)", // Soft blue
        borderColor: "#36A2EB",
        borderWidth: 1.5,
        borderRadius: 8, // Rounded bars
        barThickness: 24,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.7)", // Hover effect
        categoryPercentage: 0.8,
        barPercentage: 0.8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend for a cleaner look
      },
      tooltip: {
        backgroundColor: "#ffffff",
        bodyColor: "#333",
        borderColor: "#ddd",
        borderWidth: 1,
        displayColors: false,
      },
      title: {
        display: !hasData,
        text: "No Data For This Time Period\nShare your short link to view where your engagements are coming from.",
        color: "#888",
        font: {
          size: 16,
        },
        align: "center",
        padding: {
          top: 20,
          bottom: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#555",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Light grid
        },
        title: {
          display: true,
          text: "Number Of Clicks",
          color: "#444",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      x: {
        ticks: {
          color: "#555",
          font: {
            size: 12,
          },
          maxRotation: 30, // Reduce rotation angle
          minRotation: 0,
          autoSkip: true, // Skip labels if too many
          maxTicksLimit: 7, // Limits number of visible labels
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Light grid
        },
        title: {
          display: true,
          text: "Date",
          color: "#444",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md border">
      {hasData ? <Bar data={data} options={options} /> : <p className="text-center text-gray-500">{options.plugins.title.text}</p>}
    </div>
  );
};

export default Graph;
