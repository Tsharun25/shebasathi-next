"use client";

import { useRouter } from "next/navigation";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DoctorCard({ doctor }) {
  const router = useRouter();

  const dayMap = {
    Sun: "রবি",
    Mon: "সোম",
    Tue: "সোম",
    Wed: "বুধ",
    Thu: "বৃহ",
    Fri: "শুক্র",
    Sat: "শনি",
  };

  const toBanglaNumber = (value) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(value ?? 0).replace(/\d/g, (digit) => banglaDigits[digit]);
  };

  const getTimeLabel = (hour) => {
    if (hour >= 5 && hour < 12) return "সকাল";
    if (hour >= 12 && hour < 15) return "দুপুর";
    if (hour >= 15 && hour < 18) return "বিকাল";
    if (hour >= 18 && hour < 20) return "সন্ধ্যা";
    return "রাত";
  };

  const getDisplayHour = (hour) => {
    if (hour === 0) return 12;
    if (hour > 12) return hour - 12;
    return hour;
  };

  const getTimeRange = (start, end) => {
    const startHour = Number(start);
    const endHour = Number(end);

    if (!startHour || !endHour) return "সময় জানানো হবে";

    return `${getTimeLabel(startHour)} ${toBanglaNumber(
      getDisplayHour(startHour)
    )}টা - ${getTimeLabel(endHour)} ${toBanglaNumber(
      getDisplayHour(endHour)
    )}টা`;
  };

  const doctorName = doctor?.name || "ডাক্তারের নাম";
  const specialist = doctor?.specialist || "বিশেষজ্ঞ";
  const hospital = doctor?.hospital || "হাসপাতাল / চেম্বার জানানো হবে";
  const fee = doctor?.fee ? `৳ ${toBanglaNumber(doctor.fee)}` : "জানানো হবে";
  const timeRange = getTimeRange(doctor?.time?.start, doctor?.time?.end);

  const availableDays =
    Array.isArray(doctor?.days) && doctor.days.length > 0 ? doctor.days : [];

  const handleBook = () => {
    const days = Array.isArray(doctor?.days) ? doctor.days.join(",") : "";
    const start = doctor?.time?.start || "";
    const end = doctor?.time?.end || "";

    router.push(
      `/book?type=doctor&doctor=${encodeURIComponent(
        doctor?.name || "Doctor"
      )}&days=${encodeURIComponent(days)}&start=${encodeURIComponent(
        start
      )}&end=${encodeURIComponent(end)}`
    );
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[36px] border border-white/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.14)] ring-1 ring-slate-900/5 transition-all duration-300 md:hover:-translate-y-1.5 md:hover:shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-500" />

      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-200/55 via-cyan-100/45 to-transparent blur-sm" />
      <div className="pointer-events-none absolute left-4 top-28 h-24 w-24 rounded-full bg-blue-100/45 blur-2xl" />

      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="flex items-start gap-4">
          <div className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 text-[36px] shadow-[0_16px_35px_rgba(37,99,235,0.28)] ring-4 ring-white transition duration-300 group-hover:scale-105">
            👨‍⚕️
            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-[3px] border-white bg-emerald-500 text-xs font-black text-white shadow-md">
              ✓
            </span>
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <p className="mb-1.5 text-xs font-black tracking-wide text-blue-600">
              ডাক্তার অ্যাপয়েন্টমেন্ট
            </p>

            <h2 className="break-words text-[23px] font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-2xl">
              {doctorName}
            </h2>

            <span className="mt-3 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-black text-blue-700 shadow-sm">
              {specialist}
            </span>
          </div>
        </div>

        <div className="mt-7 flex flex-1 flex-col gap-4">
          <div className="rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            <p className="text-xs font-black tracking-wide text-slate-500">
              হাসপাতাল / চেম্বার
            </p>

            <p className="mt-2 break-words text-base font-black leading-relaxed text-slate-950">
              <span className="mr-1.5">🏥</span>
              {hospital}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="relative min-h-[118px] overflow-hidden rounded-[30px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-5 shadow-[0_12px_30px_rgba(16,185,129,0.13)]">
              <div className="absolute -right-7 -top-7 h-20 w-20 rounded-full bg-emerald-300/25" />
              <div className="absolute bottom-0 right-0 h-16 w-16 rounded-tl-full bg-white/55" />

              <p className="relative text-sm font-black text-emerald-700">
                ফি
              </p>

              <p className="relative mt-3 text-[26px] font-black leading-none tracking-[-0.03em] text-emerald-700">
                {fee}
              </p>
            </div>

            <div className="relative min-h-[118px] overflow-hidden rounded-[30px] border border-violet-100 bg-gradient-to-br from-violet-50 via-indigo-50 to-white p-5 shadow-[0_12px_30px_rgba(124,58,237,0.11)]">
              <div className="absolute -right-7 -top-7 h-20 w-20 rounded-full bg-violet-300/25" />

              <p className="relative text-sm font-black text-violet-700">
                সময়
              </p>

              <p className="relative mt-3 text-[15px] font-black leading-relaxed text-violet-950">
                {timeRange}
              </p>
            </div>
          </div>

          <div className="rounded-[30px] border border-slate-100 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            <p className="mb-4 text-sm font-black text-slate-950">
              <span className="mr-1">🗓️</span>
              ডাক্তার বসেন
            </p>

            <div className="flex flex-wrap gap-2.5">
              {availableDays.length > 0 ? (
                availableDays.map((day, index) => (
                  <span
                    key={`${day}-${index}`}
                    className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-black text-blue-700 shadow-sm"
                  >
                    {dayMap[day] || day}
                  </span>
                ))
              ) : (
                <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-600">
                  পরে জানানো হবে
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleBook}
          className="mt-7 flex min-h-[58px] w-full items-center justify-center rounded-[24px] bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 px-5 py-4 text-base font-black text-white shadow-[0_18px_38px_rgba(37,99,235,0.28)] transition duration-300 active:scale-[0.98] md:hover:scale-[1.015] md:hover:shadow-[0_22px_48px_rgba(37,99,235,0.36)]"
        >
          এই ডাক্তারের বুকিং করুন →
        </button>
      </div>
    </article>
  );
}