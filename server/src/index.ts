import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import pool from "./database/connection.ts";
import dashboardRoutes from "./routes/dashboard.ts";
import teamsRoutes from "./routes/teams.ts";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// API Routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/teams", teamsRoutes);

// Basic health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Database health check
app.get("/api/db-health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "OK",
      database: "connected",
      timestamp: result.rows[0].now,
    });
  } catch (error: unknown) {
    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(500).json({
      status: "ERROR",
      database: "disconnected",
      error: message,
    });
  }
});

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Handle team subscription for real-time updates
  socket.on("subscribe_team", (teamId) => {
    socket.join(`team_${teamId}`);
    console.log(`Client ${socket.id} subscribed to team ${teamId}`);
  });

  // Handle unsubscribe
  socket.on("unsubscribe_team", (teamId) => {
    socket.leave(`team_${teamId}`);
    console.log(`Client ${socket.id} unsubscribed from team ${teamId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Simulate real-time metric updates every 30 seconds
setInterval(() => {
  // Broadcast updated metrics to all connected clients
  io.emit("metrics_update", {
    todayCommits: Math.floor(Math.random() * 5) + 20,
    activePRs: Math.floor(Math.random() * 3) + 6,
    sprintProgress: Math.floor(Math.random() * 5) + 65,
    timestamp: new Date().toISOString(),
  });
}, 30000);

// Simulate team-specific updates every 45 seconds
setInterval(() => {
  const teams = [1, 2, 3]; // Frontend, Backend, DevOps

  teams.forEach((teamId) => {
    io.to(`team_${teamId}`).emit("team_metrics_update", {
      teamId,
      metrics: {
        velocity: Math.floor(Math.random() * 10) + 30,
        sprintProgress: Math.floor(Math.random() * 10) + 60,
        activeStories: Math.floor(Math.random() * 5) + 8,
      },
      timestamp: new Date().toISOString(),
    });
  });
}, 45000);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 DevMetrics Pro API ready`);
  console.log(`🔄 WebSocket server active`);
  console.log(`📡 Real-time updates enabled`);
});
