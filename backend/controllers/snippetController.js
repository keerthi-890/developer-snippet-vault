// Logic for all snippet-related routes: create, read, update, delete,
// plus search/filter and dashboard stats.

import Snippet from "../models/Snippet.js";

// @desc    Get all snippets for the logged-in user (supports search & filter)
// @route   GET /api/snippets?search=...&language=...
// @access  Private
export const getSnippets = async (req, res, next) => {
  try {
    const { search, language } = req.query;

    // Base filter: only this user's snippets
    const filter = { user: req.user._id };

    // If a search term was provided, match it against the title
    // (case-insensitive using the "i" option)
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // If a language filter was provided (and isn't "All")
    if (language && language !== "All") {
      filter.language = language;
    }

    // Sort by newest first
    const snippets = await Snippet.find(filter).sort({ createdAt: -1 });

    res.json(snippets);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single snippet by id
// @route   GET /api/snippets/:id
// @access  Private
export const getSnippetById = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      res.status(404);
      throw new Error("Snippet not found");
    }

    // Make sure this snippet belongs to the logged-in user
    if (snippet.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to view this snippet");
    }

    res.json(snippet);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new snippet
// @route   POST /api/snippets
// @access  Private
export const createSnippet = async (req, res, next) => {
  try {
    const { title, language, category, description, code, isFavorite } = req.body;

    // --- Backend validation ---
    if (!title || !language || !category || !code) {
      res.status(400);
      throw new Error("Title, language, category, and code are required");
    }

    const snippet = await Snippet.create({
      user: req.user._id,
      title,
      language,
      category,
      description,
      code,
      isFavorite: isFavorite || false,
    });

    res.status(201).json(snippet);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing snippet
// @route   PUT /api/snippets/:id
// @access  Private
export const updateSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      res.status(404);
      throw new Error("Snippet not found");
    }

    if (snippet.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to update this snippet");
    }

    // Update only the fields that were provided
    snippet.title = req.body.title ?? snippet.title;
    snippet.language = req.body.language ?? snippet.language;
    snippet.category = req.body.category ?? snippet.category;
    snippet.description = req.body.description ?? snippet.description;
    snippet.code = req.body.code ?? snippet.code;
    snippet.isFavorite = req.body.isFavorite ?? snippet.isFavorite;

    const updatedSnippet = await snippet.save();

    res.json(updatedSnippet);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a snippet
// @route   DELETE /api/snippets/:id
// @access  Private
export const deleteSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      res.status(404);
      throw new Error("Snippet not found");
    }

    if (snippet.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to delete this snippet");
    }

    await snippet.deleteOne();

    res.json({ message: "Snippet deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats (total, favorites, recent)
// @route   GET /api/snippets/stats/dashboard
// @access  Private
export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const totalSnippets = await Snippet.countDocuments({ user: userId });
    const favoriteSnippets = await Snippet.countDocuments({ user: userId, isFavorite: true });

    // Get the 5 most recently created snippets
    const recentSnippets = await Snippet.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalSnippets,
      favoriteSnippets,
      recentSnippets,
    });
  } catch (error) {
    next(error);
  }
};
