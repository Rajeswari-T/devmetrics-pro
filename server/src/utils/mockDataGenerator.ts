// Mock data generator for DevMetrics Pro
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  productivity: number;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  members: TeamMember[];
  lead: string;
  velocity: number;
  activeSprintProgress: number;
}

export interface DashboardMetrics {
  todayCommits: number;
  activePRs: number;
  sprintProgress: number;
  teamVelocity: number;
  codeReviews: number;
  bugsFixed: number;
  testsAdded: number;
  deployments: number;
  trends: {
    commits: number;
    prs: number;
    velocity: number;
    reviews: number;
  };
}

// Mock teams data
const mockTeams: Team[] = [
  {
    id: 1,
    name: "Frontend Engineering",
    description: "React and UI development team",
    members: [
      {
        id: 1,
        name: "Sarah Chen",
        role: "Senior Frontend Engineer",
        email: "sarah@devmetrics.com",
        productivity: 0.9,
      },
      {
        id: 2,
        name: "Mike Rodriguez",
        role: "Frontend Engineer",
        email: "mike@devmetrics.com",
        productivity: 0.7,
      },
      {
        id: 3,
        name: "Emily Watson",
        role: "Junior Frontend Engineer",
        email: "emily@devmetrics.com",
        productivity: 0.5,
      },
      {
        id: 4,
        name: "David Kim",
        role: "Frontend Engineer",
        email: "david@devmetrics.com",
        productivity: 0.8,
      },
    ],
    lead: "Sarah Chen",
    velocity: 42,
    activeSprintProgress: 67,
  },
  {
    id: 2,
    name: "Backend Engineering",
    description: "API and database development team",
    members: [
      {
        id: 5,
        name: "Alex Thompson",
        role: "Senior Backend Engineer",
        email: "alex@devmetrics.com",
        productivity: 0.85,
      },
      {
        id: 6,
        name: "Lisa Park",
        role: "Backend Engineer",
        email: "lisa@devmetrics.com",
        productivity: 0.75,
      },
      {
        id: 7,
        name: "James Wilson",
        role: "DevOps Engineer",
        email: "james@devmetrics.com",
        productivity: 0.8,
      },
    ],
    lead: "Alex Thompson",
    velocity: 38,
    activeSprintProgress: 73,
  },
  {
    id: 3,
    name: "DevOps Team",
    description: "Infrastructure and deployment team",
    members: [
      {
        id: 8,
        name: "Maria Garcia",
        role: "DevOps Lead",
        email: "maria@devmetrics.com",
        productivity: 0.9,
      },
      {
        id: 9,
        name: "Tom Brown",
        role: "Infrastructure Engineer",
        email: "tom@devmetrics.com",
        productivity: 0.7,
      },
    ],
    lead: "Maria Garcia",
    velocity: 28,
    activeSprintProgress: 85,
  },
];

export function generateMockTeamData(teamId?: number | null): Team[] {
  if (teamId) {
    const team = mockTeams.find((t) => t.id === teamId);
    return team ? [team] : [];
  }
  return mockTeams;
}

export function generateMockDashboardData(
  teamId?: number | null,
  timeRange: string = "7d"
): any {
  const teams = generateMockTeamData(teamId);
  const isAllTeams = !teamId;

  // Calculate aggregate metrics
  const totalMembers = teams.reduce(
    (sum, team) => sum + team.members.length,
    0
  );
  const avgVelocity =
    teams.reduce((sum, team) => sum + team.velocity, 0) / teams.length;
  const avgProgress =
    teams.reduce((sum, team) => sum + team.activeSprintProgress, 0) /
    teams.length;

  // Generate realistic metrics based on team size and productivity
  const baseCommits = isAllTeams ? 45 : 25;
  const basePRs = isAllTeams ? 12 : 8;
  const baseReviews = isAllTeams ? 20 : 12;

  return {
    metrics: {
      todayCommits: baseCommits + Math.floor(Math.random() * 15),
      activePRs: basePRs + Math.floor(Math.random() * 8),
      sprintProgress: Math.round(avgProgress),
      teamVelocity: Math.round(avgVelocity),
      codeReviews: baseReviews + Math.floor(Math.random() * 10),
      bugsFixed: 8 + Math.floor(Math.random() * 12),
      testsAdded: 25 + Math.floor(Math.random() * 20),
      deployments: 2 + Math.floor(Math.random() * 4),
      trends: {
        commits: 12 + Math.floor(Math.random() * 16) - 8,
        prs: -2 + Math.floor(Math.random() * 8),
        velocity: 5 + Math.floor(Math.random() * 10),
        reviews: 3 + Math.floor(Math.random() * 8),
      },
    },
    teams: teams,
    timeRange,
    lastUpdated: new Date().toISOString(),
  };
}

export function generateMockMetrics(teamId?: number | null): DashboardMetrics {
  const teams = generateMockTeamData(teamId);
  const isAllTeams = !teamId;

  const baseMultiplier = isAllTeams ? 2.5 : 1;

  return {
    todayCommits: Math.floor((20 + Math.random() * 25) * baseMultiplier),
    activePRs: Math.floor((6 + Math.random() * 8) * baseMultiplier),
    sprintProgress: 60 + Math.floor(Math.random() * 35),
    teamVelocity: Math.floor((30 + Math.random() * 25) * baseMultiplier),
    codeReviews: Math.floor((10 + Math.random() * 15) * baseMultiplier),
    bugsFixed: Math.floor((5 + Math.random() * 15) * baseMultiplier),
    testsAdded: Math.floor((20 + Math.random() * 30) * baseMultiplier),
    deployments: Math.floor((1 + Math.random() * 4) * baseMultiplier),
    trends: {
      commits: -10 + Math.floor(Math.random() * 25),
      prs: -5 + Math.floor(Math.random() * 15),
      velocity: -3 + Math.floor(Math.random() * 12),
      reviews: -2 + Math.floor(Math.random() * 10),
    },
  };
}

export function generateCommitHistory(
  days: number = 7
): Array<{ date: string; commits: number }> {
  const history = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Generate realistic commit patterns (lower on weekends)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseCommits = isWeekend ? 3 : 12;
    const commits = baseCommits + Math.floor(Math.random() * 15);

    history.push({
      date: date.toISOString().split("T")[0],
      commits,
    });
  }

  return history;
}

export function generateSprintBurndown(): Array<{
  day: number;
  ideal: number;
  actual: number;
}> {
  const burndown = [];
  const totalStoryPoints = 80;
  let actualRemaining = totalStoryPoints;

  for (let day = 0; day <= 14; day++) {
    const idealRemaining = totalStoryPoints - (totalStoryPoints / 14) * day;

    if (day > 0) {
      // Simulate realistic sprint progress
      let dailyProgress;
      if (day <= 3) {
        dailyProgress = 1 + Math.random() * 3; // Slow start
      } else if (day <= 10) {
        dailyProgress = 4 + Math.random() * 6; // Steady progress
      } else {
        dailyProgress = 6 + Math.random() * 8; // End sprint push
      }

      actualRemaining = Math.max(0, actualRemaining - dailyProgress);
    }

    burndown.push({
      day,
      ideal: Math.round(idealRemaining),
      actual: Math.round(actualRemaining),
    });
  }

  return burndown;
}

export function generateCodeReviewMetrics(): Array<{
  member: string;
  given: number;
  received: number;
  avgTime: number;
}> {
  const members = ["Sarah", "Mike", "Emily", "David", "Alex"];

  return members.map((member) => ({
    member,
    given: 5 + Math.floor(Math.random() * 15),
    received: 3 + Math.floor(Math.random() * 12),
    avgTime: 2 + Math.floor(Math.random() * 8), // hours
  }));
}

export function generateProductivityTrends(
  weeks: number = 12
): Array<{ week: string; commits: number; prs: number; storyPoints: number }> {
  const trends = [];

  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - i * 7);

    // Generate realistic productivity trends with seasonal variation
    const baseCommits = 45 + Math.sin(i * 0.5) * 10;
    const basePRs = 12 + Math.sin(i * 0.3) * 3;
    const baseStoryPoints = 35 + Math.sin(i * 0.4) * 8;

    trends.push({
      week: `W${weeks - i}`,
      commits: Math.floor(baseCommits + Math.random() * 10),
      prs: Math.floor(basePRs + Math.random() * 4),
      storyPoints: Math.floor(baseStoryPoints + Math.random() * 6),
    });
  }

  return trends;
}
