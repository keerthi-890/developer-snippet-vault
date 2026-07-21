import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-brand">
        🔐 Snippet Vault
      </Link>

      {userInfo && (
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-brand">Dashboard</Link>
          <Link to="/snippets" className="hover:text-brand">Snippets</Link>
          <Link to="/snippets/new" className="hover:text-brand">Add Snippet</Link>
          <Link to="/profile" className="hover:text-brand">Profile</Link>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
