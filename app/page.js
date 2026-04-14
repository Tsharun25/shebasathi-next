import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-center py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">সেবা সাথী</h1>

        <p className="text-lg mb-6">ঢাকায় চিকিৎসা এখন আরও সহজ</p>

        <Link
          href="/doctors"
          className="bg-white text-blue-600 px-6 py-2 rounded-full"
        >
          ডাক্তার খুঁজুন
        </Link>
      </div>

      {/* SERVICES */}
      <div className="p-10 grid md:grid-cols-3 gap-6">
        <Link
          href="/doctors"
          className="bg-blue-500 text-white p-6 rounded-xl shadow hover:scale-105 transition"
        >
          <h2 className="text-xl font-bold">ডাক্তার বুকিং</h2>
          <p>সহজে অ্যাপয়েন্টমেন্ট নিন</p>
        </Link>

        <Link
          href="/services"
          className="bg-green-500 text-white p-6 rounded-xl shadow hover:scale-105 transition"
        >
          <h2 className="text-xl font-bold">থাকার ব্যবস্থা</h2>
          <p>ঢাকায় থাকার সুবিধা</p>
        </Link>

        <Link
          href="/services"
          className="bg-purple-500 text-white p-6 rounded-xl shadow hover:scale-105 transition"
        >
          <h2 className="text-xl font-bold">যাতায়াত</h2>
          <p>গাড়ি ও অ্যাম্বুলেন্স</p>
        </Link>
      </div>

      <div className="mt-20 bg-gradient-to-r from-blue-600 to-green-500 text-white p-10 text-center rounded-xl">
        <h2 className="text-2xl font-bold mb-3">
          আপনার স্বাস্থ্য, আমাদের দায়িত্ব
        </h2>

        <p className="mb-4">ডাক্তার, যাতায়াত, থাকা — সব এক জায়গায়</p>

        <Link
          href="/services"
          className="bg-white text-blue-600 px-5 py-2 rounded-lg inline-block"
        >
          সেবা নিন
        </Link>
      </div>
    </div>
  );
}
