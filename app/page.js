"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const services = [
    {
      title: "চিকিৎসা সহায়তা",
      desc: "ডাক্তার খোঁজা, অ্যাপয়েন্টমেন্ট, হাসপাতাল গাইডলাইন ও ফলোআপে পাশে থাকি",
      icon: "👨‍⚕️",
      color: "from-blue-600 to-cyan-500",
      path: "/doctors",
    },
    {
      title: "ঢাকা আসা-যাওয়া",
      desc: "রোগী পরিবহন, গাড়ি/অ্যাম্বুলেন্স ও নিরাপদ যাতায়াত সমন্বয় করি",
      icon: "🚑",
      color: "from-orange-500 to-red-500",
      path: "/transport",
    },
    {
      title: "থাকার ব্যবস্থা",
      desc: "রোগী ও স্বজনদের জন্য হাসপাতালের কাছাকাছি থাকার ব্যবস্থা খুঁজে দিই",
      icon: "🏨",
      color: "from-green-600 to-emerald-500",
      path: "/hotel",
    },
  ];

  const whoWeHelp = [
    {
      icon: "🏡",
      title: "গ্রাম থেকে আসা রোগী",
      desc: "ঢাকায় কোথায় যাবেন, কোথায় থাকবেন, কীভাবে ডাক্তার দেখাবেন — সবকিছুতে সহায়তা।",
    },
    {
      icon: "🌍",
      title: "প্রবাসীদের পরিবার",
      desc: "দেশে থাকা বাবা-মা বা আত্মীয়দের চিকিৎসা ও প্রয়োজনীয় কাজ সমন্বয় করতে পাশে থাকি।",
    },
    {
      icon: "👴",
      title: "বয়স্ক মানুষ",
      desc: "যাদের ঢাকায় নির্ভরযোগ্য মানুষ নেই, তাদের জন্য মানবিক সহায়তা ও গাইডলাইন।",
    },
  ];

  const steps = [
    {
      step: "১",
      title: "আপনি প্রয়োজন জানান",
      desc: "ডাক্তার, গাড়ি, অ্যাম্বুলেন্স বা থাকার ব্যবস্থা — কোন সেবা লাগবে জানান।",
    },
    {
      step: "২",
      title: "আমরা যাচাই ও সমন্বয় করি",
      desc: "সময়, জায়গা, খরচ ও প্রয়োজন অনুযায়ী suitable option খুঁজে দিই।",
    },
    {
      step: "৩",
      title: "আপনি confirmation পান",
      desc: "Booking ID, status, WhatsApp update ও dashboard থেকে সব দেখতে পারবেন।",
    },
  ];

  const trustPoints = [
    {
      icon: "🤝",
      title: "নিজের মানুষের মতো",
      desc: "শুধু booking নয়, পুরো প্রক্রিয়ায় human support.",
    },
    {
      icon: "📞",
      title: "Call/WhatsApp Support",
      desc: "জরুরি সময়ে দ্রুত যোগাযোগের ব্যবস্থা।",
    },
    {
      icon: "🧾",
      title: "Booking Slip",
      desc: "প্রতিটি booking-এর proof ও tracking সুবিধা।",
    },
    {
      icon: "💰",
      title: "পরিষ্কার Service Charge",
      desc: "সেবার বিনিময়ে service charge — hidden promise নয়।",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
      {/* HERO */}
      <section className="relative px-4 sm:px-5 md:px-8 pt-7 md:pt-16 pb-10 md:pb-16">
        <div className="absolute top-0 left-0 w-56 h-56 md:w-72 md:h-72 bg-blue-300/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-56 h-56 md:w-72 md:h-72 bg-green-300/20 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10 items-center relative z-10">
          <div className="text-center md:text-left">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm mb-4 md:mb-5 shadow-sm">
              ঢাকায় চিকিৎসা সহায়তায় আপনার পাশে
            </div>

            <h1 className="text-[2.15rem] sm:text-4xl md:text-6xl font-extrabold leading-[1.15] text-gray-900">
              ঢাকায় কেউ না থাকলেও
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mt-2">
                সেবাসাথী আছে পাশে
              </span>
            </h1>

            <p className="mt-5 md:mt-6 text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
              গ্রাম থেকে আসা রোগী, প্রবাসীদের দেশে থাকা পরিবার, বা ঢাকায় একা
              চিকিৎসা নিতে আসা মানুষের জন্য ডাক্তার, যাতায়াত, থাকার ব্যবস্থা ও
              প্রয়োজনীয় সহায়তা আমরা সমন্বয় করি।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-7 md:mt-8 max-w-md mx-auto md:mx-0">
              <button
                onClick={() => router.push("/services")}
                className="w-full px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 text-white font-bold shadow-lg active:scale-[0.98] md:hover:scale-105 transition"
              >
                🚀 সেবা নিন
              </button>

              <a
                href="https://wa.me/8801710071135"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-700 font-bold shadow hover:bg-gray-50 active:scale-[0.98] transition text-center"
              >
                💬 WhatsApp করুন
              </a>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mt-8 md:mt-10">
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow text-center border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-700">
                  ২৪/৭
                </h3>
                <p className="text-[11px] sm:text-sm text-gray-500">যোগাযোগ</p>
              </div>

              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow text-center border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-green-700">
                  ৩টি
                </h3>
                <p className="text-[11px] sm:text-sm text-gray-500">
                  মূল সেবা
                </p>
              </div>

              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow text-center border border-gray-100">
                <h3 className="text-lg sm:text-2xl font-bold text-orange-600">
                  মানবিক
                </h3>
                <p className="text-[11px] sm:text-sm text-gray-500">সহায়তা</p>
              </div>
            </div>
          </div>

          <div className="relative mt-2 md:mt-0">
            <div className="bg-white rounded-[28px] md:rounded-[35px] shadow-2xl p-3 sm:p-5 md:p-6 border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop"
                alt="medical support"
                className="rounded-3xl h-[260px] sm:h-[340px] md:h-[500px] w-full object-cover"
              />

              <div className="absolute -bottom-4 md:-bottom-5 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl px-4 sm:px-6 py-3 sm:py-4 w-[88%] border border-gray-100">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-left">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800">
                      জরুরি সহায়তা
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      ডাক্তার / গাড়ি / থাকা — এক জায়গায়
                    </p>
                  </div>

                  <a
                    href="tel:+8801710071135"
                    className="bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="px-4 sm:px-5 md:px-8 py-10 md:py-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-blue-600 font-bold mb-2">কার জন্য সেবাসাথী?</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              যাদের ঢাকায় নির্ভরযোগ্য
              <span className="block text-green-600 mt-2">মানুষ নেই</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whoWeHelp.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-[28px] shadow-md border border-gray-100 p-6 hover:shadow-xl transition"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-4 sm:px-5 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-blue-600 font-bold mb-2">আমাদের সেবাসমূহ</p>

            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              চিকিৎসার পথে প্রয়োজনীয়
              <span className="block text-green-600 mt-2">সম্পূর্ণ সহায়তা</span>
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

      {/* HOW IT WORKS */}
      <section className="px-4 sm:px-5 md:px-8 py-10 md:py-14">
        <div className="max-w-7xl mx-auto bg-white rounded-[30px] md:rounded-[40px] shadow-xl border border-gray-100 p-6 md:p-12">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-green-600 font-bold mb-2">কীভাবে কাজ করে?</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              সহজ ৩ ধাপে
              <span className="block text-blue-600 mt-2">সেবা সম্পন্ন</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((item, i) => (
              <div
                key={i}
                className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-6 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 text-white flex items-center justify-center font-extrabold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-4 sm:px-5 md:px-8 py-10 md:py-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="bg-gradient-to-br from-blue-700 to-green-600 rounded-[32px] p-7 md:p-10 text-white shadow-2xl">
              <p className="font-bold text-white/80 mb-3">Service Charge Model</p>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                আমরা সেবার বিনিময়ে
                <span className="block mt-2">service charge নেই</span>
              </h2>
              <p className="mt-5 text-white/90 leading-relaxed">
                ShebaSathi ডাক্তার, পরিবহন বা হোটেলের মালিক নয়। আমরা আপনার
                প্রয়োজন অনুযায়ী trusted coordination, communication ও support
                service দিই। কাজের ধরন অনুযায়ী service charge জানানো হবে।
              </p>

              <button
                onClick={() => router.push("/services")}
                className="mt-7 w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white text-blue-700 font-bold active:scale-[0.98] md:hover:scale-105 transition"
              >
                সেবা বেছে নিন
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustPoints.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-md hover:shadow-xl transition"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EMERGENCY CTA */}
      <section className="px-4 sm:px-5 md:px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto bg-white rounded-[30px] shadow-xl border border-red-100 p-6 md:p-9">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-red-600 font-bold mb-2">জরুরি প্রয়োজন?</p>
              <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
                দ্রুত কথা বলুন আমাদের সাথে
              </h2>
              <p className="text-gray-600 mt-3 leading-relaxed">
                রোগী ঢাকায় আনা, অ্যাম্বুলেন্স, হাসপাতাল বা থাকার ব্যবস্থা নিয়ে
                দ্রুত সিদ্ধান্ত দরকার হলে সরাসরি call/WhatsApp করুন।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:w-[360px]">
              <a
                href="tel:+8801710071135"
                className="w-full px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-bold text-center shadow"
              >
                📞 Call করুন
              </a>

              <a
                href="https://wa.me/8801710071135"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3.5 rounded-2xl bg-green-600 text-white font-bold text-center shadow"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 sm:px-5 md:px-8 pb-28 md:pb-20">
        <div className="max-w-6xl mx-auto rounded-[30px] md:rounded-[40px] bg-gradient-to-r from-blue-700 to-green-600 p-7 sm:p-10 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            আপনার পরিবারের পাশে
            <span className="block mt-2">আমরাই আছি</span>
          </h2>

          <p className="mt-5 text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            প্রবাসে থাকলেও চিন্তা নেই। আপনার পরিবারের চিকিৎসা, যাতায়াত
            ও থাকার ব্যবস্থা আমরা যত্ন নিয়ে সমন্বয় করবো।
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