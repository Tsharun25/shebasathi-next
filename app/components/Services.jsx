export default function Services() {
  const services = [
    { title: "ডাক্তারের খোঁজ", icon: "🩺", color: "from-blue-500 to-blue-700" },
    { title: "থাকার ব্যবস্থা", icon: "🏠", color: "from-green-500 to-green-700" },
    { title: "যাতায়াত সেবা", icon: "🚑", color: "from-purple-500 to-purple-700" },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <h2 className="text-3xl font-bold text-center mb-12">
        আমাদের সেবা সমূহ
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {services.map((s, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${s.color} text-white p-10 rounded-3xl shadow-xl hover:scale-105 hover:-translate-y-2 transition`}
          >
            <div className="text-6xl mb-4">{s.icon}</div>
            <h3 className="text-2xl font-semibold">{s.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}