import express from "express";
import {
  createCase,
  getCases,
  updateCaseStatus,
} from "../controllers/caseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/cases", authMiddleware, createCase);
router.get("/cases", authMiddleware, getCases);
router.put("/cases/:id/status", authMiddleware, updateCaseStatus);

export default router;
