"use client";

import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = () => {
    if (!name) return alert("Enter your name");
    auth.setUser({ name });
    router.push("/dashboard");
  };

  localStorage.setItem("user", JSON.stringify(data.user));

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-green-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl mb-4 text-center font-bold text-blue-600">
          Welcome Back
        </h2>

        <input
          className="border w-full p-2 mb-4 rounded"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full py-2 rounded-lg"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}