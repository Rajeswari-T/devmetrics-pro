import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: string;
  isLive?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  icon,
  isLive = false,
}) => {
  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-600";
    if (trend < 0) return "text-red-600";
    return "text-gray-500";
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return "↗️";
    if (trend < 0) return "↘️";
    return "➡️";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{icon}</span>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          {isLive && (
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
              <span className="text-xs text-gray-500">Live</span>
            </div>
          )}

          <div
            className={`flex items-center text-sm font-medium ${getTrendColor(trend)}`}
          >
            <span className="mr-1">{getTrendIcon(trend)}</span>
            <span>{Math.abs(trend)}%</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-500">
          <span>vs last period</span>
          <span className={getTrendColor(trend)}>
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
        </div>

        {/* Progress bar for visual trend */}
        <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
          <div
            className={`h-1 rounded-full transition-all duration-300 ${
              trend > 0
                ? "bg-green-500"
                : trend < 0
                  ? "bg-red-500"
                  : "bg-gray-400"
            }`}
            style={{ width: `${Math.min(Math.abs(trend) * 2, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
