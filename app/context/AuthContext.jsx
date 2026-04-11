"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("sheba-user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (data) => {
    localStorage.setItem("sheba-user", JSON.stringify(data));
    setUser(data);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("sheba-user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
