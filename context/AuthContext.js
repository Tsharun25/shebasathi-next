"use client";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (!savedToken) {
          setAuthLoading(false);
          return;
        }

        setTokenState(savedToken);

        if (savedUser) {
          setUserState(JSON.parse(savedUser));
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUserState(null);
          setTokenState(null);
          return;
        }

        setUserState(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        console.log("AUTH LOAD ERROR:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUserState(null);
        setTokenState(null);
      } finally {
        setAuthLoading(false);
      }
    };

    loadAuth();
  }, []);

  const setUser = (newUser, newToken = null) => {
    setUserState(newUser);

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setTokenState(null);
      return;
    }

    if (newToken) {
      setTokenState(newToken);
      localStorage.setItem("token", newToken);
    }
  };

  const logout = () => {
    setUserState(null);
    setTokenState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        logout,
        authLoading,
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};