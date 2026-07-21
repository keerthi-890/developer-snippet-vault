// This is the ENTRY POINT of our backend — the first file that runs.
// It sets up Express, connects to MongoDB, and wires up all our routes.

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import snippetRoutes from "./routes/snippetRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Load variables from .env into process.env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// --- Middleware ---
app.use(cors()); // allows our React frontend to call this API
app.use(express.json()); // lets us read JSON data sent in request bodies

// --- Routes ---
app.get("/", (req, res) => {
  res.send("Developer Snippet Vault API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/snippets", snippetRoutes);

// --- Error Handling (must be added AFTER routes) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
