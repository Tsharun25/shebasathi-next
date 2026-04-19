"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "হোম", path: "/" },
    { name: "ডাক্তার", path: "/doctors" },
    { name: "সেবা সমূহ", path: "/services" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      {/* 🔝 MAIN NAV */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* 🔥 LOGO */}
        <Link href="/" className="text-2xl font-extrabold">
          <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            সেবাসাথী
          </span>
        </Link>

        {/* 🖥️ DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-4">

          {menu.map((m) => (
            <Link
              key={m.path}
              href={m.path}
              className={`
                px-3 py-1 rounded-lg transition font-medium
                ${
                  pathname === m.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                }
              `}
            >
              {m.name}
            </Link>
          ))}

          {/* 🔐 AUTH */}
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
              >
                ড্যাশবোর্ড
              </Link>

              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="bg-purple-600 text-white px-4 py-1 rounded-lg hover:bg-purple-700 transition"
                >
                  এডমিন
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
              >
                লগআউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`px-4 py-1 rounded-lg ${
                  pathname === "/login"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                লগইন
              </Link>

              <Link
                href="/register"
                className="px-4 py-1 rounded-lg hover:bg-gray-100"
              >
                রেজিস্টার
              </Link>
            </>
          )}
        </div>

        {/* 📱 MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      {open && (
        <div className="md:hidden text-center bg-white border-t px-4 pb-4 space-y-2">

          {menu.map((m) => (
            <Link
              key={m.path}
              href={m.path}
              onClick={() => setOpen(false)}
              className={`
                block px-3 py-2 rounded-lg
                ${
                  pathname === m.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100"
                }
              `}
            >
              {m.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block bg-green-500 text-white text-center py-2 rounded-lg"
              >
                ড্যাশবোর্ড
              </Link>

              {user.role === "admin" && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="block bg-purple-600 text-white text-center py-2 rounded-lg"
                >
                  এডমিন
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg"
              >
                লগআউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block hover:bg-gray-100 text-center py-2 rounded-lg"
              >
                লগইন
              </Link>

              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="block hover:bg-gray-100 text-center py-2 rounded-lg"
              >
                রেজিস্টার
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}