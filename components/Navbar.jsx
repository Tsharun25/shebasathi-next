"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

      {/* LOGO */}
      <Link href="/" className="text-2xl font-bold">
        <span className="text-blue-600">সেবা</span>
        <span className="text-green-500">সাথী</span>
      </Link>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-xl"
        onClick={() => setMenu(!menu)}
      >
        ☰
      </button>

      {/* MENU */}
      <div
        className={`${
          menu ? "block" : "hidden"
        } md:flex gap-6 items-center absolute md:static bg-white md:bg-transparent w-full md:w-auto left-0 top-14 p-4 md:p-0 shadow md:shadow-none`}
      >
        <Link href="/">হোম</Link>
        <Link href="/doctors">ডাক্তার</Link>
        <Link href="/services">সেবা সমূহ</Link>

        {!user ? (
          <>
            <Link href="/login">লগইন</Link>

            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              রেজিস্টার
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="text-green-600 font-semibold"
            >
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