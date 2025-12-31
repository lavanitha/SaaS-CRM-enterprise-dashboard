import express from "express";
import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ /api/leads
router
  .route("/leads")
  .post(authMiddleware, createLead)
  .get(authMiddleware, getLeads);

// ✅ /api/leads/:id
router
  .route("/leads/:id")
  .put(authMiddleware, updateLead)
  .delete(authMiddleware, deleteLead);

export default router;
