"use client";

export default function DoctorCard({ doctor, onBook }) {
  const banglaFee = `৳ ${doctor.fee}`;

  const timeMap = {
    "10:00 AM": "সকাল",
    "12:00 PM": "দুপুর",
    "3:00 PM": "বিকাল",
    "6:00 PM": "সন্ধ্যা",
    "9:00 PM": "রাত",
  };

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold text-lg">{doctor.name}</h2>
      <p>বিভাগ: {doctor.department}</p>
      <p>হাসপাতাল: {doctor.hospital}</p>
      <p>ফি: {banglaFee}</p>
      <p>সময়: {timeMap[doctor.time] || doctor.time}</p>

      <button
        onClick={() => onBook(doctor)}
        className="mt-3 bg-green-600 text-white px-3 py-1 rounded"
      >
        বুকিং করুন
      </button>
    </div>
  );
}