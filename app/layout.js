"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import MobileBottomNav from "../components/MobileBottomNav";

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body suppressHydrationWarning={true} className="bg-gray-50">
        <AuthProvider>
          <Navbar />

          <div className="bg-green-50 border-b border-green-100 py-2 px-3 text-sm">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <span className="font-medium text-gray-700">
                প্রয়োজনে যোগাযোগ করুনঃ
              </span>

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

          <div className="pb-20 md:pb-0">{children}</div>
          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
