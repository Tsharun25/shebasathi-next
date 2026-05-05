"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);

  const items = [
    { name: "হোম", icon: "🏠", path: "/" },
    { name: "সেবা", icon: "🏥", path: "/services" },
    {
      name: user?.role === "admin" ? "Admin" : "বুকিং",
      icon: user?.role === "admin" ? "🛡️" : "📋",
      path: user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/login",
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[999] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-5 items-center px-2 py-2">
        {items.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-xs font-bold transition ${
                active
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}

        <a
          href="tel:+8801710071135"
          className="flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-xs font-bold text-green-700 hover:bg-green-50"
        >
          <span className="text-xl">📞</span>
          <span>কল</span>
        </a>

        <a
          href="https://wa.me/8801710071135"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-xs font-bold text-white bg-green-600"
        >
          <span className="text-xl">💬</span>
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}