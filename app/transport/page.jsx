"use client";

import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Transport() {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  const handleBook = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/transport-book`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, location, phone }),
      }
    );

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">
        🚗 যাতায়াত বুকিং
      </h1>

      <input
        placeholder="নাম"
        className="w-full border p-2 mb-3"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="লোকেশন"
        className="w-full border p-2 mb-3"
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        placeholder="ফোন"
        className="w-full border p-2 mb-3"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        onClick={handleBook}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        বুকিং করুন
      </button>
    </div>
  );
}