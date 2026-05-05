"use client";

import { useEffect, useMemo, useState } from "react";
import DoctorCard from "../../components/DoctorCard";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors`)
      .then((res) => res.json())
      .then((data) => setDoctors(Array.isArray(data) ? data : []))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    return ["All", ...new Set(doctors.map((d) => d.specialist).filter(Boolean))];
  }, [doctors]);

  const filteredDoctors = doctors.filter((d) => {
    const query = search.toLowerCase().trim();

    const matchCategory = filter === "All" || d.specialist === filter;

    const matchSearch =
      !query ||
      d.name?.toLowerCase().includes(query) ||
      d.hospital?.toLowerCase().includes(query) ||
      d.specialist?.toLowerCase().includes(query);

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 sm:px-5 md:px-8 py-7 md:py-8 pb-28 md:pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-7 md:mb-8">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4">
            অভিজ্ঞ ডাক্তারদের সাথে সহজ অ্যাপয়েন্টমেন্ট
          </span>

          <h1 className="text-3xl md:text-5xl font-extrabold text-blue-700 leading-tight">
            👨‍⚕️ ডাক্তার তালিকা
          </h1>

          <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            আপনার প্রয়োজন অনুযায়ী ডাক্তার, বিভাগ বা হাসপাতাল খুঁজে বুকিং করুন।
          </p>
        </div>

        <div className="bg-white rounded-[28px] md:rounded-3xl shadow p-4 md:p-5 mb-5 md:mb-6 border border-gray-100">
          <input
            type="text"
            placeholder="🔍 ডাক্তার / হাসপাতাল / বিভাগ খুঁজুন..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-300 text-sm md:text-base"
          />

          <div className="flex overflow-x-auto gap-2 mt-4 pb-2 scrollbar-hide">
            {categories.map((c, i) => (
              <button
                key={i}
                onClick={() => setFilter(c)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-bold transition active:scale-[0.98] ${
                  filter === c
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {c === "All" ? "সব" : c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            মোট{" "}
            <span className="font-bold text-blue-700">
              {filteredDoctors.length}
            </span>{" "}
            জন ডাক্তার পাওয়া গেছে
          </p>
        </div>

        {loading && (
          <div className="bg-white rounded-3xl shadow p-8 text-center text-gray-500">
            Loading doctors...
          </div>
        )}

        {!loading && filteredDoctors.length === 0 && (
          <div className="bg-white rounded-3xl shadow p-8 sm:p-10 text-center">
            <div className="text-5xl mb-3">😔</div>
            <h2 className="text-xl font-bold text-gray-800">
              কোনো ডাক্তার পাওয়া যায়নি
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              অন্য নাম, হাসপাতাল বা বিভাগ দিয়ে চেষ্টা করুন।
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {!loading &&
            filteredDoctors.map((doctor, i) => (
              <DoctorCard key={doctor._id || i} doctor={doctor} />
            ))}
        </div>
      </div>
    </div>
  );
}