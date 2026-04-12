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
    window.location.href = "/";
  };

  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

      {/* LOGO CLICKABLE */}
      <Link href="/" className="flex items-center gap-2 cursor-pointer">
        <img src="/logo.png" className="h-8" />
        <span className="font-bold text-xl text-blue-600">ShebaSathi</span>
      </Link>

      <div className="flex gap-5 items-center">

        <Link href="/">হোম</Link>
        <Link href="/doctors">ডাক্তার</Link>

        {user ? (
          <>
            <Link href="/dashboard">ড্যাশবোর্ড</Link>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              লগ আউট
            </button>
          </>
        ) : (
          <>
            <Link href="/login">লগইন</Link>
            <Link href="/register">রেজিস্টার</Link>
          </>
        )}
      </div>
    </div>
  );
}