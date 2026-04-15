"use client";

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// ✅ MUST EXPORT THIS
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // login
  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};