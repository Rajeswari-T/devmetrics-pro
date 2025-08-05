import React from "react";

export const Teams: React.FC = () => {
  const teams = [
    {
      id: 1,
      name: "Frontend Engineering",
      description: "React and UI development team",
      members: 4,
      lead: "Sarah Chen",
      velocity: 42,
      activeSprintProgress: 67,
    },
    {
      id: 2,
      name: "Backend Engineering",
      description: "API and database development team",
      members: 3,
      lead: "Alex Thompson",
      velocity: 38,
      activeSprintProgress: 73,
    },
    {
      id: 3,
      name: "DevOps Team",
      description: "Infrastructure and deployment team",
      members: 2,
      lead: "James Wilson",
      velocity: 28,
      activeSprintProgress: 85,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
          Add Team
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {team.name}
              </h3>
              <span className="text-sm text-gray-500">
                {team.members} members
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4">{team.description}</p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Team Lead</span>
                <span className="text-sm font-medium text-gray-900">
                  {team.lead}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Velocity</span>
                <span className="text-sm font-medium text-gray-900">
                  {team.velocity} pts/sprint
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Sprint Progress</span>
                <span className="text-sm font-medium text-green-600">
                  {team.activeSprintProgress}%
                </span>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${team.activeSprintProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-200">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
