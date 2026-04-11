"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({});
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    router.push("/login");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>

      <input
        placeholder="Name"
        className="border p-2 w-full"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

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
        Register
      </button>
    </form>
  );
}
