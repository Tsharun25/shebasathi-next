"use client";

import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();

  const services = [
    {
      title: "ডাক্তার সেবা",
      icon: "👨‍⚕️",
      path: "/doctors",
    },
    {
      title: "যাতায়াত সেবা",
      icon: "🚗",
      path: "/book?type=transport", // ✅ FIXED
    },
    {
      title: "থাকার ব্যবস্থা",
      icon: "🏨",
      path: "/hotel",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
        🏥 আমাদের সেবাসমূহ
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {services.map((s, i) => (
          <div
            key={i}
            onClick={() => router.push(s.path)}
            className="bg-white p-6 rounded-2xl shadow-md text-center cursor-pointer hover:shadow-xl transition"
          >
            <div className="text-5xl mb-3">{s.icon}</div>
            <h2 className="text-lg font-semibold">{s.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
