import React, { useState } from "react";
import { Link } from "react-router-dom";

const SnippetCard = ({ snippet, onDelete, onToggleFavorite }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // navigator.clipboard is the built-in browser API for copying text
    await navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // reset the "Copied!" message
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-lg">{snippet.title}</h3>
          <div className="flex gap-2 mt-1">
            <span className="text-xs bg-indigo-50 text-brand px-2 py-0.5 rounded-full">
              {snippet.language}
            </span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {snippet.category}
            </span>
          </div>
        </div>

        <button
          onClick={() => onToggleFavorite(snippet)}
          title="Toggle favorite"
          className={`text-xl ${snippet.isFavorite ? "text-yellow-500" : "text-gray-300"}`}
        >
          ★
        </button>
      </div>

      {snippet.description && (
        <p className="text-sm text-gray-600 mb-3">{snippet.description}</p>
      )}

      <pre className="bg-gray-900 text-gray-100 text-sm p-3 rounded-md overflow-x-auto mb-3">
        <code>{snippet.code}</code>
      </pre>

      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={handleCopy}
          className="text-gray-600 hover:text-brand font-medium"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
        <Link
          to={`/snippets/edit/${snippet._id}`}
          className="text-gray-600 hover:text-brand font-medium"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(snippet._id)}
          className="text-red-500 hover:text-red-700 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SnippetCard;
