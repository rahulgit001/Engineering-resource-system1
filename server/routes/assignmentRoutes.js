import express from "express";
import Assignment from "../models/Assignment.js"; // adjust path as needed

const router = express.Router();

// ✅ GET: All assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find().populate("engineerId").populate("projectId");
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST: Create assignment with capacity check
router.post("/", async (req, res) => {
  const { engineerId, projectId, allocatedPercent } = req.body;

  try {
    // 1. Get total allocated percent for this engineer
    const currentAssignments = await Assignment.find({ engineerId });
    const totalAssigned = currentAssignments.reduce(
      (sum, a) => sum + a.allocatedPercent,
      0
    );

    // 2. Check if total would exceed 100%
    if (totalAssigned + allocatedPercent > 100) {
      return res.status(400).json({ error: "Engineer overallocated! Total would exceed 100%." });
    }

    // 3. Save new assignment
    const newAssignment = new Assignment({ engineerId, projectId, allocatedPercent });
    const saved = await newAssignment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;  // ✅ Required for ES Modules
