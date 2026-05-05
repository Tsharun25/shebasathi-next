"use client";

import { useRouter } from "next/navigation";

export default function DoctorCard({ doctor }) {
  const router = useRouter();

  const dayMap = {
    Sun: "রবি",
    Mon: "সোম",
    Tue: "মঙ্গল",
    Wed: "বুধ",
    Thu: "বৃহ",
    Fri: "শুক্র",
    Sat: "শনি",
  };

  const toBanglaNumber = (num) => {
    const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(num || 0).replace(/\d/g, (d) => bn[d]);
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

  const handleBook = () => {
    const days = Array.isArray(doctor.days) ? doctor.days.join(",") : "";
    const start = doctor.time?.start || "";
    const end = doctor.time?.end || "";

    router.push(
      `/book?type=doctor&doctor=${encodeURIComponent(
        doctor.name || "Doctor"
      )}&days=${encodeURIComponent(days)}&start=${encodeURIComponent(
        start
      )}&end=${encodeURIComponent(end)}`
    );
  };

  return (
    <div className="group bg-white rounded-[28px] md:rounded-3xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 md:hover:-translate-y-1 flex flex-col h-full">
      <div className="h-2 bg-gradient-to-r from-blue-600 to-green-500" />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:scale-105 transition">
            👨‍⚕️
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug break-words">
              {doctor.name || "Doctor"}
            </h2>

            <span className="inline-block mt-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
              {doctor.specialist || "Specialist"}
            </span>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-700 flex-1">
          <div className="bg-gray-50 rounded-2xl p-3">
            <p className="text-gray-500 text-xs font-semibold mb-1">
              হাসপাতাল / চেম্বার
            </p>
            <p className="font-bold text-gray-800 leading-relaxed break-words">
              🏥 {doctor.hospital || "N/A"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-2xl p-3">
              <p className="text-green-700 text-xs font-semibold mb-1">ফি</p>
              <p className="font-extrabold text-green-700">
                ৳ {toBanglaNumber(doctor.fee || 0)}
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-3">
              <p className="text-purple-700 text-xs font-bold mb-1">
                রোগী দেখার সময়
              </p>

              <p className="text-sm sm:text-base font-extrabold text-purple-900 leading-relaxed">
                {getTimeRange(doctor.time?.start, doctor.time?.end)}
              </p>
            </div>
          </div>

          <div>
            <p className="font-bold text-gray-700 mb-2">📆 ডাক্তার বসেন</p>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(doctor.days) && doctor.days.length > 0 ? (
                doctor.days.map((d, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold"
                  >
                    {dayMap[d] || d}
                  </span>
                ))
              ) : (
                <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-bold">
                  জানানো হবে
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleBook}
          className="mt-5 w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3.5 rounded-2xl font-bold active:scale-[0.98] md:hover:scale-[1.01] transition"
        >
          বুকিং করুন →
        </button>
      </div>
    </div>
  );
}