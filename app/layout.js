"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <Navbar />

          {children}

          {/* ✅ Scroll To Top Button */}
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="fixed bottom-5 right-5 bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
          >
            ↑
          </button>

        </AuthProvider>
      </body>
    </html>
  );
}