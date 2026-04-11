export default function DoctorCard({ doctor }) {
    return (
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-xl rounded-2xl p-6 hover:scale-105 transition">
  
        <div className="flex justify-center mb-4">
          <img
            src="/doctor.png"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
        </div>
  
        <div className="text-center text-white">
          <h2 className="text-xl font-semibold">{doctor.name}</h2>
          <p>{doctor.department}</p>
          <p>{doctor.hospital}</p>
          <p className="text-yellow-300 font-bold">৳ {doctor.fee}</p>
        </div>
  
        <div className="mt-4 flex justify-center gap-2">
          <button className="bg-white text-blue-600 px-4 py-1 rounded-full">
            View
          </button>
  
          <button className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-1 rounded-full">
            Book
          </button>
        </div>
      </div>
    );
  }