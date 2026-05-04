"use client";

import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();

  const services = [
    {
      title: "ডাক্তার সেবা",
      icon: "👨‍⚕️",
      desc: "অভিজ্ঞ ডাক্তারদের সাথে সহজে অ্যাপয়েন্টমেন্ট বুক করুন",
      path: "/doctors",
      gradient: "from-blue-500 to-cyan-500",
      glow: "hover:shadow-blue-200",
    },
    {
      title: "যাতায়াত সেবা",
      icon: "🚗",
      desc: "Car / Ambulance বুক করুন সহজে ও দ্রুত",
      path: "/transport",
      gradient: "from-orange-400 to-red-500",
      glow: "hover:shadow-orange-200",
    },
    {
      title: "থাকার ব্যবস্থা",
      icon: "🏨",
      desc: "আপনার বাজেট অনুযায়ী হোটেল বুকিং করুন",
      path: "/hotel",
      gradient: "from-green-500 to-emerald-600",
      glow: "hover:shadow-green-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-8 md:px-8">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-3">
          🏥 আমাদের সেবাসমূহ
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          স্বাস্থ্যসেবা, যাতায়াত ও থাকার ব্যবস্থা — সবকিছু এক প্ল্যাটফর্মে
          সহজে বুক করুন
        </p>
      </div>

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            onClick={() => router.push(s.path)}
            className={`
              group relative overflow-hidden bg-white rounded-3xl p-7
              shadow-md hover:shadow-2xl ${s.glow}
              cursor-pointer transition-all duration-300
              hover:-translate-y-2 border border-gray-100
            `}
          >
            {/* TOP GLOW */}
            <div
              className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${s.gradient}`}
            />

            {/* ICON */}
            <div
              className={`
                w-24 h-24 mx-auto rounded-full
                bg-gradient-to-r ${s.gradient}
                flex items-center justify-center
                text-5xl shadow-lg mb-5
                group-hover:scale-110 transition
              `}
            >
              {s.icon}
            </div>

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
              {s.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-center text-sm leading-relaxed mb-6">
              {s.desc}
            </p>

            {/* BUTTON */}
            <button
              className={`
                w-full py-3 rounded-2xl text-white font-semibold
                bg-gradient-to-r ${s.gradient}
                shadow-md hover:scale-[1.02]
                transition-all duration-300
              `}
            >
              সেবা নিন →
            </button>

            {/* BACKGROUND DECOR */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-100 rounded-full opacity-40 group-hover:scale-125 transition duration-500" />
          </div>
        ))}
      </div>

      {/* BOTTOM SECTION */}
      <div className="max-w-5xl mx-auto mt-14 bg-white rounded-3xl shadow-md p-6 md:p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="font-bold text-lg text-gray-800">
              দ্রুত বুকিং
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              খুব সহজে কয়েক সেকেন্ডে বুকিং সম্পন্ন করুন
            </p>
          </div>

          <div>
            <div className="text-4xl mb-2">🛡️</div>
            <h3 className="font-bold text-lg text-gray-800">
              নিরাপদ সেবা
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              আপনার তথ্য ও বুকিং সম্পূর্ণ নিরাপদ
            </p>
          </div>

          <div>
            <div className="text-4xl mb-2">📞</div>
            <h3 className="font-bold text-lg text-gray-800">
              ২৪/৭ সাপোর্ট
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              প্রয়োজনে দ্রুত যোগাযোগ ও সহায়তা
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}