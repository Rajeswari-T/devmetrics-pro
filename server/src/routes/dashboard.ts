import express from "express";
import {
  generateMockDashboardData,
  generateMockTeamData,
  generateMockMetrics,
} from "../utils/mockDataGenerator.ts";

const router = express.Router();

// Get main dashboard data - separate routes for with/without teamId
router.get("/overview", async (req, res) => {
  try {
    const timeRange = (req.query.range as string) || "7d";
    const dashboardData = generateMockDashboardData(null, timeRange);

    res.json({
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch dashboard data",
    });
  }
});

router.get("/overview/:teamId", async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId);
    const timeRange = (req.query.range as string) || "7d";
    const dashboardData = generateMockDashboardData(teamId, timeRange);

    res.json({
      success: true,
      data: dashboardData,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch dashboard data",
    });
  }
});

// Get real-time metrics - separate routes
router.get("/metrics", async (req, res) => {
  try {
    const metrics = generateMockMetrics(null);

    res.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch metrics",
    });
  }
});

router.get("/metrics/:teamId", async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId);
    const metrics = generateMockMetrics(teamId);

    res.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch metrics",
    });
  }
});

// Get historical trends - separate routes
router.get("/trends", async (req, res) => {
  try {
    const period = (req.query.period as string) || "12w";

    const trends = {
      commits: generateTrendData(period, "commits"),
      pullRequests: generateTrendData(period, "prs"),
      storyPoints: generateTrendData(period, "story_points"),
      codeReviews: generateTrendData(period, "reviews"),
    };

    res.json({
      success: true,
      data: trends,
      period,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch trends",
    });
  }
});

router.get("/trends/:teamId", async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId);
    const period = (req.query.period as string) || "12w";

    const trends = {
      commits: generateTrendData(period, "commits"),
      pullRequests: generateTrendData(period, "prs"),
      storyPoints: generateTrendData(period, "story_points"),
      codeReviews: generateTrendData(period, "reviews"),
    };

    res.json({
      success: true,
      data: trends,
      period,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch trends",
    });
  }
});

// Export dashboard data - separate routes
router.post("/export", async (req, res) => {
  try {
    const format = req.body.format || "csv";
    const timeRange = req.body.timeRange || "30d";
    const exportData = generateMockDashboardData(null, timeRange);

    res.json({
      success: true,
      data: {
        format,
        downloadUrl: `/api/downloads/dashboard-${Date.now()}.${format}`,
        generatedAt: new Date().toISOString(),
        recordCount: exportData.metrics?.length || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to generate export",
    });
  }
});

router.post("/export/:teamId", async (req, res) => {
  try {
    const teamId = parseInt(req.params.teamId);
    const format = req.body.format || "csv";
    const timeRange = req.body.timeRange || "30d";
    const exportData = generateMockDashboardData(teamId, timeRange);

    res.json({
      success: true,
      data: {
        format,
        downloadUrl: `/api/downloads/dashboard-${Date.now()}.${format}`,
        generatedAt: new Date().toISOString(),
        recordCount: exportData.metrics?.length || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to generate export",
    });
  }
});

// Helper function to generate trend data
function generateTrendData(period: string, type: string) {
  const periods = period === "12w" ? 12 : period === "6m" ? 24 : 7;
  const data = [];

  for (let i = periods - 1; i >= 0; i--) {
    const date = new Date();
    if (period === "12w") {
      date.setDate(date.getDate() - i * 7);
    } else if (period === "6m") {
      date.setDate(date.getDate() - i * 7);
    } else {
      date.setDate(date.getDate() - i);
    }

    let value;
    switch (type) {
      case "commits":
        value = 40 + Math.sin(i * 0.5) * 10 + Math.random() * 10;
        break;
      case "prs":
        value = 12 + Math.sin(i * 0.3) * 3 + Math.random() * 4;
        break;
      case "story_points":
        value = 35 + Math.sin(i * 0.4) * 8 + Math.random() * 6;
        break;
      case "reviews":
        value = 15 + Math.sin(i * 0.6) * 5 + Math.random() * 5;
        break;
      default:
        value = Math.random() * 50;
    }

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.floor(value),
    });
  }

  return data;
}

export default router;
