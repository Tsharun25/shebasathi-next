export default function Services() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        আমাদের সেবা
      </h1>

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-blue-500 text-white p-6 rounded-xl">
          <h2 className="text-xl font-bold">ডাক্তার বুকিং</h2>
          <p>সহজে ডাক্তার অ্যাপয়েন্টমেন্ট নিন</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl">
          <h2 className="text-xl font-bold">থাকার ব্যবস্থা</h2>
          <p>ঢাকায় থাকার ব্যবস্থা</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-xl">
          <h2 className="text-xl font-bold">যাতায়াত</h2>
          <p>অ্যাম্বুলেন্স ও গাড়ি সার্ভিস</p>
        </div>

      </div>
    </div>
  );
}