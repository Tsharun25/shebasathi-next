"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
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

function isActivePath(pathname, path) {
  if (path === "/") return pathname === "/";
  return pathname === path || pathname?.startsWith(`${path}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const auth = useContext(AuthContext);
  const user = auth?.user;
  const logout = auth?.logout;

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dashboardPath = user?.role === "admin" ? "/admin" : "/dashboard";

  const menu = [
    { name: "হোম", path: "/" },
    { name: "সেবা সমূহ", path: "/services" },
    { name: "ডাক্তার", path: "/doctors" },
    { name: "যাতায়াত", path: "/transport" },
    { name: "থাকার ব্যবস্থা", path: "/hotel" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    if (typeof logout === "function") logout();

    setOpen(false);
    setProfileOpen(false);
    router.push("/");
  };

  const userInitial = (user?.name || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-slate-200/80 bg-white/95 shadow-[0_8px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          : "border-transparent bg-white"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-5 lg:px-8">
        {/* BRAND LOGO */}
        <Link
          href="/"
          aria-label="ShebaSathi হোম"
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="relative flex h-[50px] w-[40px] shrink-0 items-center justify-center sm:h-[56px] sm:w-[44px]">
            <Image
              src="/shebasathi-icon.png"
              alt=""
              width={88}
              height={120}
              priority
              className="h-full w-full object-contain"
            />
          </span>

          <span className="block min-w-0 leading-none">
            <span className="block bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-500 bg-clip-text pb-1 text-[25px] font-black leading-[1.15] tracking-[-0.04em] text-transparent sm:text-[29px] lg:text-[30px]">
              সেবাসাথী
            </span>

            <span className="block text-[10.5px] font-extrabold leading-[1.35] tracking-[-0.01em] text-slate-500 sm:text-[11.5px]">
              ঢাকায় চিকিৎসা সহায়তা
            </span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden items-center gap-2 lg:flex">
          {menu.map((item) => {
            const active = isActivePath(pathname, item.path);

            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[16px] font-black leading-none transition-all duration-200",
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-800 hover:bg-slate-100 hover:text-blue-700"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-[15px] font-black leading-none text-emerald-700 transition hover:bg-emerald-100"
          >
            কল করুন
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-emerald-600 px-5 py-2.5 text-[15px] font-black leading-none text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            WhatsApp
          </a>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((value) => !value)}
                className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 py-1.5 pl-1.5 pr-3 text-[15px] font-black text-slate-800 transition hover:bg-blue-100"
                aria-expanded={profileOpen}
                aria-label="প্রোফাইল মেনু খুলুন"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 text-sm font-black text-white">
                  {userInitial}
                </span>

                <span className="max-w-[110px] truncate">
                  {user.name || "User"}
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/12">
                  <div className="rounded-2xl bg-slate-50 p-3">
                    <p className="truncate text-sm font-black text-slate-900">
                      {user.name || "User"}
                    </p>

                    <p className="mt-1 break-all text-xs font-semibold text-slate-500">
                      {user.phone || user.email || "যোগাযোগ তথ্য নেই"}
                    </p>
                  </div>

                  <div className="mt-2 space-y-1">
                    <Link
                      href={dashboardPath}
                      className="block rounded-2xl px-3 py-2.5 text-sm font-extrabold text-slate-700 hover:bg-slate-100"
                    >
                      {user.role === "admin"
                        ? "অ্যাডমিন প্যানেল"
                        : "ড্যাশবোর্ড"}
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-2xl px-3 py-2.5 text-left text-sm font-extrabold text-red-600 hover:bg-red-50"
                    >
                      লগআউট
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  "rounded-full px-5 py-2.5 text-[15px] font-black leading-none transition",
                  pathname === "/login"
                    ? "bg-blue-600 text-white"
                    : "text-slate-800 hover:bg-slate-100"
                )}
              >
                লগইন
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-5 py-2.5 text-[15px] font-black leading-none text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                রেজিস্টার করুন
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-2xl font-black text-slate-800 shadow-sm transition active:scale-95 md:hidden"
          aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={open}
        >
          {open ? "×" : "≡"}
        </button>
      </div>

      {/* MOBILE CONTACT BAR */}
      <div className="border-t border-emerald-100 bg-emerald-50/80 px-4 py-2 text-center md:hidden">
        <p className="text-xs font-bold text-slate-600">
          প্রয়োজনে যোগাযোগ করুন
        </p>

        <div className="mt-1 flex items-center justify-center gap-2">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="rounded-full bg-white px-3 py-1.5 text-sm font-black text-slate-900 shadow-sm"
          >
            {PHONE_NUMBER.replace("+88", "")}
          </a>

          <a
            href={`tel:${PHONE_NUMBER}`}
            aria-label="কল করুন"
            className="flex h-8 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-700 shadow-sm"
          >
            ☎
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp করুন"
            className="flex h-8 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm"
          >
            💬
          </a>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden">
          <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 shadow-xl">
            {user && (
              <div className="mb-3 rounded-3xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm font-black text-slate-900">
                  {user.name || "User"}
                </p>

                <p className="mt-1 break-all text-xs font-semibold text-slate-500">
                  {user.phone || user.email || "যোগাযোগ তথ্য নেই"}
                </p>
              </div>
            )}

            <div className="grid gap-2">
              {menu.map((item) => {
                const active = isActivePath(pathname, item.path);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-center text-base font-black transition",
                      active
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                        : "bg-slate-50 text-slate-800 hover:bg-slate-100"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-base font-black text-emerald-700"
              >
                কল করুন
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-emerald-600 px-4 py-3 text-center text-base font-black text-white"
              >
                WhatsApp
              </a>
            </div>

            {!user ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-base font-black text-slate-800"
                >
                  লগইন
                </Link>

                <Link
                  href="/register"
                  className="rounded-2xl bg-blue-600 px-4 py-3 text-center text-base font-black text-white"
                >
                  রেজিস্টার করুন
                </Link>
              </div>
            ) : (
              <div className="mt-3 grid gap-2">
                <Link
                  href={dashboardPath}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-center text-base font-black text-white",
                    user.role === "admin" ? "bg-purple-600" : "bg-blue-600"
                  )}
                >
                  {user.role === "admin" ? "অ্যাডমিন প্যানেল" : "ড্যাশবোর্ড"}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl bg-red-50 px-4 py-3 text-center text-base font-black text-red-600"
                >
                  লগআউট
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}