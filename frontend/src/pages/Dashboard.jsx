import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../api/snippets.js";
import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { userInfo } = useAuth();
  const [stats, setStats] = useState({
    totalSnippets: 0,
    favoriteSnippets: 0,
    recentSnippets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect with an empty dependency array [] runs ONCE
  // when the component first mounts (loads on screen).
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">
        Welcome back, {userInfo?.name} 👋
      </h1>
      <p className="text-gray-500 mb-6">Here's an overview of your snippet vault.</p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* --- Stat Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Total Snippets</p>
          <p className="text-3xl font-bold text-brand">{stats.totalSnippets}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Favorite Snippets</p>
          <p className="text-3xl font-bold text-yellow-500">{stats.favoriteSnippets}</p>
        </div>
      </div>

      {/* --- Recently Added --- */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recently Added</h2>
          <Link to="/snippets" className="text-sm text-brand font-medium">
            View all →
          </Link>
        </div>

        {stats.recentSnippets.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No snippets yet.{" "}
            <Link to="/snippets/new" className="text-brand font-medium">
              Add your first one!
            </Link>
          </p>
        ) : (
          <ul className="divide-y">
            {stats.recentSnippets.map((snippet) => (
              <li key={snippet._id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{snippet.title}</p>
                  <p className="text-xs text-gray-500">{snippet.language}</p>
                </div>
                {snippet.isFavorite && <span className="text-yellow-500">★</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
