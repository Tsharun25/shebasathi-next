"use client";

import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();

  const services = [
    {
      title: "ডাক্তার অ্যাপয়েন্টমেন্ট",
      desc: "সহজে আপনার পছন্দের ডাক্তারের সাথে সময় নিন",
      icon: "🩺",
      path: "/doctors",
    },
    {
      title: "যাতায়াত সেবা",
      desc: "অ্যাম্বুলেন্স, গাড়ি বা পরিবহন বুক করুন",
      icon: "🚑",
      path: "/transport",
    },
    {
      title: "থাকার ব্যবস্থা",
      desc: "হাসপাতালের কাছাকাছি থাকার ব্যবস্থা বুক করুন",
      icon: "🏨",
      path: "/hotel",
    },
  ];

  return (
    <div className="p-5 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        সেবা সমূহ
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            onClick={() => router.push(s.path)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition"
          >
            <div className="text-4xl mb-3">{s.icon}</div>

            <h2 className="text-xl font-bold mb-2">
              {s.title}
            </h2>

            <p className="text-sm md:text-base">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}