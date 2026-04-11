"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-lg px-10 py-4 flex justify-between items-center sticky top-0 z-50">

      {/* LOGO */}
      <Link href="/">
        <img src="/logo.png" className="h-10 cursor-pointer" />
      </Link>

      {/* MENU */}
      <div className="flex items-center gap-6 font-medium text-gray-700">

        <Link href="/" className="hover:text-blue-600 transition">
          Home
        </Link>

        <Link href="/doctors" className="hover:text-blue-600 transition">
          Doctors
        </Link>

        <Link href="/login" className="hover:text-blue-600 transition">
          Login
        </Link>

        <Link
          href="/register"
          className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-5 py-2 rounded-full hover:scale-105 transition"
        >
          Register
        </Link>

      </div>
    </div>
  );
}