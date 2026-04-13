export default function Services() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        আমাদের সেবা
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold">ডাক্তার সেবা</h2>
          <p>ঢাকার সেরা ডাক্তার বুকিং</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold">থাকার ব্যবস্থা</h2>
          <p>কম খরচে থাকার জায়গা</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold">যাতায়াত</h2>
          <p>অ্যাম্বুলেন্স / গাড়ি সার্ভিস</p>
        </div>

      </div>
    </div>
  );
}