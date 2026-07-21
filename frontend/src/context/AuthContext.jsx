import React, { createContext, useState, useContext } from "react";

// React Context lets us share data (like "who is logged in")
// across many components WITHOUT passing props down manually at every level.

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Try to load saved login info from localStorage when the app first loads.
  // This means refreshing the page doesn't log the user out.
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem("userInfo");
    return saved ? JSON.parse(saved) : null;
  });

  // Call this after a successful login/register
  const login = (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUserInfo(data);
  };

  // Call this to log the user out
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook so components can just call useAuth() instead of
// importing useContext + AuthContext every time.
export const useAuth = () => useContext(AuthContext);
