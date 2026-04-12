export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-5xl font-bold text-blue-600">
        ShebaSathi
      </h1>

      <p className="mt-4 text-lg text-gray-600">
        উন্নত চিকিৎসায় আপনার বিশ্বস্ত সাথী
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <a
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Login
        </a>

        <a
          href="/dashboard"
          className="border px-6 py-3 rounded-lg"
        >
          Dashboard
        </a>
      </div>
    </div>
  );
}