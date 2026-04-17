"use client";

import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();

  const services = [
    { name: "Doctor", icon: "👨‍⚕️", path: "/doctors" },
    { name: "Transport", icon: "🚗", path: "/transport" },
    { name: "Hotel", icon: "🏨", path: "/hotel" },
  ];

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
        🏥 আমাদের সেবাসমূহ
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <div
            key={i}
            onClick={() => router.push(s.path)}
            className="bg-white p-6 rounded-2xl shadow-md text-center cursor-pointer hover:shadow-xl transition"
          >
            <div className="text-4xl mb-3">{s.icon}</div>
            <h2 className="text-lg font-semibold">{s.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}