import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSnippets, deleteSnippet, updateSnippet } from "../api/snippets.js";
import SnippetCard from "../components/SnippetCard.jsx";
import SearchFilter from "../components/SearchFilter.jsx";

const Snippets = () => {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch snippets whenever search or language changes.
  // This re-runs the effect automatically because they're in the dependency array.
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        setLoading(true);
        const data = await getSnippets(search, language);
        setSnippets(data);
      } catch (err) {
        setError("Failed to load snippets");
      } finally {
        setLoading(false);
      }
    };

    // A small delay (debounce) so we don't call the API on every keystroke
    const timeoutId = setTimeout(fetchSnippets, 300);
    return () => clearTimeout(timeoutId); // cleanup: cancel the previous timer
  }, [search, language]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this snippet?")) return;

    try {
      await deleteSnippet(id);
      // Remove it from local state so the UI updates instantly
      setSnippets((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError("Failed to delete snippet");
    }
  };

  const handleToggleFavorite = async (snippet) => {
    try {
      const updated = await updateSnippet(snippet._id, {
        isFavorite: !snippet.isFavorite,
      });
      setSnippets((prev) =>
        prev.map((s) => (s._id === updated._id ? updated : s))
      );
    } catch (err) {
      setError("Failed to update snippet");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Snippets</h1>
        <Link
          to="/snippets/new"
          className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark text-sm font-medium"
        >
          + Add Snippet
        </Link>
      </div>

      <SearchFilter
        search={search}
        onSearchChange={setSearch}
        language={language}
        onLanguageChange={setLanguage}
      />

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-500">Loading snippets...</p>
      ) : snippets.length === 0 ? (
        <p className="text-gray-500">No snippets found. Try adding one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Snippets;
