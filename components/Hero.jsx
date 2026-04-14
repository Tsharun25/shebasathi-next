"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white py-16 px-5 md:px-20">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            আপনার স্বাস্থ্য সেবায় <br /> 
            <span className="text-yellow-300">সেবাসাথী</span>
          </h1>

          <p className="mt-4 text-lg text-gray-100">
            গ্রাম থেকে শহর — সহজেই ডাক্তার, যাতায়াত ও থাকার ব্যবস্থা বুক করুন
          </p>

          <div className="mt-6 flex gap-4">
            <Link href="/doctors">
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
                ডাক্তার দেখুন
              </button>
            </Link>

            <Link href="/services">
              <button className="border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition">
                সেবা সমূহ
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:block">
          <img
            src="/doctor.png"
            alt="doctor"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
}