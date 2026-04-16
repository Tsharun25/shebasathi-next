"use client";

import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();

  return (
    <div className="p-10 text-center space-y-5">
      <h1 className="text-2xl font-bold text-blue-700">
        🏥 আমাদের সেবাসমূহ
      </h1>

      <div className="space-x-4">
        <button
          onClick={() => router.push("/doctors")}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          👨‍⚕️ ডাক্তার সেবা
        </button>

        <button
          onClick={() => router.push("/transport/book")}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          🚗 যাতায়াত সেবা
        </button>

        <button
          onClick={() => router.push("/hotel/book")}
          className="bg-purple-600 text-white px-5 py-2 rounded"
        >
          🏨 হোটেল বুকিং
        </button>
      </div>
    </div>
  );
}