"use client";

import { useRouter } from "next/navigation";

export default function DoctorCard({ doctor }) {
  const router = useRouter();

  const handleBook = () => {
    router.push(
      `/book?doctor=${doctor.name}&days=${doctor.days.join(",")}&start=${doctor.time.start}&end=${doctor.time.end}`
    );
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition">
      
      <h2 className="text-xl font-bold text-blue-700 mb-2">
        👨‍⚕️ {doctor.name}
      </h2>

      <p>🏥 বিভাগ: {doctor.specialist}</p>
      <p>📍 হাসপাতাল: {doctor.hospital}</p>
      <p>💰 ফি: {doctor.fee} টাকা</p>

      <p>📆 ডাক্তার বসেন: {doctor.days.join(", ")}</p>

      <p>
        ⏰ রোগী দেখার সময়: {doctor.time.start} - {doctor.time.end}
      </p>

      <button
        onClick={handleBook}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
      >
        বুকিং করুন
      </button>
    </div>
  );
}