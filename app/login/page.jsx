"use client";

import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = () => {
    if (!name) return alert("Enter name");
    auth.setUser({ name });
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 shadow-lg rounded-xl w-80">
        <h2 className="text-xl mb-4">Login</h2>

        <input
          className="border w-full p-2 mb-4"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full py-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}