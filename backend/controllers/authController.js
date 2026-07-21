// This file contains the LOGIC for authentication routes.
// Routes just point to these functions; the functions do the real work.

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Snippet from "../models/Snippet.js";

// Helper function to create a JWT token for a given user id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // token stays valid for 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // --- Basic backend validation ---
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be at least 6 characters");
    }

    // Check if a user with this email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("A user with this email already exists");
    }

    // Create the user. The password gets hashed automatically
    // by the pre("save") hook we wrote in User.js
    const user = await User.create({ name, email, password });

    // Respond with user info + a token, so the frontend can log them in immediately
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error); // pass to our centralized error handler
  }
};

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check user exists AND password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401); // 401 = Unauthorized
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = (req, res) => {
  // Since we use JWT (stateless tokens, not server sessions),
  // "logging out" simply means the FRONTEND deletes the stored token.
  // This endpoint exists mainly for a clean, expected REST API pattern.
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get logged-in user's profile (with snippet count)
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    // req.user was attached by our authMiddleware after verifying the token
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Count how many snippets this user has created
    const totalSnippets = await Snippet.countDocuments({ user: req.user._id });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      totalSnippets,
    });
  } catch (error) {
    next(error);
  }
};
