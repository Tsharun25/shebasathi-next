import DoctorCard from "../../components/DoctorCard";

const doctors = [
  { name: "Dr. Rahman", hospital: "Dhaka Medical" },
  { name: "Dr. Karim", hospital: "Square Hospital" },
];

export default function Doctors() {
  return (
    <div className="p-10 grid md:grid-cols-2 gap-6">
      {doctors.map((doc, i) => (
        <DoctorCard key={i} doc={doc} />
      ))}
    </div>
  );
}