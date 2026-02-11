import express from "express";
import cors from "cors";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

// Proper CORS config
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://customer-relationship.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("CRM Backend API is running 🚀");
});

export default app;
