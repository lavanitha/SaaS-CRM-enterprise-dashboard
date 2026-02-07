import express from "express";
import cors from "cors";
import dashboardRoutes from "./routes/dashboardRoutes.js";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/dashboard", dashboardRoutes);


// Health check
app.get("/", (req, res) => {
  res.send("CRM Backend API is running 🚀");
});

export default app;
