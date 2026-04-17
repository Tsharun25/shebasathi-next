"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function Hotel() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    date: "",
    days: "",
    people: "",
  });

  const { user } = useContext(AuthContext);
  const router = useRouter();

  // 🔥 Load hotel list
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel`)
      .then((res) => res.json())
      .then(setList);
  }, []);

  // 🔥 Booking function
  const handleBook = async (h) => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!form.date || !form.days || !form.people) {
      alert("সব তথ্য পূরণ করুন");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hotel-book`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "hotel",
          service: h.name,
          date: form.date,
          days: form.days,
          people: form.people,
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

      {/* 🔥 HOTEL LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((h, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-md"
          >
            <h2 className="font-bold text-lg">{h.name}</h2>
            <p>{h.location}</p>
            <p>💰 ৳ {h.price}</p>

            {/* 🔥 BOOK FORM */}
            <div className="mt-4 space-y-2">
              <input
                type="date"
                placeholder="তারিখ"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />

              <input
                placeholder="কয়দিন থাকবেন"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, days: e.target.value })
                }
              />

              <input
                placeholder="কয়জন থাকবেন"
                className="w-full border p-2 rounded"
                onChange={(e) =>
                  setForm({ ...form, people: e.target.value })
                }
              />

              <button
                onClick={() => handleBook(h)}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                বুক করুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}