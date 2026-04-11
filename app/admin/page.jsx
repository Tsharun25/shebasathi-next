"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Admin() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (!user || user.user.role !== "admin") {
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(setDoctors);
  }, []);

  const deleteDoctor = async (id) => {
    await fetch(`http://localhost:5000/api/doctors/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    setDoctors(doctors.filter(d => d._id !== id));
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Dept</th>
            <th>Hospital</th>
            <th>Fee</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map(d => (
            <tr key={d._id} className="border text-center">
              <td>{d.name}</td>
              <td>{d.department}</td>
              <td>{d.hospital}</td>
              <td>{d.fee}</td>
              <td>
                <button
                  onClick={() => deleteDoctor(d._id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
