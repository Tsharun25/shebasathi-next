"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-blue-600 text-white flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
}