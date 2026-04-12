"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white">
      <h1 className="font-bold text-xl">ShebaSathi</h1>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}