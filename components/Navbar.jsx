"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const auth = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <h1 className="font-bold text-xl text-blue-600">ShebaSathi</h1>

      <div className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/doctors">Doctors</Link>

        {auth?.user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <button
              onClick={auth.logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}