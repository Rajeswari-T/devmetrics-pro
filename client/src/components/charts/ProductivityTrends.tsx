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

export const ProductivityTrends: React.FC = () => {
  // Generate productivity trends data for the last 12 weeks
  const generateProductivityData = () => {
    const weeks = [];
    const commits = [];
    const pullRequests = [];
    const storyPoints = [];

    for (let i = 11; i >= 0; i--) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - i * 7);
      weeks.push(`W${12 - i}`);

      // Generate realistic productivity trends
      const baseCommits = 45 + Math.sin(i * 0.5) * 10; // Seasonal variation
      const basePRs = 12 + Math.sin(i * 0.3) * 3;
      const baseStoryPoints = 35 + Math.sin(i * 0.4) * 8;

      commits.push(Math.floor(baseCommits + Math.random() * 10));
      pullRequests.push(Math.floor(basePRs + Math.random() * 4));
      storyPoints.push(Math.floor(baseStoryPoints + Math.random() * 6));
    }

    return { weeks, commits, pullRequests, storyPoints };
  };

  const { weeks, commits, pullRequests, storyPoints } =
    generateProductivityData();

  const data = {
    labels: weeks,
    datasets: [
      {
        label: "Commits",
        data: commits,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: "y",
      },
      {
        label: "Pull Requests",
        data: pullRequests,
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointBackgroundColor: "rgb(16, 185, 129)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: "y1",
      },
      {
        label: "Story Points",
        data: storyPoints,
        borderColor: "rgb(245, 158, 11)",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointBackgroundColor: "rgb(245, 158, 11)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        yAxisID: "y2",
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
        borderColor: "rgba(59, 130, 246, 0.5)",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          title: (context: any) => {
            return `Week ${context[0].label}`;
          },
          label: (context: any) => {
            const label = context.dataset.label;
            const value = context.parsed.y;
            if (label === "Commits") return `${label}: ${value}`;
            if (label === "Pull Requests") return `${label}: ${value}`;
            if (label === "Story Points") return `${label}: ${value}`;
            return `${label}: ${value}`;
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
        },
      },
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
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
            size: 11,
          },
        },
        title: {
          display: true,
          text: "Commits",
          color: "rgb(59, 130, 246)",
          font: {
            size: 11,
            weight: "bold",
          },
        },
      },
      y1: {
        type: "linear" as const,
        display: false,
        position: "right" as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear" as const,
        display: false,
        position: "right" as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
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
