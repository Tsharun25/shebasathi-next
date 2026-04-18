"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center p-3">

        <Link href="/" className="font-bold text-xl text-blue-600">
          সেবা সাথী
        </Link>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-4 items-center">
          <Link href="/doctors">ডাক্তার</Link>
          <Link href="/transport/book">যাতায়াত</Link>
          <Link href="/hotel">হোটেল</Link>

          {user ? (
            <>
              <Link href="/dashboard">ড্যাশবোর্ড</Link>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="text-red-500"
              >
                লগআউট
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

      {/* MOBILE */}
      {open && (
        <div className="md:hidden flex flex-col gap-2 p-3 bg-gray-50">

          <Link href="/doctors" onClick={()=>setOpen(false)}>
            ডাক্তার
          </Link>

          <Link href="/transport/book" onClick={()=>setOpen(false)}>
            যাতায়াত
          </Link>

          <Link href="/hotel" onClick={()=>setOpen(false)}>
            হোটেল
          </Link>

          {user ? (
            <>
              <Link href="/dashboard" onClick={()=>setOpen(false)}>
                ড্যাশবোর্ড
              </Link>

              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="text-red-500 text-left"
              >
                লগআউট
              </button>
            </>
          ) : (
            <>
              <Link href="/login">লগইন</Link>
              <Link href="/register">রেজিস্টার</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}