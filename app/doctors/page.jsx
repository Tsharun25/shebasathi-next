"use client";

import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(setDoctors);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 py-16 px-6">

      <h1 className="text-4xl text-white text-center font-bold mb-12">
        Doctor List
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {doctors.map((doc) => (
          <DoctorCard key={doc._id} doctor={doc} />
        ))}
      </div>

    </div>
  );
}