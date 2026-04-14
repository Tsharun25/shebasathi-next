// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";

// // export default function Register() {
// //   const router = useRouter();
// //   const [form, setForm] = useState({});

// //   const submit = async (e) => {
// //     e.preventDefault();

// //     if (!form.phone) {
// //       alert("মোবাইল নাম্বার দিন");
// //       return;
// //     }

// //     const res = await fetch(
// //       "https://shebasathi-backend.onrender.com/api/auth/register",
// //       {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(form),
// //       }
// //     );

// //     const data = await res.json();

// //     alert(data.message);

// //     // ✅ auto redirect
// //     router.push("/login");
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 px-4">
// //       <form className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm space-y-3" onSubmit={submit}>
// //         <h2 className="text-xl font-bold text-center">রেজিস্টার</h2>

// //         <input placeholder="নাম" className="border p-2 w-full"
// //           onChange={(e)=>setForm({...form,name:e.target.value})} />

// //         <input placeholder="মোবাইল নাম্বার (Required)" className="border p-2 w-full"
// //           onChange={(e)=>setForm({...form,phone:e.target.value})} />

// //         <input placeholder="ইমেইল (Optional)" className="border p-2 w-full"
// //           onChange={(e)=>setForm({...form,email:e.target.value})} />

// //         <input type="password" placeholder="পাসওয়ার্ড" className="border p-2 w-full"
// //           onChange={(e)=>setForm({...form,password:e.target.value})} />

// //         <button className="bg-green-600 text-white w-full py-2 rounded">
// //           রেজিস্টার করুন
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// "use client";

// import { useContext, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { AuthContext } from "../../context/AuthContext";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const router = useRouter();

//   const [form, setForm] = useState({
//     identifier: "",
//     password: "",
//   });

//   const submit = async (e) => {
//     e.preventDefault();

//     const res = await fetch(
//       "https://shebasathi-backend.onrender.com/api/auth/login",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       }
//     );

//     const data = await res.json();

//     if (data.token) {
//       login(data); // save token + user
//       router.push("/dashboard");
//     } else {
//       alert(data.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 px-4">
//       <form
//         onSubmit={submit}
//         className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm space-y-4"
//       >
//         <h2 className="text-xl font-bold text-center">লগইন</h2>

//         <input
//           placeholder="মোবাইল বা ইমেইল"
//           className="border p-2 w-full rounded"
//           value={form.identifier}
//           onChange={(e) =>
//             setForm({ ...form, identifier: e.target.value })
//           }
//           required
//         />

//         <input
//           type="password"
//           placeholder="পাসওয়ার্ড"
//           className="border p-2 w-full rounded"
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//           required
//         />

//         <button className="bg-blue-600 text-white w-full py-2 rounded">
//           লগইন করুন
//         </button>

//         <p className="text-center text-sm">
//           একাউন্ট নেই?{" "}
//           <Link href="/register" className="text-blue-600 font-semibold">
//             রেজিস্টার করুন
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.phone && !form.email) {
      alert("মোবাইল বা ইমেইল দিন");
      return;
    }

    if (!form.password) {
      alert("পাসওয়ার্ড দিন");
      return;
    }

    const res = await fetch(
      "https://shebasathi-backend.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    alert(data.message);

    if (data.message.includes("success")) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 px-4">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm space-y-3"
      >
        <h2 className="text-xl font-bold text-center">রেজিস্টার</h2>

        <input
          placeholder="নাম"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="মোবাইল নাম্বার"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          placeholder="ইমেইল"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="পাসওয়ার্ড"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="bg-green-600 text-white w-full py-2 rounded">
          রেজিস্টার করুন
        </button>
      </form>
    </div>
  );
}