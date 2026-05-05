"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const services = [
    {
      title: "চিকিৎসা সহায়তা",
      desc: "অভিজ্ঞ ডাক্তার খুঁজে অ্যাপয়েন্টমেন্ট বুকিং ও সম্পূর্ণ গাইডলাইন",
      icon: "👨‍⚕️",
      color: "from-blue-600 to-cyan-500",
      path: "/doctors",
    },
    {
      title: "ঢাকা আসা-যাওয়া",
      desc: "গাড়ি / অ্যাম্বুলেন্স / রোগী পরিবহন সহজে বুকিং করুন",
      icon: "🚑",
      color: "from-orange-500 to-red-500",
      path: "/transport",
    },
    {
      title: "থাকার ব্যবস্থা",
      desc: "রোগী ও স্বজনদের জন্য নিরাপদ ও সাশ্রয়ী থাকার ব্যবস্থা",
      icon: "🏨",
      color: "from-green-600 to-emerald-500",
      path: "/hotel",
    },
  ];

  const features = [
    {
      icon: "⚡",
      title: "দ্রুত সহায়তা",
      desc: "জরুরি প্রয়োজনে দ্রুত সাপোর্ট",
    },
    {
      icon: "🤝",
      title: "বিশ্বস্ত সেবা",
      desc: "নিজের মানুষের মতো পাশে থাকি",
    },
    {
      icon: "💰",
      title: "সাশ্রয়ী খরচ",
      desc: "অতিরিক্ত ঝামেলা ও খরচ ছাড়াই সেবা",
    },
    {
      icon: "📞",
      title: "২৪/৭ যোগাযোগ",
      desc: "যেকোনো সময় যোগাযোগ করতে পারবেন",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative px-4 sm:px-5 md:px-8 pt-7 md:pt-16 pb-10 md:pb-14">
        <div className="absolute top-0 left-0 w-56 h-56 md:w-72 md:h-72 bg-blue-300/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-56 h-56 md:w-72 md:h-72 bg-green-300/20 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10 items-center relative z-10">
          {/* LEFT */}
          <div className="text-center md:text-left">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm mb-4 md:mb-5 shadow-sm">
              বিশ্বস্ত চিকিৎসা ও সহায়তা সেবা
            </div>

            <h1 className="text-[2.15rem] sm:text-4xl md:text-6xl font-extrabold leading-[1.15] text-gray-900">
              ঢাকায় চিকিৎসা ও প্রয়োজনীয় সেবায়
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mt-2">
                আপনার বিশ্বস্ত সহায়তাকারী
              </span>
            </h1>

            <p className="mt-5 md:mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
              গ্রাম থেকে ঢাকা আসা-যাওয়া, ডাক্তার অ্যাপয়েন্টমেন্ট,
              অ্যাম্বুলেন্স, গাড়ি ও থাকার ব্যবস্থা—
              <span className="font-semibold text-gray-800">
                {" "}
                সবকিছু আমরা সমন্বয় করে দিই।
              </span>
            </p>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-7 md:mt-8 max-w-md mx-auto md:mx-0">
              <button
                onClick={() => router.push("/services")}
                className="w-full px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold shadow-lg active:scale-[0.98] md:hover:scale-105 transition"
              >
                🚀 সেবা নিন
              </button>

              <a
                href="tel:+8801710071135"
                className="w-full px-6 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-50 active:scale-[0.98] transition text-center"
              >
                📞 যোগাযোগ করুন
              </a>
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-8 md:mt-10">
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-700">
                  ২৪/৭
                </h3>
                <p className="text-[11px] sm:text-sm text-gray-500">সহায়তা</p>
              </div>

              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-green-700">
                  ১০০+
                </h3>
                <p className="text-[11px] sm:text-sm text-gray-500">
                  সন্তুষ্ট পরিবার
                </p>
              </div>

              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow text-center">
                <h3 className="text-lg sm:text-2xl font-bold text-orange-600">
                  বিশ্বস্ত
                </h3>
                <p className="text-[11px] sm:text-sm text-gray-500">সেবা</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE AREA */}
          <div className="relative mt-2 md:mt-0">
            <div className="bg-white rounded-[28px] md:rounded-[35px] shadow-2xl p-3 sm:p-5 md:p-6 border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"
                alt="medical"
                className="rounded-3xl h-[260px] sm:h-[340px] md:h-[500px] w-full object-cover"
              />

              {/* Floating Card */}
              <div className="absolute -bottom-4 md:-bottom-5 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl px-4 sm:px-6 py-3 sm:py-4 w-[88%]">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-left">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800">
                      জরুরি সহায়তা
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      ডাক্তার / গাড়ি / থাকার ব্যবস্থা
                    </p>
                  </div>

                  <div className="bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
                    Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="px-4 sm:px-5 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-blue-600 font-bold mb-2">আমাদের সেবাসমূহ</p>

            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              আপনার প্রয়োজন অনুযায়ী
              <span className="block text-green-600 mt-2">
                সম্পূর্ণ সহায়তা
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                onClick={() => router.push(s.path)}
                className={`cursor-pointer rounded-[28px] md:rounded-[30px] p-6 md:p-7 text-white bg-gradient-to-br ${s.color} shadow-xl active:scale-[0.98] md:hover:scale-[1.03] transition duration-300 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

                <div className="text-5xl mb-5 relative z-10">{s.icon}</div>

                <h3 className="text-2xl font-bold mb-3 relative z-10">
                  {s.title}
                </h3>

                <p className="text-white/90 relative z-10 leading-relaxed">
                  {s.desc}
                </p>

                <button className="mt-6 w-full bg-white/20 hover:bg-white/30 px-5 py-3 rounded-xl font-semibold backdrop-blur relative z-10 transition">
                  বিস্তারিত দেখুন →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="px-4 sm:px-5 md:px-8 pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto bg-white rounded-[28px] md:rounded-[35px] shadow-xl p-5 sm:p-7 md:p-12">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-green-600 font-bold mb-2">কেন সেবা সাথী?</p>

            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              নিজের মানুষের মতো
              <span className="block text-blue-600 mt-2">
                পাশে থাকার প্রতিশ্রুতি
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-5 md:p-6 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl md:text-5xl mb-4">{f.icon}</div>

                <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-2">
                  {f.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-4 sm:px-5 md:px-8 pb-28 md:pb-20">
        <div className="max-w-6xl mx-auto rounded-[30px] md:rounded-[40px] bg-gradient-to-r from-blue-700 to-green-600 p-7 sm:p-10 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            আপনার পরিবারের পাশে
            <span className="block mt-2">আমরাই আছি</span>
          </h2>

          <p className="mt-5 text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            প্রবাসে থাকলেও চিন্তা নেই। আপনার পরিবারের চিকিৎসা, যাতায়াত
            ও থাকার ব্যবস্থা আমরা দেখভাল করবো।
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 justify-center gap-3 sm:gap-4 mt-8 max-w-md mx-auto">
            <button
              onClick={() => router.push("/services")}
              className="w-full px-7 py-3.5 rounded-2xl bg-white text-blue-700 font-bold active:scale-[0.98] md:hover:scale-105 transition"
            >
              🚀 এখনই শুরু করুন
            </button>

            <a
              href="https://wa.me/8801710071135"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-7 py-3.5 rounded-2xl border border-white/40 hover:bg-white/10 font-semibold transition text-center"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}