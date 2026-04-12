export default function DoctorCard({ doc }) {
    return (
      <div className="p-6 border rounded-xl shadow">
        <h2 className="text-xl font-bold">{doc.name}</h2>
        <p className="text-gray-500">{doc.hospital}</p>
  
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Book Service
        </button>
      </div>
    );
  }