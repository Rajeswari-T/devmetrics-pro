import React from "react";
import { CommitChart } from "../components/charts/CommitChart";
import { ProductivityTrends } from "../components/charts/ProductivityTrends";
import { CodeReviewMetrics } from "../components/charts/CodeReviewMetrics";

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last 6 months</option>
            <option>Last year</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Team Velocity
          </h3>
          <p className="text-3xl font-bold text-blue-600">42.3</p>
          <p className="text-sm text-gray-500">
            Average story points per sprint
          </p>
          <div className="mt-2 text-sm text-green-600">
            ↗️ +8% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Code Quality
          </h3>
          <p className="text-3xl font-bold text-green-600">94.2%</p>
          <p className="text-sm text-gray-500">Test coverage average</p>
          <div className="mt-2 text-sm text-green-600">
            ↗️ +2% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Review Time
          </h3>
          <p className="text-3xl font-bold text-yellow-600">4.2h</p>
          <p className="text-sm text-gray-500">Average PR review time</p>
          <div className="mt-2 text-sm text-red-600">
            ↘️ -12% from last month
          </div>
        </div>
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            12-Week Productivity Trends
          </h3>
          <ProductivityTrends />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Daily Commit Activity
          </h3>
          <CommitChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Code Review Distribution
          </h3>
          <CodeReviewMetrics />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Team Performance Comparison
          </h3>
          <div className="space-y-4">
            {["Frontend Team", "Backend Team", "DevOps Team"].map(
              (team, index) => (
                <div key={team} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {team}
                  </span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${85 - index * 10}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {85 - index * 10}%
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
