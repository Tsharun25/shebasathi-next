"use client";

export default function DoctorCard({ doctor, onBook }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 border hover:shadow-xl transition">
      <h2 className="text-xl font-bold text-blue-700 mb-2">👨‍⚕️ {doctor.name}</h2>

      <p>🏥 বিভাগ: {doctor.specialist}</p>
      <p>📍 হাসপাতাল: {doctor.hospital}</p>

      {/* <p className="text-green-600 font-semibold">
        💰 ফি: ৳ {doctor.fee}
      </p>

      <p>📅 বসেন: {doctor.days.join(", ")}</p>

      <p className="text-purple-600 font-medium">
        ⏰ সময়: {doctor.time}
      </p> */}

      <p>💰 ফি: ৳ {doctor.fee}</p>
      <p>📅 ডাক্তার বসেন: {doctor.days.join(", ")}</p>
      <p>⏰ রোগী দেখার সময়: {doctor.time}</p>

      <button
        onClick={() => onBook(doctor)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        বুকিং করুন
      </button>
    </div>
  );
}
