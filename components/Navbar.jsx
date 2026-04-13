"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        <span className="text-blue-600">সেবা</span>
        <span className="text-green-500">সাথী</span>
      </Link>

      {/* Menu */}
      <div className="flex gap-6 items-center font-medium">
        <Link href="/" className="hover:text-blue-600 transition">
          হোম
        </Link>

        <Link href="/doctors" className="hover:text-blue-600 transition">
          ডাক্তার
        </Link>

        <Link href="/services" className="hover:text-blue-600 transition">
          সেবা
        </Link>

        {!user ? (
          <>
            <Link href="/login" className="hover:text-blue-600">
              লগইন
            </Link>

            <Link
              href="/register"
              className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
            >
              রেজিস্টার
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="text-green-600">
              ড্যাশবোর্ড
            </Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              লগআউট
            </button>
          </>
        )}
      </div>
    </nav>
  );
}