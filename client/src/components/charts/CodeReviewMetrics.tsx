import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const CodeReviewMetrics: React.FC = () => {
  // Generate code review metrics data
  const generateReviewData = () => {
    const teamMembers = ["Sarah", "Mike", "Emily", "David", "Alex"];
    const reviewsGiven = teamMembers.map(
      () => Math.floor(Math.random() * 15) + 5
    );
    const reviewsReceived = teamMembers.map(
      () => Math.floor(Math.random() * 12) + 3
    );
    const avgReviewTime = teamMembers.map(
      () => Math.floor(Math.random() * 8) + 2
    ); // hours

    return { teamMembers, reviewsGiven, reviewsReceived, avgReviewTime };
  };

  const { teamMembers, reviewsGiven, reviewsReceived, avgReviewTime } =
    generateReviewData();

  const data = {
    labels: teamMembers,
    datasets: [
      {
        label: "Reviews Given",
        data: reviewsGiven,
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgb(59, 130, 246)",
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: "Reviews Received",
        data: reviewsReceived,
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgb(16, 185, 129)",
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
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
            return context[0].label;
          },
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y}`;
          },
          afterBody: (context: any) => {
            const index = context[0].dataIndex;
            return [`Avg Review Time: ${avgReviewTime[index]}h`];
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
            size: 12,
          },
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
          stepSize: 5,
        },
        title: {
          display: true,
          text: "Number of Reviews",
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
      <Bar data={data} options={options} />
    </div>
  );
};
