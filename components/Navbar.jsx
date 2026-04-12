"use client";

import Link from "next/link";

export default function Navbar() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between">
      <h1 className="font-bold text-xl">ShebaSathi</h1>

      <div className="flex gap-4">
        <Link href="/">হোম</Link>
        <Link href="/doctors">ডাক্তার</Link>

        {user ? (
          <>
            <Link href="/dashboard">ড্যাশবোর্ড</Link>
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