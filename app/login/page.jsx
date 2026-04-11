"use client";

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    login(data);
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>

      <input
        placeholder="Email"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button className="bg-blue-600 text-white w-full py-2">
        Login
      </button>
    </form>
  );
}
