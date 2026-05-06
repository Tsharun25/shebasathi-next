"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PHONE_NUMBER = "+8801710071135";
const WHATSAPP_NUMBER = "8801710071135";
const WHATSAPP_TEXT =
  "আসসালামু আলাইকুম, আমি ShebaSathi থেকে চিকিৎসা/রোগী সহায়তা নিতে চাই। দয়া করে বিস্তারিত জানাবেন।";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_TEXT
)}`;

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isActivePath(pathname, activePaths = []) {
  const currentPath = pathname || "/";

  return activePaths.some((path) => {
    if (path === "/") return currentPath === "/";
    return currentPath === path || currentPath.startsWith(`${path}/`);
  });
}

function HomeIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M3.75 10.35 12 3.75l8.25 6.6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.75 9.85v9.05c0 .75.6 1.35 1.35 1.35h3.1v-5.3h3.6v5.3h3.1c.75 0 1.35-.6 1.35-1.35V9.85"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <rect
        x="4.25"
        y="4.25"
        width="15.5"
        height="15.5"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="M12 8.1v7.8M8.1 12h7.8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BookingIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M9.35 4.75h5.3c.35 0 .65.3.65.65v1.05c0 .35-.3.65-.65.65h-5.3a.66.66 0 0 1-.65-.65V5.4c0-.35.3-.65.65-.65Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 6H7.05c-.85 0-1.55.7-1.55 1.55v10.1c0 .85.7 1.55 1.55 1.55h9.9c.85 0 1.55-.7 1.55-1.55V7.55c0-.85-.7-1.55-1.55-1.55H15.8"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 11.2h6.4M8.8 15h4.4"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 3.75 18.75 6.2v5.05c0 4.25-2.75 7.35-6.75 9-4-1.65-6.75-4.75-6.75-9V6.2L12 3.75Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.45 12.1 11.15 13.8 14.9 10"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M8.45 5.15 9.7 8c.18.43.07.92-.27 1.24l-1.05.95c.85 1.8 2.3 3.25 4.08 4.1l.98-1.08c.32-.34.82-.45 1.25-.26l2.8 1.25c.5.22.78.77.66 1.3l-.55 2.45c-.13.6-.66 1.02-1.27 1.02C10.1 18.95 5.05 13.9 5.05 7.67c0-.61.42-1.14 1.02-1.27l2.05-.46c.53-.12 1.08.15 1.3.65Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M5.3 19.15 6.35 16.2A7.28 7.28 0 1 1 9 18.55L5.3 19.15Z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.15 8.55c.2-.45.42-.5.72-.5h.47c.22 0 .43.13.52.34l.7 1.62c.08.2.04.43-.1.58l-.45.5c-.12.14-.15.34-.06.5.48.88 1.22 1.6 2.12 2.08.16.09.36.06.5-.06l.55-.5c.15-.14.38-.18.57-.1l1.55.67c.25.11.4.36.36.63-.1.74-.72 1.25-1.5 1.25-3.28 0-6.18-2.9-6.18-6.18 0-.28.06-.55.17-.83Z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const isAdmin = user?.role === "admin";

  const navItems = [
    {
      name: "হোম",
      href: "/",
      icon: HomeIcon,
      activePaths: ["/"],
      ariaLabel: "হোম পেজে যান",
    },
    {
      name: "সেবা",
      href: "/services",
      icon: ServiceIcon,
      activePaths: ["/services", "/doctors", "/transport", "/hotel"],
      ariaLabel: "ShebaSathi সেবাসমূহ দেখুন",
    },
    {
      name: isAdmin ? "অ্যাডমিন" : "বুকিং",
      href: isAdmin ? "/admin" : user ? "/dashboard" : "/login",
      icon: isAdmin ? ShieldIcon : BookingIcon,
      activePaths: isAdmin
        ? ["/admin"]
        : ["/dashboard", "/login", "/book", "/booking"],
      ariaLabel: isAdmin
        ? "অ্যাডমিন ড্যাশবোর্ডে যান"
        : user
        ? "আপনার বুকিং দেখুন"
        : "বুকিং করতে লগইন করুন",
    },
  ];

  return (
    <nav
      aria-label="মোবাইল নেভিগেশন"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[999] md:hidden"
    >
      <div
        className="pointer-events-auto mx-auto w-full max-w-[430px] px-3 pt-2"
        style={{ paddingBottom: "max(0.55rem, env(safe-area-inset-bottom))" }}
      >
        <div className="grid grid-cols-5 items-end gap-1 rounded-[28px] border border-slate-200/80 bg-white/95 p-1.5 shadow-[0_-10px_35px_rgba(15,23,42,0.13)] backdrop-blur-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.activePaths);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.ariaLabel}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-[18px] px-1 text-[11px] font-extrabold leading-none tracking-[-0.01em] transition-all duration-200 active:scale-[0.96]",
                  active
                    ? "bg-sky-50 pt-2 text-sky-700 shadow-sm ring-1 ring-sky-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {active && (
                  <span className="absolute top-1.5 h-1 w-5 rounded-full bg-sky-500" />
                )}

                <Icon className="h-[22px] w-[22px] shrink-0" />
                <span className="whitespace-nowrap text-center">
                  {item.name}
                </span>
              </Link>
            );
          })}

          <a
            href={`tel:${PHONE_NUMBER}`}
            aria-label="ShebaSathi-তে সরাসরি কল করুন"
            className="flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-[18px] px-1 text-[11px] font-extrabold leading-none tracking-[-0.01em] text-emerald-700 transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-800 active:scale-[0.96]"
          >
            <PhoneIcon className="h-[22px] w-[22px] shrink-0" />
            <span className="whitespace-nowrap text-center">কল</span>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ShebaSathi WhatsApp-এ মেসেজ করুন"
            className="relative -mt-4 flex min-h-[70px] flex-col items-center justify-center gap-1 rounded-[22px] bg-gradient-to-br from-emerald-500 via-green-500 to-green-600 px-1 text-[10px] font-extrabold leading-none tracking-[-0.03em] text-white shadow-[0_12px_26px_rgba(22,163,74,0.36)] transition-all duration-200 hover:from-emerald-500 hover:to-green-700 active:scale-[0.96]"
          >
            <span className="absolute -top-1.5 h-3 w-9 rounded-full bg-white/85 shadow-sm" />
            <WhatsAppIcon className="h-[24px] w-[24px] shrink-0" />
            <span className="whitespace-nowrap text-center">ওয়াটসঅ্যাপ</span>
          </a>
        </div>
      </div>
    </nav>
  );
}