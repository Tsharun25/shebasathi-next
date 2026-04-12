"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const auth = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white">
      <h1 className="font-bold text-xl">ShebaSathi</h1>

      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/doctors">Doctors</Link>

        {auth?.user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button onClick={auth.logout}>Logout</button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}