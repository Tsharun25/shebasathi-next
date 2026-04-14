"use client";

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow-md px-4 md:px-10 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-blue-600">
        সেবাসাথী
      </Link>

      <div className="space-x-4">
        <Link href="/">হোম</Link>
        <Link href="/doctors">ডাক্তার</Link>
        <Link href="/services">সেবা সমূহ</Link>

        {user ? (
          <Link href="/dashboard" className="text-green-600 font-semibold">
            ড্যাশবোর্ড
          </Link>
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