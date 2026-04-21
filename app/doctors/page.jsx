
"use client";

import { useEffect, useState } from "react";
import DoctorCard from "../../components/DoctorCard";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors`)
      .then((res) => res.json())
      .then(setDoctors);
  }, []);

  // 🏥 unique বিভাগ
  const categories = ["All", ...new Set(doctors.map((d) => d.specialist))];

  // 🔍 search + filter combo
  const filteredDoctors = doctors.filter((d) => {
    const matchCategory =
      filter === "All" || d.specialist === filter;

    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.hospital.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">

      {/* 🔥 TITLE */}
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
        👨‍⚕️ ডাক্তার তালিকা
      </h1>

      {/* 🔍 SEARCH BAR */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 ডাক্তার / হাসপাতাল খুঁজুন..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* 🏥 FILTER BUTTONS */}
      <div className="flex overflow-x-auto gap-2 mb-5 pb-2">
        {categories.map((c, i) => (
          <button
            key={i}
            onClick={() => setFilter(c)}
            className={`
              whitespace-nowrap px-4 py-1 rounded-full border text-sm
              ${
                filter === c
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }
            `}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 📊 RESULT COUNT */}
      <p className="text-sm text-gray-500 mb-3">
        মোট {filteredDoctors.length} জন ডাক্তার পাওয়া গেছে
      </p>

      {/* 🧾 DOCTOR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, i) => (
            <DoctorCard key={i} doctor={doctor} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            😔 কোনো ডাক্তার পাওয়া যায়নি
          </p>
        )}
      </div>
    </div>
  );
}
