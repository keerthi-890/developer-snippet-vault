import express from "express";
import {
  getSnippets,
  getSnippetById,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  getDashboardStats,
} from "../controllers/snippetController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Every snippet route requires the user to be logged in,
// so we apply the "protect" middleware to all of them.

// IMPORTANT: /stats/dashboard must be declared BEFORE /:id.
// Otherwise Express would think "stats" is an :id value!
router.get("/stats/dashboard", protect, getDashboardStats);

router.route("/")
  .get(protect, getSnippets)     // GET    /api/snippets  (list, search, filter)
  .post(protect, createSnippet); // POST   /api/snippets  (create)

router.route("/:id")
  .get(protect, getSnippetById)   // GET    /api/snippets/:id
  .put(protect, updateSnippet)    // PUT    /api/snippets/:id
  .delete(protect, deleteSnippet); // DELETE /api/snippets/:id

export default router;
