export default function DoctorCard({ doc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-blue-600">{doc.name}</h2>
      <p className="text-gray-500">{doc.hospital}</p>

      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
        Book Now
      </button>
    </div>
  );
}