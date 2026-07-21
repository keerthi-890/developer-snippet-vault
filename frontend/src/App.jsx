import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Snippets from "./pages/Snippets.jsx";
import SnippetForm from "./pages/SnippetForm.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-5xl mx-auto p-6">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private routes - only visible when logged in */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/snippets"
            element={
              <PrivateRoute>
                <Snippets />
              </PrivateRoute>
            }
          />
          <Route
            path="/snippets/new"
            element={
              <PrivateRoute>
                <SnippetForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/snippets/edit/:id"
            element={
              <PrivateRoute>
                <SnippetForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
