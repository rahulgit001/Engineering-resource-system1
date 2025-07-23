import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  engineerId: { type: mongoose.Schema.Types.ObjectId, ref: "Engineer", required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  allocatedPercent: { type: Number, required: true },
});

export default mongoose.model("Assignment", assignmentSchema);
