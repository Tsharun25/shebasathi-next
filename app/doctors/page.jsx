"use client";

import { useEffect, useState } from "react";
import DoctorCard from "../../components/DoctorCard"; // ✅ FIXED

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("https://your-backend-url/api/doctors") // 👉 CHANGE THIS
      .then(res => res.json())
      .then(setDoctors)
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-green-500 p-10">

      <h1 className="text-3xl text-white text-center mb-10">
        ডাক্তার তালিকা
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {doctors.map((doc) => (
          <DoctorCard key={doc._id} doctor={doc} />
        ))}
      </div>

    </div>
  );
}