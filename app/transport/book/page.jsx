// "use client";

// import { useState, useContext } from "react";
// import { AuthContext } from "../../../context/AuthContext";

// export default function TransportBooking() {
//   const { user } = useContext(AuthContext);
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");

//   const handleBooking = async () => {
// if (!user) {
//   alert("আগে লগইন করুন");

//   setTimeout(() => {
//     window.location.href = "/login";
//   }, 300);

//   return;
// }

//     const res = await fetch(
//       "https://shebasathi-backend.onrender.com/api/book",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           type: "transport",
//           from,
//           to,
//           user: user.phone || user.email,
//         }),
//       },
//     );

//     const data = await res.json();
//     alert(data.message);
//   };

//   return (
//     <div className="p-5 space-y-3">
//       <h1 className="text-xl font-bold">🚗 যাতায়াত বুকিং</h1>

//       <input
//         placeholder="কোথা থেকে"
//         className="border p-2 w-full"
//         onChange={(e) => setFrom(e.target.value)}
//       />

//       <input
//         placeholder="কোথায় যাবেন"
//         className="border p-2 w-full"
//         onChange={(e) => setTo(e.target.value)}
//       />

//       <button
//         onClick={handleBooking}
//         className="bg-green-600 text-white px-4 py-2 rounded"
//       >
//         বুকিং করুন
//       </button>
//     </div>
//   );
// }

"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../context/AuthContext";

export default function TransportBooking() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleBooking = async () => {
    if (!user) {
      alert("আগে লগইন করুন");
      router.push("/login");
      return;
    }

    if (!from || !to) {
      alert("লোকেশন দিন");
      return;
    }

    const res = await fetch(
      "https://shebasathi-backend.onrender.com/api/transport-book",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          user: user.phone || user.email,
        }),
      }
    );

    const data = await res.json();
    alert(data.message);

    router.push("/dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded-xl space-y-3">
      <h1 className="text-xl font-bold text-center">🚗 যাতায়াত বুকিং</h1>

      <input
        placeholder="📍 কোথা থেকে"
        className="border p-2 w-full rounded"
        onChange={(e) => setFrom(e.target.value)}
      />

      <input
        placeholder="📍 কোথায় যাবেন"
        className="border p-2 w-full rounded"
        onChange={(e) => setTo(e.target.value)}
      />

      <button
        onClick={handleBooking}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        বুকিং করুন
      </button>
    </div>
  );
}