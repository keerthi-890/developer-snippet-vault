// This file just DEFINES the URLs for authentication
// and points each one to the matching controller function.

import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);   // POST /api/auth/register
router.post("/login", loginUser);         // POST /api/auth/login
router.post("/logout", protect, logoutUser); // POST /api/auth/logout (must be logged in)
router.get("/profile", protect, getUserProfile); // GET /api/auth/profile (must be logged in)

export default router;
