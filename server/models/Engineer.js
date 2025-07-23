import mongoose from "mongoose";

const engineerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: [String],
  availability: { type: Number },
  role: { type: String, default: "engineer" }
});

export default mongoose.model("Engineer", engineerSchema);
