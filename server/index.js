import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import engineerRoutes from "./routes/engineerRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import bcrypt from "bcrypt";
import User from "./models/User.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// ✅ Register engineer routes here
app.use("/api/engineers", engineerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/auth", authRoutes);

// Default test route

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to Engineering Resource Management API" });
});
app.get("/seed-admin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("123456", 10);
    const admin = new User({
      name: "Rahul",
      email: "admin3@example.com",
      password: hashedPassword,
      role: "engineer"
    });
    await admin.save();
    res.send("✅ Admin user created successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
