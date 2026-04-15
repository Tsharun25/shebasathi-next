"use client";

export default function DoctorCard({ doctor, onBook }) {
  const daysMap = {
    Sat: "শনিবার",
    Sun: "রবিবার",
    Mon: "সোমবার",
    Tue: "মঙ্গলবার",
    Wed: "বুধবার",
    Thu: "বৃহস্পতিবার",
    Fri: "শুক্রবার",
  };

  return (
    <div className="p-4 border rounded-xl shadow bg-white">
      <h2 className="text-lg font-bold">{doctor.name}</h2>
      <p>বিভাগ: {doctor.department}</p>
      <p>হাসপাতাল: {doctor.hospital}</p>

      <p className="text-green-600 font-semibold">
        ফি: ৳{doctor.fee}
      </p>

      <p>
        ডাক্তার বসেন:{" "}
        {doctor.days.map((d) => daysMap[d]).join(", ")}
      </p>

      <p>রোগী দেখার সময়: {doctor.time}</p>

      <button
        onClick={() => onBook(doctor)}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        বুকিং করুন
      </button>
    </div>
  );
}