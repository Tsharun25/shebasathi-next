"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">

      <div className="flex items-center gap-2">
        <img src="/logo.png" className="h-8" />
        <span className="font-bold text-xl">ShebaSathi</span>
      </div>

      <div className="flex gap-5">
        <Link href="/">হোম</Link>
        <Link href="/doctors">ডাক্তার</Link>
        <Link href="/login">লগইন</Link>
        <Link href="/register">রেজিস্টার</Link>
      </div>
    </div>
  );
}