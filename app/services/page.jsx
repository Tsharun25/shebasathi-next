"use client";

import { useRouter } from "next/navigation";

const PHONE_NUMBER = "+8801710071135";
const DISPLAY_PHONE = "01710071135";
const WHATSAPP_NUMBER = "8801710071135";

const WHATSAPP_TEXT =
  "আসসালামু আলাইকুম, আমি ShebaSathi থেকে একটি সেবা নিতে চাই। ডাক্তার/গাড়ি/অ্যাম্বুলেন্স/থাকার ব্যবস্থা/রোগী সহায়তা বিষয়ে বিস্তারিত জানাবেন।";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_TEXT
)}`;

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Services() {
  const router = useRouter();

  const services = [
    {
      title: "ডাক্তার অ্যাপয়েন্টমেন্ট",
      simpleTitle: "ডাক্তার দেখাতে চাই",
      icon: "👨‍⚕️",
      desc: "ঢাকায় কোন ডাক্তার/হাসপাতালে যাবেন বুঝতে না পারলে আমরা প্রয়োজন অনুযায়ী গাইডলাইন ও অ্যাপয়েন্টমেন্ট সমন্বয় করি।",
      path: "/doctors",
      buttonText: "ডাক্তার সেবা নিন",
      badge: "চিকিৎসা সহায়তা",
      gradient: "from-blue-600 to-sky-500",
      bg: "from-blue-50 to-sky-50",
      border: "border-blue-100",
      text: "text-blue-700",
      points: [
        "ডাক্তার খোঁজা",
        "অ্যাপয়েন্টমেন্ট সমন্বয়",
        "হাসপাতাল/সময় গাইডলাইন",
      ],
    },
    {
      title: "গাড়ি / অ্যাম্বুলেন্স",
      simpleTitle: "যাতায়াত লাগবে",
      icon: "🚑",
      desc: "রোগীকে ঢাকা আনা-নেওয়া, হাসপাতাল যাওয়া বা জরুরি যাতায়াতের জন্য গাড়ি/অ্যাম্বুলেন্স ব্যবস্থা সমন্বয় করি।",
      path: "/transport",
      buttonText: "যাতায়াত সেবা নিন",
      badge: "রোগী পরিবহন",
      gradient: "from-orange-500 to-red-500",
      bg: "from-orange-50 to-red-50",
      border: "border-orange-100",
      text: "text-orange-700",
      points: [
        "গাড়ি/অ্যাম্বুলেন্স",
        "লোকেশন অনুযায়ী ব্যবস্থা",
        "জরুরি যোগাযোগ সহায়তা",
      ],
    },
    {
      title: "থাকার ব্যবস্থা",
      simpleTitle: "ঢাকায় থাকতে হবে",
      icon: "🏨",
      desc: "রোগী ও স্বজনদের জন্য হাসপাতালের কাছাকাছি, বাজেট অনুযায়ী থাকার ব্যবস্থা খুঁজে দিতে সহায়তা করি।",
      path: "/hotel",
      buttonText: "থাকার সেবা নিন",
      badge: "হোটেল/আবাসন",
      gradient: "from-emerald-600 to-green-500",
      bg: "from-emerald-50 to-green-50",
      border: "border-emerald-100",
      text: "text-emerald-700",
      points: [
        "হাসপাতালের কাছাকাছি",
        "বাজেট অনুযায়ী অপশন",
        "রোগীর পরিবারের জন্য সুবিধা",
      ],
    },
    {
      title: "রোগী সহায়তা সমন্বয়",
      simpleTitle: "আমি নিশ্চিত না, সাহায্য চাই",
      icon: "🤝",
      desc: "কোন সেবা লাগবে বুঝতে না পারলে সরাসরি আমাদের সাথে কথা বলুন। আমরা আপনার প্রয়োজন শুনে সঠিক দিকনির্দেশনা দেব।",
      path: WHATSAPP_URL,
      external: true,
      buttonText: "WhatsApp-এ কথা বলুন",
      badge: "মানবিক সহায়তা",
      gradient: "from-violet-600 to-fuchsia-500",
      bg: "from-violet-50 to-fuchsia-50",
      border: "border-violet-100",
      text: "text-violet-700",
      points: [
        "প্রয়োজন বুঝে গাইডলাইন",
        "পরিবারকে আপডেট",
        "ঢাকায় সহায়তা সমন্বয়",
      ],
    },
  ];

  const steps = [
    {
      number: "১",
      title: "আপনার প্রয়োজন বলুন",
      desc: "ডাক্তার, গাড়ি, অ্যাম্বুলেন্স, থাকা বা অন্য সহায়তা — কী দরকার সহজ ভাষায় জানান।",
    },
    {
      number: "২",
      title: "আমরা সমন্বয় করি",
      desc: "সময়, লোকেশন, বাজেট ও রোগীর অবস্থার ভিত্তিতে উপযুক্ত ব্যবস্থা খুঁজে দিই।",
    },
    {
      number: "৩",
      title: "আপনি আপডেট পান",
      desc: "Booking status, যোগাযোগ তথ্য ও প্রয়োজনীয় নির্দেশনা Call/WhatsApp/Dashboard-এ পাবেন।",
    },
  ];

  const trustItems = [
    {
      icon: "📞",
      title: "সহজ যোগাযোগ",
      desc: "Call বা WhatsApp — যেটা আপনার জন্য সহজ, সেটাতেই কথা বলা যাবে।",
    },
    {
      icon: "🧾",
      title: "বুকিং তথ্য",
      desc: "প্রয়োজনীয় booking detail ও status update পরিষ্কারভাবে জানানো হবে।",
    },
    {
      icon: "💬",
      title: "পরিষ্কার কথা",
      desc: "সেবা, সময়, সম্ভাব্য খরচ ও service charge আগে থেকেই বুঝিয়ে বলা হবে।",
    },
    {
      icon: "🤲",
      title: "মানবিক সহায়তা",
      desc: "শুধু booking নয়, রোগী ও পরিবারের পরিস্থিতি বুঝে পাশে থাকার চেষ্টা।",
    },
  ];

  const handleServiceClick = (service) => {
    if (service.external) {
      window.open(service.path, "_blank", "noopener,noreferrer");
      return;
    }

    router.push(service.path);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4 pb-28 pt-7 sm:px-5 md:px-8 md:pb-14 md:pt-10">
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl">
        <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute -right-20 top-20 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-blue-100 bg-blue-100/80 px-4 py-2 text-xs font-black text-blue-700 shadow-sm sm:text-sm">
            এক জায়গায় চিকিৎসা, যাতায়াত, থাকা ও রোগী সহায়তা
          </span>

          <h1 className="mt-5 text-[2.15rem] font-black leading-[1.18] tracking-[-0.04em] text-slate-950 sm:text-5xl md:text-6xl">
            আপনার কোন সেবা
            <span className="block bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text pb-2 text-transparent">
              প্রয়োজন?
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-600 md:text-lg">
            ডাক্তার দেখানো, রোগী আনা-নেওয়া, ঢাকায় থাকা বা পুরো প্রক্রিয়ায়
            সহায়তা—নিচ থেকে আপনার প্রয়োজন অনুযায়ী সেবা বেছে নিন।
          </p>

          <div className="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex min-h-[54px] items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-base font-black text-white shadow-lg shadow-blue-600/20 transition active:scale-[0.98] md:hover:-translate-y-0.5"
            >
              📞 সরাসরি কল করুন
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[54px] items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-600/20 transition active:scale-[0.98] md:hover:-translate-y-0.5"
            >
              💬 WhatsApp করুন
            </a>
          </div>

          <p className="mt-3 text-sm font-bold text-slate-500">
            জরুরি প্রয়োজনে নম্বর:{" "}
            <a href={`tel:${PHONE_NUMBER}`} className="text-slate-900">
              {DISPLAY_PHONE}
            </a>
          </p>
        </div>
      </section>

      {/* QUICK HELP STRIP */}
      <section className="mx-auto mt-8 max-w-7xl">
        <div className="grid grid-cols-1 gap-3 rounded-[28px] border border-slate-200/70 bg-white/85 p-3 shadow-sm backdrop-blur md:grid-cols-3">
          <div className="rounded-2xl bg-blue-50 p-4 text-center">
            <p className="text-sm font-black text-blue-700">গ্রাম থেকে আসছেন?</p>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
              ঢাকায় কোথায় যাবেন, কীভাবে যাবেন—আমরা গাইড করব।
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-50 p-4 text-center">
            <p className="text-sm font-black text-emerald-700">
              প্রবাসে থাকেন?
            </p>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
              দেশে থাকা বাবা-মা/পরিবারের চিকিৎসা সমন্বয়ে পাশে থাকি।
            </p>
          </div>

          <div className="rounded-2xl bg-orange-50 p-4 text-center">
            <p className="text-sm font-black text-orange-700">
              কোন সেবা লাগবে বুঝতে পারছেন না?
            </p>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
              সরাসরি ফোন করুন, আমরা প্রয়োজন বুঝে বলব।
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto mt-8 max-w-7xl md:mt-10">
        <div className="mb-5 text-center md:mb-8">
          <p className="text-sm font-black text-blue-600">সেবা বেছে নিন</p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950 sm:text-3xl md:text-4xl">
            সহজ ভাষায় আপনার প্রয়োজন
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
            প্রতিটি সেবায় আপনি কী ধরনের সহায়তা পাবেন, নিচে পরিষ্কারভাবে দেওয়া
            আছে।
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className={cn(
                "group relative overflow-hidden rounded-[30px] border bg-white p-5 shadow-md transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-2xl",
                service.border
              )}
            >
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-2 bg-gradient-to-r",
                  service.gradient
                )}
              />

              <div
                className={cn(
                  "absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 transition duration-500 group-hover:scale-125",
                  service.gradient
                )}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br text-4xl shadow-lg",
                      service.gradient
                    )}
                  >
                    <span aria-hidden="true">{service.icon}</span>
                  </div>

                  <span
                    className={cn(
                      "rounded-full bg-gradient-to-br px-3 py-1 text-[11px] font-black",
                      service.bg,
                      service.text
                    )}
                  >
                    {service.badge}
                  </span>
                </div>

                <p
                  className={cn(
                    "mt-5 text-sm font-black leading-none",
                    service.text
                  )}
                >
                  {service.simpleTitle}
                </p>

                <h3 className="mt-2 text-[22px] font-black leading-tight tracking-[-0.03em] text-slate-950">
                  {service.title}
                </h3>

                <p className="mt-3 min-h-[88px] text-sm font-medium leading-relaxed text-slate-600">
                  {service.desc}
                </p>

                <div className="mt-4 rounded-2xl bg-slate-50 p-3">
                  <p className="mb-2 text-xs font-black text-slate-500">
                    যে কাজে সহায়তা পাবেন
                  </p>

                  <div className="space-y-2">
                    {service.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-2 text-sm font-bold text-slate-700"
                      >
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[11px] text-white",
                            service.gradient
                          )}
                        >
                          ✓
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleServiceClick(service)}
                  className={cn(
                    "mt-5 flex w-full min-h-[52px] items-center justify-center rounded-2xl bg-gradient-to-r px-5 py-3 text-base font-black text-white shadow-lg transition active:scale-[0.98] md:hover:scale-[1.02]",
                    service.gradient
                  )}
                >
                  {service.buttonText} →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* NOT SURE CTA */}
      <section className="mx-auto mt-8 max-w-7xl md:mt-12">
        <div className="grid gap-5 overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-xl md:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 sm:p-8 md:p-10">
            <p className="text-sm font-black text-blue-600">
              বুঝতে সমস্যা হচ্ছে?
            </p>

            <h2 className="mt-2 text-2xl font-black leading-tight tracking-[-0.03em] text-slate-950 sm:text-3xl md:text-4xl">
              আপনি শুধু আপনার সমস্যা বলুন,
              <span className="block text-emerald-600">
                আমরা সঠিক সেবা বুঝিয়ে দেব
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-600">
              রোগী কোথা থেকে আসবেন, কোন হাসপাতালে যেতে চান, গাড়ি লাগবে কিনা,
              থাকার জায়গা দরকার কিনা—এসব জানালেই আমরা ধাপে ধাপে গাইড করব।
            </p>

            <div className="mt-6 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex min-h-[52px] items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-base font-black text-white shadow-lg shadow-blue-600/20"
              >
                📞 {DISPLAY_PHONE}
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[52px] items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-600/20"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 via-sky-500 to-emerald-500 p-6 text-white sm:p-8 md:p-10">
            <p className="rounded-full bg-white/15 px-4 py-2 text-center text-sm font-black backdrop-blur">
              পরিবারের মতো পাশে থাকার চেষ্টা
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
                <p className="text-3xl">🏡</p>
                <h3 className="mt-2 text-lg font-black">গ্রাম থেকে ঢাকা</h3>
                <p className="mt-1 text-sm font-medium leading-relaxed text-white/85">
                  নতুন জায়গা, নতুন হাসপাতাল—আমরা direction ও coordination-এ
                  পাশে থাকি।
                </p>
              </div>

              <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
                <p className="text-3xl">🌍</p>
                <h3 className="mt-2 text-lg font-black">প্রবাসী পরিবার</h3>
                <p className="mt-1 text-sm font-medium leading-relaxed text-white/85">
                  দেশে থাকা বাবা-মা বা আত্মীয়ের চিকিৎসা বিষয়ক কাজে update পেতে
                  সাহায্য করি।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto mt-8 max-w-7xl md:mt-12">
        <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-md backdrop-blur sm:p-8 md:p-10">
          <div className="mb-6 text-center md:mb-8">
            <p className="text-sm font-black text-emerald-600">
              কীভাবে সেবা পাবেন?
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950 sm:text-3xl md:text-4xl">
              সহজ ৩ ধাপে
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-xl font-black text-white shadow-lg">
                  {step.number}
                </div>

                <h3 className="mt-4 text-lg font-black text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto mt-8 max-w-7xl md:mt-12">
        <div className="mb-6 text-center">
          <p className="text-sm font-black text-blue-600">
            কেন ShebaSathi?
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-slate-950 sm:text-3xl md:text-4xl">
            বিশ্বাসযোগ্য ও সহজ সহায়তা
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-slate-100 bg-white p-5 shadow-sm transition md:hover:-translate-y-1 md:hover:shadow-xl"
            >
              <div className="text-4xl">{item.icon}</div>

              <h3 className="mt-4 text-lg font-black text-slate-950">
                {item.title}
              </h3>

              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto mt-8 max-w-6xl md:mt-12">
        <div className="rounded-[32px] bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-600 p-6 text-center text-white shadow-2xl sm:p-8 md:p-12">
          <h2 className="text-2xl font-black leading-tight tracking-[-0.03em] sm:text-3xl md:text-5xl">
            এখনই প্রয়োজনীয় সেবা বেছে নিন
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-white/90 md:text-lg">
            ঢাকায় চিকিৎসা নিতে এসে যেন একা মনে না হয়—ShebaSathi আছে পাশে।
          </p>

          <div className="mx-auto mt-7 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => router.push("/doctors")}
              className="min-h-[52px] rounded-2xl bg-white px-5 py-3 text-base font-black text-blue-700 shadow-lg transition active:scale-[0.98]"
            >
              ডাক্তার খুঁজুন
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[52px] items-center justify-center rounded-2xl border border-white/35 px-5 py-3 text-base font-black text-white transition hover:bg-white/10 active:scale-[0.98]"
            >
              WhatsApp করুন
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}