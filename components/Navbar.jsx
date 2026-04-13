"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <Link href="/" className="text-2xl font-bold text-green-600">
        সেবা সাথী
      </Link>

      <div className="flex gap-5 items-center">
        <Link href="/">হোম</Link>
        <Link href="/doctors">ডাক্তার</Link>
        <Link href="/services">সেবা সমূহ</Link>

        {user ? (
          <>
            <Link href="/dashboard">ড্যাশবোর্ড</Link>
            <button onClick={logout}>লগ আউট</button>
          </>
        ) : (
          <>
            <Link href="/login">লগইন</Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              রেজিস্টার
            </Link>
          </>
        )}
      </div>
    </div>
  );
}