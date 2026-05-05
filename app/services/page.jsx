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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 sm:px-5 md:px-8 py-7 md:py-8 pb-28 md:pb-10">
      {/* HEADER */}
      <div className="text-center mb-8 md:mb-10">
        <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4">
          এক জায়গায় সব প্রয়োজনীয় সহায়তা
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-3 leading-tight">
          🏥 আমাদের সেবাসমূহ
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          স্বাস্থ্যসেবা, যাতায়াত ও থাকার ব্যবস্থা — সবকিছু এক প্ল্যাটফর্মে
          সহজে বুক করুন।
        </p>
      </div>

      {/* SERVICES */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            onClick={() => router.push(s.path)}
            className={`
              group relative overflow-hidden bg-white rounded-[28px] md:rounded-3xl p-6 md:p-7
              shadow-md hover:shadow-2xl ${s.glow}
              cursor-pointer transition-all duration-300
              active:scale-[0.98] md:hover:-translate-y-2 border border-gray-100
            `}
          >
            <div
              className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${s.gradient}`}
            />

            <div
              className={`
                w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full
                bg-gradient-to-r ${s.gradient}
                flex items-center justify-center
                text-4xl sm:text-5xl shadow-lg mb-5
                group-hover:scale-110 transition
              `}
            >
              {s.icon}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-3">
              {s.title}
            </h2>

            <p className="text-gray-500 text-center text-sm leading-relaxed mb-6 min-h-[44px]">
              {s.desc}
            </p>

            <button
              className={`
                w-full py-3.5 rounded-2xl text-white font-bold
                bg-gradient-to-r ${s.gradient}
                shadow-md active:scale-[0.98] md:hover:scale-[1.02]
                transition-all duration-300
              `}
            >
              সেবা নিন →
            </button>

            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gray-100 rounded-full opacity-40 group-hover:scale-125 transition duration-500" />
          </div>
        ))}
      </div>

      {/* BOTTOM SECTION */}
      <div className="max-w-5xl mx-auto mt-10 md:mt-14 bg-white rounded-[28px] md:rounded-3xl shadow-md p-5 sm:p-6 md:p-8 border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 text-center">
          <div className="bg-blue-50 sm:bg-transparent rounded-2xl p-4 sm:p-0">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="font-bold text-lg text-gray-800">দ্রুত বুকিং</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              খুব সহজে কয়েক সেকেন্ডে বুকিং সম্পন্ন করুন
            </p>
          </div>

          <div className="bg-green-50 sm:bg-transparent rounded-2xl p-4 sm:p-0">
            <div className="text-4xl mb-2">🛡️</div>
            <h3 className="font-bold text-lg text-gray-800">নিরাপদ সেবা</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              আপনার তথ্য ও বুকিং সম্পূর্ণ নিরাপদ
            </p>
          </div>

          <div className="bg-orange-50 sm:bg-transparent rounded-2xl p-4 sm:p-0">
            <div className="text-4xl mb-2">📞</div>
            <h3 className="font-bold text-lg text-gray-800">২৪/৭ সাপোর্ট</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              প্রয়োজনে দ্রুত যোগাযোগ ও সহায়তা
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}