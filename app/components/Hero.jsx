export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 text-white py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">

        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            আপনার স্বাস্থ্য সেবার <br />
            <span className="text-yellow-300">বিশ্বস্ত সঙ্গী</span>
          </h1>

          <p className="text-lg mb-8">
            ডাক্তার খোঁজা, অ্যাপয়েন্টমেন্ট বুকিং এবং চিকিৎসা সেবা —
            সব এক প্ল্যাটফর্মে সহজভাবে।
          </p>

          <div className="flex gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full hover:scale-105 transition">
              Get Started
            </button>

            <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img src="/banner.png" className="w-82 md:w-96 drop-shadow-2xl" alt="সেবাসাথী"/>
        </div>

      </div>
    </div>
  );
}