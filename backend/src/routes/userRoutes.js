import express from "express";
import { getCompanyUsers } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", authMiddleware, getCompanyUsers);

export default router;
