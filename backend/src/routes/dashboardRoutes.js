import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route
router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({
    message: "Welcome to Dashboard 🚀",
    user: req.user,
  });
});

export default router;
