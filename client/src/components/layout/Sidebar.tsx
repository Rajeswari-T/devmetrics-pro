import React from "react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", icon: "📊" },
  { name: "Teams", href: "/teams", icon: "👥" },
  { name: "Analytics", href: "/analytics", icon: "📈" },
  { name: "Settings", href: "/settings", icon: "⚙️" },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
        <h1 className="text-xl font-bold text-white">DevMetrics Pro</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">User</p>
            <p className="text-xs text-gray-500">Team Lead</p>
          </div>
        </div>
      </div>
    </div>
  );
};
