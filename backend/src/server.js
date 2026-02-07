import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";


// 🔐 Routes
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// =======================
// Middlewares
// =======================
app.use(cors());
app.use(express.json());

// =======================
// Routes
// =======================
app.use("/api", leadRoutes);
app.use("/api", caseRoutes);
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("CRM SaaS Backend is running 🚀");
});

// Auth routes (register / login)
app.use("/api/auth", authRoutes);

// Protected routes (JWT required)
app.use("/api", dashboardRoutes);

// =======================
// Server
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
