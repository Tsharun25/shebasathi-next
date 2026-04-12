"use client";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name) return alert("Enter name");

    auth?.setUser({ name });
    router.push("/dashboard");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Login</h1>

      <input
        className="border p-2 mr-2"
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}