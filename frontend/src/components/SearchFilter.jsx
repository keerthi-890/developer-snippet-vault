import React from "react";

// A simple list of common languages for the filter dropdown.
// In a bigger app, this might come from the backend dynamically.
const LANGUAGES = ["All", "JavaScript", "Python", "Java", "C++", "TypeScript", "Go", "Other"];

const SearchFilter = ({ search, onSearchChange, language, onLanguageChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search snippets by title..."
        className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
      />

      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
