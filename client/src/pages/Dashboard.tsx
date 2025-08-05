import React, { useState, useEffect } from "react";
import { MetricCard } from "../components/dashboard/MetricCard";
import { CommitChart } from "../components/charts/CommitChart";
import { SprintBurndown } from "../components/charts/SprintBurndown";
import { CodeReviewMetrics } from "../components/charts/CodeReviewMetrics";
import { ProductivityTrends } from "../components/charts/ProductivityTrends";

export const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState({
    todayCommits: 23,
    activePRs: 8,
    sprintProgress: 67,
    teamVelocity: 42,
    codeReviews: 15,
    bugsFixed: 12,
    testsAdded: 34,
    deployments: 3,
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        todayCommits: prev.todayCommits + Math.floor(Math.random() * 3),
        activePRs: Math.max(0, prev.activePRs + (Math.random() > 0.7 ? 1 : -1)),
        sprintProgress: Math.min(100, prev.sprintProgress + Math.random() * 2),
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Team Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Today's Commits"
          value={metrics.todayCommits}
          trend={+12}
          icon="💻"
          isLive={isLive}
        />
        <MetricCard
          title="Active PRs"
          value={metrics.activePRs}
          trend={-2}
          icon="🔄"
          isLive={isLive}
        />
        <MetricCard
          title="Sprint Progress"
          value={`${metrics.sprintProgress}%`}
          trend={+5}
          icon="🎯"
          isLive={isLive}
        />
        <MetricCard
          title="Team Velocity"
          value={metrics.teamVelocity}
          trend={+8}
          icon="⚡"
          isLive={isLive}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Code Reviews"
          value={metrics.codeReviews}
          trend={+3}
          icon="👀"
          isLive={isLive}
        />
        <MetricCard
          title="Bugs Fixed"
          value={metrics.bugsFixed}
          trend={+7}
          icon="🐛"
          isLive={isLive}
        />
        <MetricCard
          title="Tests Added"
          value={metrics.testsAdded}
          trend={+15}
          icon="🧪"
          isLive={isLive}
        />
        <MetricCard
          title="Deployments"
          value={metrics.deployments}
          trend={0}
          icon="🚀"
          isLive={isLive}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Commit Activity
          </h3>
          <CommitChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sprint Burndown
          </h3>
          <SprintBurndown />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Code Review Metrics
          </h3>
          <CodeReviewMetrics />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Productivity Trends
          </h3>
          <ProductivityTrends />
        </div>
      </div>
    </div>
  );
};
