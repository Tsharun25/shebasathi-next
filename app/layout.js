"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body suppressHydrationWarning={true} className="bg-gray-50">
        <AuthProvider>
          <Navbar />
          {/* ✅ CONTACT BAR (ADD HERE) */}
          <div className="bg-green-50 border-b py-2 px-3 text-sm flex flex-wrap items-center justify-center gap-2">

  <span className="font-medium">
    প্রয়োজনে যোগাযোগ করুনঃ 01710071135
  </span>

  <a
    href="tel:+8801710071135"
    className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-green-100 transition text-green-700 font-medium"
  >
    📞 <span className="hidden sm:inline">Call</span>
  </a>

  <a
    href="https://wa.me/8801710071135"
    target="_blank"
    className="flex items-center gap-1 px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition font-medium"
  >
    💬 <span className="hidden sm:inline">WhatsApp</span>
  </a>

</div>

          {children}

          {/* ✅ Scroll To Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            ↑
          </button>
        </AuthProvider>
      </body>
    </html>
  );
}
