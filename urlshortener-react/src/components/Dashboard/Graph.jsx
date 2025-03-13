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
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "#4F46E5"); // Indigo
          gradient.addColorStop(1, "#9333EA"); // Purple
          return gradient;
        },
        borderColor: "#4F46E5",
        borderWidth: 2,
        borderRadius: 12, // More rounded bars
        barThickness: 30, // Slightly thicker bars
        hoverBackgroundColor: "#6B21A8", // Darker hover effect
        categoryPercentage: 0.8,
        barPercentage: 0.9,
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
        text: "No Data Available.\nShare your short link to track engagements.",
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
          color: "#333",
          font: {
            size: 14,
            weight: "500",
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Softer grid
        },
        title: {
          display: true,
          text: "Number of Clicks",
          color: "#222",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      x: {
        ticks: {
          color: "#333",
          font: {
            size: 12,
            weight: "500",
          },
          maxRotation: 30, // Reduce rotation angle
          minRotation: 0,
          autoSkip: true, // Skip labels if too many
          maxTicksLimit: 7, // Limits number of visible labels
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Softer grid
        },
        title: {
          display: true,
          text: "Date",
          color: "#222",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
    animation: {
      duration: 1200,
      easing: "easeOutBounce",
    },
  };

  return (
    <div className="p-6 rounded-xl shadow-xl border border-gray-200 bg-white bg-opacity-60 backdrop-blur-md">
      {hasData ? (
        <div className="h-80">
          <Bar data={data} options={options} />
        </div>
      ) : (
        <p className="text-center text-gray-600">{options.plugins.title.text}</p>
      )}
    </div>
  );
};

export default Graph;
