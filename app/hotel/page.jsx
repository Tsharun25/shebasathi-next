"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function Hotel() {
  const [list, setList] = useState([]);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // ✅ Load hotel list
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel`)
      .then((res) => res.json())
      .then(setList)
      .catch(() => alert("Hotel load error"));
  }, []);

  // ✅ Booking
  const handleBook = async (h) => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hotel-book`, // ✅ FIXED
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: h.name,
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard");
  };

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl font-bold text-green-700 mb-5 text-center">
        🏨 থাকার ব্যবস্থা
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((h, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg"
          >
            <h2 className="font-bold text-lg">{h.name}</h2>
            <p>{h.location}</p>
            <p>💰 ৳ {h.price}</p>

            <button
              onClick={() => handleBook(h)}
              className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
            >
              বুক করুন
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}