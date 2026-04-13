import Link from "next/link";

export default function Services() {
  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">

      <Link href="/doctors" className="bg-blue-500 text-white p-6 rounded-xl text-center">
        ডাক্তার বুকিং
      </Link>

      <Link href="/transport" className="bg-green-500 text-white p-6 rounded-xl text-center">
        যাতায়াত
      </Link>

      <Link href="/accommodation" className="bg-purple-500 text-white p-6 rounded-xl text-center">
        থাকার ব্যবস্থা
      </Link>

    </div>
  );
}