import express, { type Express } from "express";
import mongoose from "mongoose";

// Routes
import { authRouter } from "../routes/auth.routes.js";

function formatUptime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs}h ${mins}m ${secs}s`;
}

export const app: Express = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    uptime: formatUptime(process.uptime()),
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    discordBot: "unknown",
  });
});

app.use("/auth", authRouter);
