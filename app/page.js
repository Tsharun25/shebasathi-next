export default function Home() {
  return (
    <div className="text-center p-10">
      <h1 className="text-5xl font-bold text-blue-600">
        ShebaSathi
      </h1>

      <p className="mt-4 text-lg text-gray-600">
        উন্নত চিকিৎসায় আপনার বিশ্বস্ত সাথী
      </p>
      <h1 className="text-6xl text-green-600 font-bold">
  FINAL FIX DONE
</h1>
      <div className="mt-8 flex justify-center gap-4">
        <a href="/login" className="bg-blue-600 text-white px-6 py-3 rounded">
          Get Started
        </a>
        <a href="/doctors" className="border px-6 py-3 rounded">
          View Doctors
        </a>
      </div>
    </div>
  );
}