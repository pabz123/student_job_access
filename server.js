import 'dotenv/config';
import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";

const app = express();
app.use(cors());
app.use(express.json());


// routes
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);
app.get("/", (req, res) => res.send("🚀 UniConnect API running with PostgreSQL"));

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log("✅ PostgreSQL connected");
    return sequelize.sync(); // auto-creates tables if missing
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch(err => console.error("❌ Database connection error:", err));
