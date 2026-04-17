"use client";

export default function DoctorCard({ doctor, onBook }) {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-2xl p-5 border hover:shadow-2xl transition-all duration-300">

      <h2 className="text-xl font-bold text-blue-700 mb-2">
        👨‍⚕️ {doctor.name}
      </h2>

      <p className="text-gray-700 mb-1">
        🏥 <span className="font-medium">{doctor.specialist}</span>
      </p>

      <p className="text-gray-600 mb-1">
        📍 {doctor.hospital}
      </p>

      <p className="text-green-700 font-semibold mb-1">
        💰 ফি: ৳ {doctor.fee}
      </p>

      <p className="text-sm text-gray-600 mb-1">
        📅 ডাক্তার বসেন: {doctor.days.join(", ")}
      </p>

      <p className="text-sm text-gray-600 mb-3">
        ⏰ রোগী দেখার সময়: {doctor.time}
      </p>

      <button
        onClick={() => onBook(doctor)}
        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all"
      >
        বুকিং করুন
      </button>
    </div>
  );
}