"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const menu = [
    { name: "হোম", path: "/" },
    { name: "ডাক্তার", path: "/doctors" },
    { name: "সেবা সমূহ", path: "/services" },
  ];

  const dashboardPath = user?.role === "admin" ? "/admin" : "/dashboard";

  const handleLogout = () => {
    logout();
    setOpen(false);
    setProfileOpen(false);
    router.push("/");
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur shadow-md" : "bg-white"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <Link href="/" className="text-2xl font-extrabold">
          <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            সেবাসাথী
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {menu.map((m) => (
            <Link
              key={m.path}
              href={m.path}
              className={`px-3 py-1 rounded-lg transition font-medium ${
                pathname === m.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {m.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href={dashboardPath}
                className={`px-4 py-1.5 rounded-lg text-white font-semibold ${
                  user.role === "admin"
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {user.role === "admin" ? "Admin Panel" : "ড্যাশবোর্ড"}
              </Link>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl hover:bg-blue-100"
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-green-500 text-white flex items-center justify-center font-bold">
                    {(user.name || "U").charAt(0).toUpperCase()}
                  </span>

                  <span className="font-bold text-gray-800">
                    {user.name || "User"}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border p-3">
                    <p className="font-bold text-gray-800">
                      👤 {user.name || "User"}
                    </p>
                    <p className="text-sm text-gray-500 break-all mt-1">
                      {user.phone || user.email || "No contact"}
                    </p>

                    <div className="border-t my-3" />

                    <Link
                      href={dashboardPath}
                      onClick={() => setProfileOpen(false)}
                      className="block px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
                    >
                      📋 {user.role === "admin" ? "Admin Panel" : "Dashboard"}
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 font-medium"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
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

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl w-10 h-10 rounded-xl hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t px-4 pb-4 space-y-2 text-center shadow-lg">
          {user && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 mb-3 mt-3">
              <p className="font-bold text-gray-800">👤 {user.name || "User"}</p>
              <p className="text-sm text-gray-500 break-all">
                {user.phone || user.email || "No contact"}
              </p>
            </div>
          )}

          {menu.map((m) => (
            <Link
              key={m.path}
              href={m.path}
              className={`block px-3 py-2 rounded-lg ${
                pathname === m.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {m.name}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                href="/login"
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                লগইন
              </Link>

              <Link
                href="/register"
                className="block bg-gray-200 px-4 py-2 rounded-lg"
              >
                রেজিস্টার
              </Link>
            </>
          ) : (
            <>
              <Link
                href={dashboardPath}
                className={`block text-white px-4 py-2 rounded-lg ${
                  user.role === "admin" ? "bg-purple-600" : "bg-green-500"
                }`}
              >
                {user.role === "admin" ? "Admin Panel" : "ড্যাশবোর্ড"}
              </Link>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                লগআউট
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}