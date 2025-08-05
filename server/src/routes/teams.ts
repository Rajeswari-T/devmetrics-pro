import express from "express";
import { generateMockTeamData } from "../utils/mockDataGenerator.ts";

const router = express.Router();

// Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = generateMockTeamData();

    res.json({
      success: true,
      data: teams,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch teams",
    });
  }
});

// Get specific team details
router.get("/:id", async (req, res) => {
  try {
    const teamId = parseInt(req.params.id);
    const teams = generateMockTeamData(teamId);

    if (teams.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Team not found",
      });
    }

    res.json({
      success: true,
      data: teams[0],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch team details",
    });
  }
});

// Get team members
router.get("/:id/members", async (req, res) => {
  try {
    const teamId = parseInt(req.params.id);
    const teams = generateMockTeamData(teamId);

    if (teams.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Team not found",
      });
    }

    res.json({
      success: true,
      data: teams[0].members,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch team members",
    });
  }
});

// Create new team (mock implementation)
router.post("/", async (req, res) => {
  try {
    const { name, description, leadId } = req.body;

    // Mock team creation
    const newTeam = {
      id: Date.now(), // Simple ID generation for demo
      name,
      description,
      members: [],
      lead: "TBD",
      velocity: 0,
      activeSprintProgress: 0,
    };

    res.status(201).json({
      success: true,
      data: newTeam,
      message: "Team created successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create team",
    });
  }
});

// Update team (mock implementation)
router.put("/:id", async (req, res) => {
  try {
    const teamId = parseInt(req.params.id);
    const { name, description, leadId } = req.body;

    // Mock team update
    const teams = generateMockTeamData(teamId);

    if (teams.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Team not found",
      });
    }

    const updatedTeam = {
      ...teams[0],
      name: name || teams[0].name,
      description: description || teams[0].description,
      // leadId would be used to update lead in real implementation
    };

    res.json({
      success: true,
      data: updatedTeam,
      message: "Team updated successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update team",
    });
  }
});

// Delete team (mock implementation)
router.delete("/:id", async (req, res) => {
  try {
    const teamId = parseInt(req.params.id);

    // Mock team deletion
    res.json({
      success: true,
      message: "Team deleted successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete team",
    });
  }
});

export default router;
