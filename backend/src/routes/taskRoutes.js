import express from "express";
import {
  createTask,
  getTasksByCase,
  updateTaskStatus,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/cases/:caseId/tasks", authMiddleware, createTask);
router.get("/cases/:caseId/tasks", authMiddleware, getTasksByCase);
router.put("/tasks/:taskId", authMiddleware, updateTaskStatus);

export default router;
