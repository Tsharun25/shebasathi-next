import "./globals.css";
import { Noto_Sans_Bengali } from "next/font/google";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import MobileBottomNav from "../components/MobileBottomNav";

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-bengali",
});

export const metadata = {
  title: "ShebaSathi | ঢাকায় চিকিৎসা সহায়তায় আপনার বিশ্বস্ত সঙ্গী",
  description:
    "ShebaSathi গ্রাম থেকে আসা রোগী, প্রবাসীদের পরিবার ও ঢাকায় একা চিকিৎসা নিতে আসা মানুষের জন্য ডাক্তার, যাতায়াত, অ্যাম্বুলেন্স ও থাকার ব্যবস্থা সমন্বয় করে।",
  keywords: [
    "ShebaSathi",
    "চিকিৎসা সহায়তা",
    "ঢাকায় ডাক্তার",
    "রোগী পরিবহন",
    "অ্যাম্বুলেন্স",
    "হোটেল বুকিং",
    "প্রবাসীদের পরিবার সহায়তা",
    "Bangladesh medical support",
  ],
  authors: [{ name: "ShebaSathi" }],
  creator: "ShebaSathi",
  publisher: "ShebaSathi",
  openGraph: {
    title: "ShebaSathi | ঢাকায় চিকিৎসা সহায়তায় আপনার পাশে",
    description:
      "ডাক্তার অ্যাপয়েন্টমেন্ট, যাতায়াত, অ্যাম্বুলেন্স ও থাকার ব্যবস্থা — সবকিছু এক জায়গায় সমন্বয় করে সেবাসাথী।",
    url: "https://shebasathi-next.vercel.app",
    siteName: "ShebaSathi",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShebaSathi | ঢাকায় চিকিৎসা সহায়তায় আপনার পাশে",
    description:
      "গ্রাম থেকে ঢাকা আসা রোগী ও প্রবাসীদের পরিবারের জন্য চিকিৎসা, যাতায়াত ও থাকার ব্যবস্থা সহায়তা।",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${notoBengali.variable} bg-gray-50 font-bengali antialiased`}
      >
        <AuthProvider>
          <Navbar />

          <main className="pb-24 md:pb-0">{children}</main>

          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}