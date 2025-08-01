import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  requiredSkills: [String],
  deadline: Date
});

export default mongoose.model("Project", projectSchema);
