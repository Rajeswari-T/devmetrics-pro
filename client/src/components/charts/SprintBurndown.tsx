import React from "react";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const SprintBurndown: React.FC = () => {
  // Generate sprint burndown data (14-day sprint)
  const generateBurndownData = () => {
    const days = [];
    const idealBurndown = [];
    const actualBurndown = [];
    const totalStoryPoints = 80;

    // Generate 14 days of sprint data
    for (let i = 0; i <= 14; i++) {
      days.push(`Day ${i}`);

      // Ideal burndown (linear)
      idealBurndown.push(totalStoryPoints - (totalStoryPoints / 14) * i);

      // Actual burndown (more realistic with variations)
      if (i === 0) {
        actualBurndown.push(totalStoryPoints);
      } else {
        const previousValue = actualBurndown[i - 1];
        let dailyProgress;

        // Simulate realistic sprint patterns
        if (i <= 3) {
          // Slow start
          dailyProgress = 1 + Math.random() * 2;
        } else if (i <= 10) {
          // Steady progress
          dailyProgress = 4 + Math.random() * 4;
        } else {
          // Sprint end push
          dailyProgress = 6 + Math.random() * 6;
        }

        const newValue = Math.max(0, previousValue - dailyProgress);
        actualBurndown.push(newValue);
      }
    }

    return { days, idealBurndown, actualBurndown };
  };

  const { days, idealBurndown, actualBurndown } = generateBurndownData();

  const data = {
    labels: days,
    datasets: [
      {
        label: "Ideal Burndown",
        data: idealBurndown,
        borderColor: "rgb(156, 163, 175)",
        backgroundColor: "rgba(156, 163, 175, 0.1)",
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
      {
        label: "Actual Burndown",
        data: actualBurndown,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.2,
        pointBackgroundColor: "rgb(34, 197, 94)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
          color: "#374151",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(34, 197, 94, 0.5)",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          title: (context: any) => {
            return context[0].label;
          },
          label: (context: any) => {
            return `${context.dataset.label}: ${Math.round(context.parsed.y)} story points`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 11,
          },
          maxTicksLimit: 8,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
          callback: function (value: any) {
            return value + " pts";
          },
        },
        title: {
          display: true,
          text: "Story Points Remaining",
          color: "#374151",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
};
