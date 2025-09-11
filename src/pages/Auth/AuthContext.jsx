// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);

  //  On mount, check if user exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);


  useEffect(() => {
    console.log(" AuthContext user state updated:", user);
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setIsNewUser(false);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const signup = (userData) => {
    setUser(userData);
    setIsNewUser(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsNewUser(false);
    localStorage.removeItem("user");
  };

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  return (
    <AuthContext.Provider
      value={{ user, setUser, isNewUser, login, signup, logout, isAdmin, isUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
