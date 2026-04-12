"use client";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name) return alert("Enter your name");

    auth?.setUser({ name });
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 shadow-lg rounded-xl w-80">
        <h1 className="text-2xl mb-4 text-center">Login</h1>

        <input
          className="border w-full p-2 mb-4"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}