"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body suppressHydrationWarning={true} className="bg-gray-50">
        <AuthProvider>
          <Navbar />
          {/* ✅ CONTACT BAR (ADD HERE) */}

          <div className="bg-green-50 border-b border-green-100 py-2 px-3 text-sm">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              {/* Text */}
              <span className="font-medium text-gray-700">
                প্রয়োজনে যোগাযোগ করুনঃ
              </span>

              {/* Number + Actions */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="font-semibold text-gray-900 tracking-wide">
                  01710071135
                </span>

                <a
                  href="tel:+8801710071135"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md border border-green-200 text-green-700 hover:bg-green-100 transition-all duration-200"
                >
                  <FiPhone size={16} />
                  <span className="hidden sm:inline">Call</span>
                </a>

                <a
                  href="https://wa.me/8801710071135"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 rounded-md bg-[#25D366] text-white hover:bg-[#1ebe5d] transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FaWhatsapp size={16} />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {children}

          {/* ✅ Scroll To Top Button */}
          {/* <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            ↑
          </button> */}
        </AuthProvider>
      </body>
    </html>
  );
}
