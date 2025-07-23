import express from "express";
import Engineer from "../models/Engineer.js";

const router = express.Router();

// POST: Add engineer
router.post("/", async (req, res) => {
  try {
    const engineer = new Engineer(req.body);
    const saved = await engineer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: All engineers
router.get("/", async (req, res) => {
  try {
    const engineers = await Engineer.find();
    res.status(200).json(engineers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
