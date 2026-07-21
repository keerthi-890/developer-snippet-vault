import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Wraps around any page that should only be visible to logged-in users.
// If there's no logged-in user, redirect to the login page.
const PrivateRoute = ({ children }) => {
  const { userInfo } = useAuth();

  return userInfo ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
