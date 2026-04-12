export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center text-center px-6">

      <h1 className="text-5xl md:text-6xl font-bold text-blue-600">
        ShebaSathi
      </h1>

      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        ঢাকায় উন্নত চিকিৎসায় আপনার বিশ্বস্ত সাথী — ডাক্তার অ্যাপয়েন্টমেন্ট,
        থাকা-খাওয়া, যাতায়াত সবকিছু এক জায়গায়
      </p>

      <div className="mt-8 flex gap-4">
        <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow">
          Get Started
        </a>

        <a href="/doctors" className="border px-6 py-3 rounded-xl">
          Browse Doctors
        </a>
      </div>
    </div>
  );
}