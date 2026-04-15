"use client";

import { useEffect, useState } from "react";

export default function Transport() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://shebasathi-backend.onrender.com/api/transport")
      .then((res) => res.json())
      .then(setList)
      .catch(() => alert("Transport load error"));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">🚗 Transport Service</h1>

      {list.map((t, i) => (
        <div key={i} className="border p-3 mb-2 rounded">
          <h2 className="font-semibold">{t.name}</h2>
          <p>📍 {t.location}</p>
          <p>📞 {t.phone}</p>
        </div>
      ))}
    </div>
  );
}