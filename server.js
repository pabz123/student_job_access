import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import applicationRoutes from "./routes/applications.js";
import User from "./models/User.js";
import Job from "./models/Job.js";
import Application from "./models/Application.js";
import cors from "cors";
app.use(cors({ origin: "http://localhost:3000", credentials: true })); 


dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);

// Sync database
sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ PostgreSQL synced"))
  .catch((err) => console.error("❌ DB sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
