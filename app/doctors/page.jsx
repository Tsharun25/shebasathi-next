"use client";

import { useEffect, useMemo, useState } from "react";
import DoctorCard from "../../components/DoctorCard";

const PHONE_NUMBER = "+8801710071135";
const DISPLAY_PHONE = "01710071135";
const WHATSAPP_NUMBER = "8801710071135";

const WHATSAPP_TEXT =
  "আসসালামু আলাইকুম, আমি ShebaSathi থেকে ডাক্তার অ্যাপয়েন্টমেন্ট/চিকিৎসা সহায়তা নিতে চাই। দয়া করে বিস্তারিত জানাবেন।";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_TEXT
)}`;

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDoctors() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/doctors`);

        if (!res.ok) {
          throw new Error("Doctors request failed");
        }

        const data = await res.json();

        if (!active) return;

        setDoctors(Array.isArray(data) ? data : []);
      } catch {
        if (!active) return;

        setDoctors([]);
        setError("ডাক্তার তালিকা লোড করা যায়নি। একটু পরে আবার চেষ্টা করুন।");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDoctors();

    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      doctors.map((doctor) => doctor.specialist).filter(Boolean)
    );

    return ["All", ...uniqueCategories];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    const query = normalizeText(search);

    return doctors.filter((doctor) => {
      const matchCategory = filter === "All" || doctor.specialist === filter;

      const searchableText = [
        doctor.name,
        doctor.hospital,
        doctor.specialist,
        doctor.degree,
        doctor.chamber,
        doctor.location,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchSearch = !query || searchableText.includes(query);

      return matchCategory && matchSearch;
    });
  }, [doctors, search, filter]);

  const popularSpecialists = categories.filter((category) => category !== "All").slice(0, 6);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4 pb-28 pt-7 sm:px-5 md:px-8 md:pb-14 md:pt-10">
      <div className="mx-auto max-w-7xl">
        {/* HERO */}
        <section className="relative mb-7 rounded-[32px] border border-blue-100 bg-white/85 p-5 shadow-sm backdrop-blur sm:p-7 md:mb-8 md:p-10">
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-300/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-4 py-2 text-xs font-black text-blue-700 shadow-sm sm:text-sm">
                ঢাকায় ডাক্তার দেখাতে সহজ সহায়তা
              </span>

              <h1 className="mt-5 text-[2.2rem] font-black leading-[1.18] tracking-[-0.04em] text-slate-950 sm:text-5xl md:text-6xl">
                আপনার প্রয়োজন অনুযায়ী
                <span className="block bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 bg-clip-text pb-2 text-transparent">
                  ডাক্তার খুঁজুন
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-slate-600 md:text-lg lg:mx-0">
                ডাক্তার, বিভাগ বা হাসপাতাল লিখে খুঁজুন। কোন ডাক্তার দেখাবেন
                বুঝতে সমস্যা হলে সরাসরি Call/WhatsApp করুন—আমরা প্রয়োজন বুঝে
                গাইড করব।
              </p>

              <div className="mt-6 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2 lg:mx-0">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex min-h-[54px] items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-base font-black text-white shadow-lg shadow-blue-600/20 transition active:scale-[0.98] md:hover:-translate-y-0.5"
                >
                  📞 সরাসরি কল করুন
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[54px] items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-base font-black text-white shadow-lg shadow-emerald-600/20 transition active:scale-[0.98] md:hover:-translate-y-0.5"
                >
                  💬 WhatsApp করুন
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-100 bg-gradient-to-br from-blue-50 to-emerald-50 p-5 shadow-sm">
              <p className="text-sm font-black text-blue-700">
                যারা সাধারণত আমাদের সাহায্য চান
              </p>

              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-lg font-black text-slate-950">
                    🏡 গ্রাম থেকে আসা রোগী
                  </p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">
                    ঢাকায় কোন হাসপাতালে বা কোন ডাক্তারের কাছে যাবেন—এটা বুঝতে
                    সহায়তা।
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-lg font-black text-slate-950">
                    🌍 প্রবাসী পরিবারের সদস্য
                  </p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">
                    দেশে থাকা বাবা-মা/আত্মীয়ের চিকিৎসা appointment সমন্বয়ে
                    সহায়তা।
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-lg font-black text-slate-950">
                    👴 বয়স্ক রোগী
                  </p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">
                    সহজ ভাষায় তথ্য, যোগাযোগ ও follow-up guidance।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH + FILTER */}
        <section className="mb-5 rounded-[30px] border border-slate-100 bg-white p-4 shadow-md md:mb-6 md:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <label
                htmlFor="doctor-search"
                className="mb-2 block text-sm font-black text-slate-700"
              >
                ডাক্তার / হাসপাতাল / বিভাগ খুঁজুন
              </label>

              <input
                id="doctor-search"
                type="text"
                placeholder="যেমন: মেডিসিন, হৃদরোগ, স্কয়ার, ইবনে সিনা..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-base font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="rounded-2xl bg-blue-50 px-4 py-3 text-center lg:min-w-[180px]">
              <p className="text-xs font-black text-blue-700">মোট পাওয়া গেছে</p>
              <p className="mt-1 text-2xl font-black text-blue-700">
                {loading ? "..." : filteredDoctors.length}
                <span className="ml-1 text-sm text-slate-500">জন</span>
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => {
              const active = filter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-black transition active:scale-[0.98]",
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                  )}
                >
                  {category === "All" ? "সব ডাক্তার" : category}
                </button>
              );
            })}
          </div>

          {popularSpecialists.length > 0 && (
            <p className="mt-2 text-xs font-bold leading-relaxed text-slate-500">
              জনপ্রিয় বিভাগ: {popularSpecialists.join(" · ")}
            </p>
          )}
        </section>

        {/* HELP BAR */}
        <section className="mb-5 grid gap-3 rounded-[28px] border border-emerald-100 bg-emerald-50/80 p-4 md:mb-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-lg font-black text-slate-950">
              কোন ডাক্তার দেখাবেন বুঝতে পারছেন না?
            </h2>
            <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">
              রোগীর সমস্যা, বয়স, রিপোর্ট বা হাসপাতালের নাম বলুন—আমরা আপনাকে
              সঠিকভাবে গাইড করার চেষ্টা করব।
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:w-[270px]">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-blue-700 shadow-sm"
            >
              📞 {DISPLAY_PHONE}
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full min-h-[64px] items-center justify-center rounded-[20px] bg-[#08a652] px-6 text-center text-base font-black text-white shadow-[0_10px_25px_rgba(8,166,82,0.25)] transition hover:scale-[1.02]"
            >
              WhatsApp
            </a>
          </div>
        </section>

        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="min-h-[280px] animate-pulse rounded-[30px] border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="h-16 w-16 rounded-3xl bg-slate-100" />
                <div className="mt-5 h-5 w-3/4 rounded-full bg-slate-100" />
                <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-100" />
                <div className="mt-6 h-12 rounded-2xl bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-[30px] border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="text-5xl">⚠️</div>
            <h2 className="mt-3 text-xl font-black text-slate-950">
              তথ্য লোড করা যায়নি
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-600">{error}</p>

            <div className="mt-5 grid max-w-md grid-cols-1 gap-3 sm:mx-auto sm:grid-cols-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white"
              >
                আবার চেষ্টা করুন
              </button>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-emerald-600 px-5 py-3 text-center text-sm font-black text-white"
              >
                WhatsApp করুন
              </a>
            </div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && filteredDoctors.length === 0 && (
          <div className="rounded-[30px] border border-slate-100 bg-white p-8 text-center shadow-sm sm:p-10">
            <div className="text-6xl">😔</div>

            <h2 className="mt-3 text-xl font-black text-slate-950">
              কোনো ডাক্তার পাওয়া যায়নি
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-relaxed text-slate-600">
              অন্য নাম, হাসপাতাল বা বিভাগ দিয়ে চেষ্টা করুন। জরুরি হলে সরাসরি
              WhatsApp করুন—আমরা manually সাহায্য করব।
            </p>

            <div className="mt-5 grid max-w-md grid-cols-1 gap-3 sm:mx-auto sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white"
              >
                সব ডাক্তার দেখুন
              </button>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-emerald-600 px-5 py-3 text-center text-sm font-black text-white"
              >
                WhatsApp করুন
              </a>
            </div>
          </div>
        )}

        {/* DOCTOR GRID */}
        {!loading && !error && filteredDoctors.length > 0 && (
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor, index) => (
              <DoctorCard key={doctor._id || index} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}