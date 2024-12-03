"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  
  
} from "chart.js";
import { useEffect, useState } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function RevenueChart({items}) {
    const [isDarkMode, setIsDarkMode] = useState(false);
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
            label: "Revenue",
            data: items?.map(item=>item?.data?.totalRevenue ?? 0),
            borderColor: isDarkMode ? "#ffffff" : "#000000", // Line color
            pointBackgroundColor: isDarkMode ? "#ffffff" : "#000000", // Point color
            pointBorderColor: isDarkMode ? "#ffffff" : "#000000",
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
            text: "Revenue Chart",
            color: isDarkMode ? "#ffffff" : "#000000",
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
    <section className="w-full border p-5 rounded-xl h-[300px]"> 
        <Line data={data}  options={options}/>
    </section>
  )
}