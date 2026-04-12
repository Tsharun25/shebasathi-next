export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl shadow-xl text-white hover:scale-105 transition">

      <div className="text-center">
        <h2 className="text-xl font-bold">{doctor.name}</h2>
        <p>{doctor.department}</p>
        <p>{doctor.hospital}</p>
        <p className="text-yellow-300 font-semibold">৳ {doctor.fee}</p>
      </div>

      <div className="mt-4 flex justify-center gap-2">

        <button className="bg-white text-blue-600 px-3 py-1 rounded-full">
          বিস্তারিত
        </button>

        <button className="bg-gradient-to-r from-blue-600 to-green-500 px-3 py-1 rounded-full text-white">
          বুক করুন
        </button>

      </div>

    </div>
  );
}