import express from "express";
import Job from "../models/Job.js";
import { verifyToken, isEmployer } from "../middleware/auth.js";

const router = express.Router();

// POST a new job (Employers only)
router.post("/post", verifyToken, isEmployer, async (req, res) => {
  try {
    const { title, description, company, location, type, applicationDeadline } = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      type,
      applicationDeadline
    });

    res.json({ message: "Job posted successfully", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all jobs (open to everyone)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.findAll({ order: [["createdAt", "DESC"]] });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
