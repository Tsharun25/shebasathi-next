"use client";

export default function DoctorCard({ doctor, onBook }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition">
      
      {/* Name */}
      <h2 className="text-xl font-bold text-blue-700 mb-2">
        👨‍⚕️ {doctor.name}
      </h2>

      {/* Department */}
      <p>🏥 বিভাগ: {doctor.specialist}</p>

      {/* Hospital */}
      <p>📍 হাসপাতাল: {doctor.hospital}</p>

      {/* Fee */}
      <p>💰 ফি: {doctor.fee} টাকা</p>

      {/* Days */}
      <p>📅 ডাক্তার বসেন: {doctor.days.join(", ")}</p>

      {/* Time */}
      <p>⏰ রোগী দেখার সময়: {doctor.time}</p>

      {/* Button */}
      <button
        onClick={() => onBook(doctor)}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        বুকিং করুন
      </button>
    </div>
  );
}