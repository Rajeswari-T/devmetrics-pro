import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <div className="ml-4 flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Live Updates Active</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Frontend Team</option>
              <option>Backend Team</option>
              <option>DevOps Team</option>
              <option>All Teams</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Custom Range</option>
            </select>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
            Export Data
          </button>

          <div className="flex items-center">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
              🔔
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
