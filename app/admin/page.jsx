"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [doctor, setDoctor] = useState({});
  const [list, setList] = useState([]);

  const load = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors`)
      .then(res => res.json())
      .then(setList);
  };

  useEffect(() => {
    load();
  }, []);

  const addDoctor = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-doctor`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(doctor),
    });
    load();
  };

  const del = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-doctor/${id}`, {
      method: "DELETE",
    });
    load();
  };

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-2xl font-bold mb-5">Admin Panel</h1>

      <div className="bg-white p-5 rounded shadow space-y-2">
        <input placeholder="Name" className="border p-2 w-full"
          onChange={e => setDoctor({...doctor, name:e.target.value})} />

        <input placeholder="Department" className="border p-2 w-full"
          onChange={e => setDoctor({...doctor, department:e.target.value})} />

        <input placeholder="Hospital" className="border p-2 w-full"
          onChange={e => setDoctor({...doctor, hospital:e.target.value})} />

        <input placeholder="Fee" className="border p-2 w-full"
          onChange={e => setDoctor({...doctor, fee:e.target.value})} />

        <button onClick={addDoctor}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Doctor
        </button>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {list.map(d => (
          <div key={d._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">{d.name}</h2>
            <p>{d.hospital}</p>

            <button onClick={() => del(d._id)}
              className="bg-red-500 text-white px-2 py-1 mt-2 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
