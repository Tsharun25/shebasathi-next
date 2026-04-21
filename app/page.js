"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 md:p-8">

      {/* 🔥 HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-extrabold text-blue-700">
          সেবা সাথী
        </h1>

        <p className="text-gray-600 mt-2 text-sm md:text-base">
          আপনার প্রয়োজনীয় সকল সেবা এক জায়গায়
        </p>

        {/* 📞 CONTACT */}
        <div className="mt-3 text-sm text-gray-600">
          📞 +880 1710071135 | 💬 WhatsApp: +880 1710071135
        </div>
      </div>

      {/* 🔥 SERVICE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* 👨‍⚕️ DOCTOR */}
        <div
          onClick={() => router.push("/doctors")}
          className="cursor-pointer rounded-2xl p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg hover:scale-105 transition duration-300"
        >
          <div className="text-4xl mb-3">👨‍⚕️</div>
          <h2 className="text-xl font-bold mb-1">ডাক্তার সেবা</h2>
          <p className="text-sm opacity-90">
            অভিজ্ঞ ডাক্তারদের সাথে সহজে অ্যাপয়েন্টমেন্ট বুক করুন
          </p>
        </div>

        {/* 🚗 TRANSPORT */}
        <div
          onClick={() => router.push("/book?type=transport")}
          className="cursor-pointer rounded-2xl p-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg hover:scale-105 transition duration-300"
        >
          <div className="text-4xl mb-3">🚗</div>
          <h2 className="text-xl font-bold mb-1">যাতায়াত</h2>
          <p className="text-sm opacity-90">
            সহজে গাড়ি / অ্যাম্বুলেন্স বুক করুন আপনার প্রয়োজন অনুযায়ী
          </p>
        </div>

        {/* 🏨 HOTEL */}
        <div
          onClick={() => router.push("/hotel")}
          className="cursor-pointer rounded-2xl p-6 bg-gradient-to-br from-green-500 to-emerald-700 text-white shadow-lg hover:scale-105 transition duration-300"
        >
          <div className="text-4xl mb-3">🏨</div>
          <h2 className="text-xl font-bold mb-1">থাকার ব্যবস্থা</h2>
          <p className="text-sm opacity-90">
            আপনার বাজেট অনুযায়ী হোটেল বুক করুন সহজে
          </p>
        </div>

      </div>

      {/* 🔥 EXTRA INFO SECTION */}
      <div className="mt-10 bg-white rounded-2xl shadow-md p-5 text-center">
        <h3 className="text-2xl font-bold text-gray-700 mb-2">
          কেন সেবা সাথী?
        </h3>

        <div className="grid md:grid-cols-3 gap-3 text-sm text-gray-600">
          <p className="text-lg font-bold">⚡ দ্রুত বুকিং</p>
          <p className="text-lg font-bold">💰 সাশ্রয়ী খরচ</p>
          <p className="text-lg font-bold">📱 সহজ ব্যবহার</p>
        </div>
      </div>

    </div>
  );
}