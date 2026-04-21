"use client";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Hotel() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({});
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel`)
      .then((res) => res.json())
      .then(setList);
  }, []);

//   const handleBook = (h) => {
//   router.push(
//     `/book?type=hotel&service=${h.name}&price=${h.price}`
//   );
// };

const handleBook = async (h) => {
  if (!user) {
    alert("আগে লগইন করুন");
    router.push("/login");
    return;
  }

  if (!form.date || !form.days) {
    alert("সব তথ্য দিন");
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
        service: h.name,
        date: form.date,
        days: Number(form.days),
        people: Number(form.people || 1),
        price: h.price,
        user: user.phone || user.email,
      }),
    }
  );

  const data = await res.json();

  alert(data.message);
  router.push("/dashboard"); // 🔥 FIX
};

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">🏨 থাকার ব্যবস্থা</h1>

      {list.map((h, i) => (
        <div key={i} className="border p-4 mb-3 rounded">
          <h2 className="font-bold">{h.name}</h2>
          <p>{h.location}</p>
          <p>💰 ৳ {h.price} / দিন</p>

          <input
            type="date"
            className="border p-2 w-full mt-2"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            placeholder="কয়দিন থাকবেন"
            className="border p-2 w-full mt-2"
            onChange={(e) => setForm({ ...form, days: Number(e.target.value) })}
          />

          <input
            placeholder="কয়জন থাকবেন"
            className="border p-2 w-full mt-2"
            onChange={(e) => setForm({ ...form, people: e.target.value })}
          />

          <button
            onClick={() => handleBook(h)}
            className="bg-blue-600 text-white px-4 py-2 mt-3 rounded"
          >
            বুক করুন
          </button>
        </div>
      ))}
    </div>
  );
}
