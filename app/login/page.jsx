"use client";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext"; // ✅ FIXED

export default function Login() {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("");

  const handleLogin = () => {
    auth?.setUser({ name });
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}