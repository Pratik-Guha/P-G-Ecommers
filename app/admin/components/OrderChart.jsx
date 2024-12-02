"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function OrderChart({items}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode dynamically
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    window.addEventListener("change", checkDarkMode);

    return () => {
      window.removeEventListener("change", checkDarkMode);
    };
  }, []);

  const data = {
    labels: items?.map(item=>item?.date),
    datasets: [
      {
        label: "Orders",
        data: items?.map(item=>item?.data?.totalOrders ?? 0),
        backgroundColor: isDarkMode ? "#4caf50" : "#2196f3", // Bar fill color
        borderColor: isDarkMode ? "#ffffff" : "#000000", // Bar border color
        borderWidth: 1, // Border width for better visibility
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDarkMode ? "#ffffff" : "#000000", // Legend text color
        },
      },
      title: {
        display: true,
        text: "Order Chart",
        color: isDarkMode ? "#ffffff" : "#000000", // Title text color
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // No grid lines for x-axis
        },
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000", // X-axis labels color
        },
      },
      y: {
        grid: {
          color: isDarkMode ? "#555555" : "#e0e0e0", // Grid lines color
        },
        ticks: {
          color: isDarkMode ? "#ffffff" : "#000000", // Y-axis labels color
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <section className=" border p-5 rounded-xl h-[300px]">
      <Bar data={data} options={options} />
    </section>
  );
}
