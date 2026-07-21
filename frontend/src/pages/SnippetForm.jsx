import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSnippet, updateSnippet, getSnippetById } from "../api/snippets.js";

const initialState = {
  title: "",
  language: "",
  category: "",
  description: "",
  code: "",
  isFavorite: false,
};

const SnippetForm = () => {
  const { id } = useParams(); // present only when editing (route: /snippets/edit/:id)
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If we're editing, load the existing snippet's data into the form
  useEffect(() => {
    if (isEditMode) {
      const fetchSnippet = async () => {
        try {
          const data = await getSnippetById(id);
          setFormData({
            title: data.title,
            language: data.language,
            category: data.category,
            description: data.description || "",
            code: data.code,
            isFavorite: data.isFavorite,
          });
        } catch (err) {
          setError("Failed to load snippet");
        }
      };
      fetchSnippet();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // --- Frontend validation ---
    if (!formData.title || !formData.language || !formData.category || !formData.code) {
      setError("Title, language, category, and code are required");
      return;
    }

    try {
      setLoading(true);
      if (isEditMode) {
        await updateSnippet(id, formData);
      } else {
        await createSnippet(formData);
      }
      navigate("/snippets");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save snippet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "Edit Snippet" : "Add New Snippet"}
      </h1>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="e.g. Debounce function"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="e.g. JavaScript"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
              placeholder="e.g. Utility Functions"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="Optional short description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Code</label>
          <textarea
            name="code"
            value={formData.code}
            onChange={handleChange}
            rows={8}
            className="w-full border rounded-md px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            placeholder="Paste your code here..."
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFavorite"
            name="isFavorite"
            checked={formData.isFavorite}
            onChange={handleChange}
          />
          <label htmlFor="isFavorite" className="text-sm">
            Mark as favorite
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand text-white py-2 rounded-md hover:bg-brand-dark disabled:opacity-50"
        >
          {loading ? "Saving..." : isEditMode ? "Update Snippet" : "Save Snippet"}
        </button>
      </form>
    </div>
  );
};

export default SnippetForm;
