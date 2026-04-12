"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-white/80 backdrop-blur-md shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">

      {/* LOGO */}
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold text-blue-600">Sheba</span>
        <span className="text-2xl font-bold text-green-500">Sathi</span>
      </Link>

      {/* MENU */}
      <div className="flex gap-6 text-gray-700 font-medium items-center">

        <Link href="/" className="hover:text-blue-600 transition">
          হোম
        </Link>

        <Link href="/doctors" className="hover:text-blue-600 transition">
          ডাক্তার
        </Link>

        <Link href="/dashboard" className="hover:text-blue-600 transition">
          ড্যাশবোর্ড
        </Link>

        <Link href="/login" className="hover:text-blue-600 transition">
          লগইন
        </Link>

        <Link
          href="/register"
          className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-full hover:scale-105 transition"
        >
          রেজিস্টার
        </Link>

      </div>
    </div>
  );
}