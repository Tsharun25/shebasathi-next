"use client";

import { useRouter } from "next/navigation";

export default function DoctorCard({ doctor }) {
  const router = useRouter();

  const dayMap = {
    Sun: "রবিবার",
    Mon: "সোমবার",
    Tue: "মঙ্গলবার",
    Wed: "বুধবার",
    Thu: "বৃহস্পতিবার",
    Fri: "শুক্রবার",
    Sat: "শনিবার",
  };

  const toBanglaNumber = (num) => {
    const bn = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
    return num.toString().replace(/\d/g, (d) => bn[d]);
  };

  const getTimeRange = (start, end) => {
    start = Number(start);
    end = Number(end);

    if (start >= 9 && end <= 11) return "সকাল ৯টা - সকাল ১১টা";
    if (start >= 12 && end <= 14) return "দুপুর ১২টা - দুপুর ২টা";
    if (start >= 15 && end <= 17) return "বিকাল ৩টা - বিকাল ৫টা";
    if (start >= 18 && end <= 19) return "সন্ধ্যা ৬টা - সন্ধ্যা ৭টা";
    if (start >= 20) return "রাত ৮টা - রাত ১১টা";

    return `${start} - ${end}`;
  };

  const handleBook = () => {
    router.push(
      `/book?type=doctor&doctor=${doctor.name}&days=${doctor.days.join(",")}&start=${doctor.time.start}&end=${doctor.time.end}`
    );
  };

  return (

    <div className="bg-white shadow-md rounded-xl p-4 border flex flex-col justify-between h-full">

  {/* 🔼 TOP CONTENT */}
  <div>
    <h2 className="text-lg font-bold text-blue-700 mb-2">
      👨‍⚕️ {doctor.name}
    </h2>

    <p>🏥 বিভাগ: {doctor.specialist}</p>
    <p>📍 হাসপাতাল: {doctor.hospital}</p>
    <p>💰 ফি: {toBanglaNumber(doctor.fee)} টাকা</p>

    <p>
      📆 ডাক্তার বসেন: {doctor.days.map(d => dayMap[d]).join(", ")}
    </p>

    <p>
      ⏰ রোগী দেখার সময়:{" "}
      {getTimeRange(doctor.time.start, doctor.time.end)}
    </p>
  </div>

  {/* 🔽 BUTTON ALWAYS BOTTOM */}
  <button
    onClick={handleBook}
    className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
  >
    বুকিং করুন
  </button>

</div>
  );
}