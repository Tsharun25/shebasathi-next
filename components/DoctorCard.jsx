"use client";

function toBanglaNumber(num) {
  return num.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
}

function toBanglaDay(day) {
  const map = {
    Sun: "রবিবার",
    Mon: "সোমবার",
    Tue: "মঙ্গলবার",
    Wed: "বুধবার",
    Thu: "বৃহস্পতিবার",
    Fri: "শুক্রবার",
    Sat: "শনিবার",
  };
  return map[day] || day;
}

export default function DoctorCard({ doctor, onBook }) {
  return (
    <div className="bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-lg flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-bold">{doctor.name}</h2>

        <p className="text-sm text-gray-600">🏥 {doctor.hospital}</p>

        <p className="text-sm">💰 ফি: {toBanglaNumber(doctor.fee)} টাকা</p>

        <p>
          📅 ডাক্তার বসেন: {doctor.days?.map((d) => toBanglaDay(d)).join(", ")}
        </p>

        <p className="text-sm">
          ⏰ রোগী দেখার সময়: {doctor.time || "তথ্য নেই"}
        </p>
      </div>

<button
  onClick={() => onBook(doctor)}
  className="mt-auto bg-blue-600 text-white py-2 rounded-lg"
>
  বুকিং করুন
</button>
    </div>
  );
}
