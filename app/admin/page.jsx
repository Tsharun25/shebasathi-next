"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function AdminPage() {
  const { user, token, authLoading, logout } = useContext(AuthContext);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("bookings");
  const [grouped, setGrouped] = useState({});
  const [usersMap, setUsersMap] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingEdits, setBookingEdits] = useState({});
  const [newCount, setNewCount] = useState(0);
  const [bookingSearch, setBookingSearch] = useState("");

  const [doctorForm, setDoctorForm] = useState({
    name: "",
    specialist: "",
    hospital: "",
    fee: "",
    days: "",
    start: "",
    end: "",
  });

  const [hotelForm, setHotelForm] = useState({
    name: "",
    location: "",
    price: "",
  });

  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editingHotel, setEditingHotel] = useState(null);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user || !token) {
      router.push("/login");
      return;
    }

    if (user.role !== "admin") {
      router.push("/");
      return;
    }

    loadAdminData();
    loadNewCount();
  }, [user, token, authLoading, router]);

  useEffect(() => {
    if (!token || user?.role !== "admin") return;

    const interval = setInterval(() => {
      loadNewCount();
    }, 5000);

    return () => clearInterval(interval);
  }, [token, user]);

  const checkAuth = (res) => {
    if (res.status === 401 || res.status === 403) {
      logout();
      router.push("/login");
      return false;
    }
    return true;
  };

  const loadNewCount = async () => {
    if (!token) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/new-bookings-count`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!checkAuth(res)) return;
      if (!res.ok) return;

      const data = await res.json();
      setNewCount(data.count || 0);
    } catch {
      setNewCount(0);
    }
  };

  const markSeen = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/mark-seen`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!checkAuth(res)) return;

      setNewCount(0);
      loadAdminData();
    } catch {
      alert("Mark seen failed ❌");
    }
  };

  const loadAdminData = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const [usersRes, bookingsRes, doctorsRes, hotelsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/doctors`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/hotels`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (
        !checkAuth(usersRes) ||
        !checkAuth(bookingsRes) ||
        !checkAuth(doctorsRes) ||
        !checkAuth(hotelsRes)
      ) {
        return;
      }

      const users = await usersRes.json();
      const bookings = await bookingsRes.json();
      const doctorsData = await doctorsRes.json();
      const hotelsData = await hotelsRes.json();

      const map = {};
      if (Array.isArray(users)) {
        users.forEach((u) => {
          if (u.phone) map[u.phone] = u;
          if (u.email) map[u.email] = u;
        });
      }

      const groupedData = {};
      const editData = {};

      if (Array.isArray(bookings)) {
        bookings.forEach((b) => {
          const key = b.user || b.userId || "Unknown User";
          if (!groupedData[key]) groupedData[key] = [];
          groupedData[key].push(b);

          editData[b._id] = {
            status: b.status || "Pending",
            adminNote: b.adminNote || "",
          };
        });
      }

      setUsersMap(map);
      setGrouped(groupedData);
      setBookingEdits(editData);
      setDoctors(Array.isArray(doctorsData) ? doctorsData : []);
      setHotels(Array.isArray(hotelsData) ? hotelsData : []);
    } catch (err) {
      console.log("ADMIN LOAD ERROR:", err);
      alert("Admin data load failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingEdit = (id, field, value) => {
    setBookingEdits((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const saveBookingUpdate = async (id) => {
    try {
      const edit = bookingEdits[id] || {};

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-booking/${id}`,
        {
          method: "PUT",
          headers: authHeaders,
          body: JSON.stringify({
            status: edit.status || "Pending",
            adminNote: edit.adminNote || "",
          }),
        }
      );

      if (!checkAuth(res)) return;

      const data = await res.json();
      alert(data.message || "Booking updated ✅");
      loadAdminData();
    } catch {
      alert("Booking update failed ❌");
    }
  };

  const deleteBooking = async (id, userKey) => {
    if (!confirm("Delete booking?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-booking/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (!checkAuth(res)) return;

      const updated = { ...grouped };
      updated[userKey] = updated[userKey].filter((b) => b._id !== id);
      if (updated[userKey].length === 0) delete updated[userKey];
      setGrouped(updated);
    } catch {
      alert("Delete failed ❌");
    }
  };

  const saveDoctor = async () => {
    const url = editingDoctor
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-doctor/${editingDoctor}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-doctor`;

    const method = editingDoctor ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(doctorForm),
      });

      if (!checkAuth(res)) return;

      const data = await res.json();
      alert(data.message || "Done ✅");

      setDoctorForm({
        name: "",
        specialist: "",
        hospital: "",
        fee: "",
        days: "",
        start: "",
        end: "",
      });
      setEditingDoctor(null);
      loadAdminData();
    } catch {
      alert("Doctor save failed ❌");
    }
  };

  const editDoctor = (d) => {
    setEditingDoctor(d._id);
    setDoctorForm({
      name: d.name || "",
      specialist: d.specialist || "",
      hospital: d.hospital || "",
      fee: d.fee || "",
      days: Array.isArray(d.days) ? d.days.join(", ") : "",
      start: d.time?.start || "",
      end: d.time?.end || "",
    });
    setActiveTab("doctors");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteDoctor = async (id) => {
    if (!confirm("Delete doctor?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-doctor/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (!checkAuth(res)) return;

      const data = await res.json();
      alert(data.message || "Doctor deleted ✅");
      loadAdminData();
    } catch {
      alert("Doctor delete failed ❌");
    }
  };

  const saveHotel = async () => {
    if (!hotelForm.name || !hotelForm.location || !hotelForm.price) {
      alert("সব hotel তথ্য দিন");
      return;
    }

    const url = editingHotel
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-hotel/${editingHotel}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-hotel`;

    const method = editingHotel ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(hotelForm),
      });

      if (!checkAuth(res)) return;

      const data = await res.json();
      alert(data.message || "Done ✅");

      setHotelForm({ name: "", location: "", price: "" });
      setEditingHotel(null);
      loadAdminData();
    } catch {
      alert("Hotel save failed ❌");
    }
  };

  const editHotel = (h) => {
    setEditingHotel(h._id);
    setHotelForm({
      name: h.name || "",
      location: h.location || "",
      price: h.price || "",
    });
    setActiveTab("hotels");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelHotelEdit = () => {
    setEditingHotel(null);
    setHotelForm({ name: "", location: "", price: "" });
  };

  const deleteHotel = async (id) => {
    if (!confirm("Delete hotel?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/delete-hotel/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (!checkAuth(res)) return;

      const data = await res.json();
      alert(data.message || "Hotel deleted ✅");
      loadAdminData();
    } catch {
      alert("Hotel delete failed ❌");
    }
  };

  const allBookings = useMemo(() => Object.values(grouped).flat(), [grouped]);

  const counts = {
    total: allBookings.length,
    doctor: allBookings.filter((b) => b.type === "doctor").length,
    hotel: allBookings.filter((b) => b.type === "hotel").length,
    transport: allBookings.filter((b) => b.type === "transport").length,
  };

  const getUserName = (userKey) => usersMap[userKey]?.name || "Unknown Name";

  const getTypeBangla = (type) => {
    if (type === "doctor") return "ডাক্তার";
    if (type === "hotel") return "হোটেল";
    if (type === "transport") return "যাতায়াত";
    return type;
  };

  const getStatusClass = (status) => {
    const classes = {
      Pending: "bg-yellow-100 text-yellow-700",
      Confirmed: "bg-green-100 text-green-700",
      Completed: "bg-purple-100 text-purple-700",
      Cancelled: "bg-red-100 text-red-700",
    };

    return classes[status] || "bg-gray-100 text-gray-700";
  };

  const filteredGrouped = useMemo(() => {
    const query = bookingSearch.trim().toLowerCase();

    if (!query) return grouped;

    const result = {};

    Object.entries(grouped).forEach(([userKey, bookings]) => {
      const userName = getUserName(userKey).toLowerCase();

      const filtered = bookings.filter((b) => {
        const haystack = [
          b.bookingId,
          b.type,
          b.status,
          b.doctor,
          b.service,
          b.date,
          b.time,
          b.from,
          b.to,
          b.vehicleType,
          b.acType,
          b.fare,
          b.total,
          b.userName,
          userKey,
          userName,
          usersMap[userKey]?.phone,
          usersMap[userKey]?.email,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(query);
      });

      if (filtered.length > 0) {
        result[userKey] = filtered;
      }
    });

    return result;
  }, [bookingSearch, grouped, usersMap]);

  const filteredBookingsCount = useMemo(() => {
    return Object.values(filteredGrouped).flat().length;
  }, [filteredGrouped]);

  const makeWhatsAppLink = (b, userKey) => {
    const userInfo = usersMap[userKey] || {};
    const phone = userInfo.phone || (/^\d+$/.test(userKey) ? userKey : "");
    const targetPhone = phone ? `88${phone}` : "8801710071135";

    const userName = getUserName(userKey);
    const status = bookingEdits[b._id]?.status || b.status || "Pending";
    const note = bookingEdits[b._id]?.adminNote || b.adminNote || "";

    let details = `Assalamu Alaikum ${userName},\n\nআপনার সেবাসাথী বুকিং আপডেট:\n\n`;
    details += `Booking ID: ${b.bookingId || "N/A"}\n`;
    details += `সেবা: ${getTypeBangla(b.type)}\n`;
    details += `Status: ${status}\n`;

    if (b.type === "doctor") {
      details += `Doctor: ${b.doctor || "N/A"}\nDate: ${
        b.date || "N/A"
      }\nTime: ${b.time || "N/A"}\n`;
    }

    if (b.type === "hotel") {
      details += `Hotel: ${b.service || "N/A"}\nDate: ${
        b.date || "N/A"
      }\nPeople: ${b.people || "N/A"} জন\nRooms: ${
        b.rooms || "N/A"
      } টি\nDays: ${b.days || "N/A"} দিন\nTotal: ৳ ${b.total || 0}\n`;
    }

    if (b.type === "transport") {
      details += `Route: ${b.from || ""} → ${b.to || ""}\nVehicle: ${
        b.vehicleType || b.vehicle || "N/A"
      }\nType: ${b.acType || b.ac || "N/A"}\nFare: ${
        b.fare ? `৳ ${b.fare}` : "আলোচনা সাপেক্ষ"
      }\n`;
    }

    if (note) details += `\nNote: ${note}\n`;

    details += `\nপ্রয়োজনে যোগাযোগ করুন: 01710071135`;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(details)}`;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 font-medium">Checking admin access...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-6 pb-28 md:pb-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="মোট বুকিং" value={counts.total} color="blue" />
          <StatCard title="ডাক্তার বুকিং" value={counts.doctor} color="green" />
          <StatCard title="হোটেল বুকিং" value={counts.hotel} color="orange" />
          <StatCard
            title="যাতায়াত বুকিং"
            value={counts.transport}
            color="purple"
          />
        </div>

        {newCount > 0 && (
          <div className="bg-red-50 border border-red-100 rounded-3xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-red-700 font-extrabold text-lg">
                🔔 {newCount} টি নতুন booking এসেছে
              </p>
              <p className="text-sm text-gray-600">
                নতুন booking দেখতে Bookings tab check করুন।
              </p>
            </div>

            <button
              onClick={markSeen}
              className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-700"
            >
              Mark as Seen
            </button>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow p-3 flex gap-2 overflow-x-auto border border-gray-100">
          <TabButton
            active={activeTab === "bookings"}
            onClick={() => setActiveTab("bookings")}
          >
            📋 Bookings
            {newCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {newCount}
              </span>
            )}
          </TabButton>

          <TabButton
            active={activeTab === "doctors"}
            onClick={() => setActiveTab("doctors")}
          >
            👨‍⚕️ Doctors
          </TabButton>

          <TabButton
            active={activeTab === "hotels"}
            onClick={() => setActiveTab("hotels")}
          >
            🏨 Hotels
          </TabButton>
        </div>

        {activeTab === "doctors" && (
          <section className="space-y-6">
            <div className="bg-white rounded-3xl shadow p-5 border border-gray-100">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                {editingDoctor ? "✏️ Edit Doctor" : "➕ Add Doctor"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Doctor Name"
                  value={doctorForm.name}
                  onChange={(v) => setDoctorForm({ ...doctorForm, name: v })}
                />
                <Input
                  placeholder="Specialist"
                  value={doctorForm.specialist}
                  onChange={(v) =>
                    setDoctorForm({ ...doctorForm, specialist: v })
                  }
                />
                <Input
                  placeholder="Hospital"
                  value={doctorForm.hospital}
                  onChange={(v) =>
                    setDoctorForm({ ...doctorForm, hospital: v })
                  }
                />
                <Input
                  type="number"
                  placeholder="Fee"
                  value={doctorForm.fee}
                  onChange={(v) => setDoctorForm({ ...doctorForm, fee: v })}
                />
                <Input
                  placeholder="Days: Sun, Tue"
                  value={doctorForm.days}
                  onChange={(v) => setDoctorForm({ ...doctorForm, days: v })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Start Time: 10"
                    value={doctorForm.start}
                    onChange={(v) =>
                      setDoctorForm({ ...doctorForm, start: v })
                    }
                  />
                  <Input
                    placeholder="End Time: 17"
                    value={doctorForm.end}
                    onChange={(v) => setDoctorForm({ ...doctorForm, end: v })}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={saveDoctor}
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700"
                >
                  {editingDoctor ? "Update Doctor" : "Add Doctor"}
                </button>

                {editingDoctor && (
                  <button
                    onClick={() => {
                      setEditingDoctor(null);
                      setDoctorForm({
                        name: "",
                        specialist: "",
                        hospital: "",
                        fee: "",
                        days: "",
                        start: "",
                        end: "",
                      });
                    }}
                    className="bg-gray-200 px-5 py-2.5 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doctors.map((d) => (
                <div
                  key={d._id}
                  className="bg-white rounded-3xl shadow p-5 border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-900">
                    👨‍⚕️ {d.name}
                  </h3>
                  <p className="text-gray-600 mt-1">🩺 {d.specialist}</p>
                  <p className="text-gray-600">🏥 {d.hospital}</p>
                  <p className="text-green-700 font-bold">💰 ৳ {d.fee}</p>
                  <p className="text-gray-500 text-sm">
                    📅 {Array.isArray(d.days) ? d.days.join(", ") : "N/A"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    ⏰ {d.time?.start || "N/A"} - {d.time?.end || "N/A"}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => editDoctor(d)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-xl font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteDoctor(d._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "hotels" && (
          <section className="space-y-6">
            <div className="bg-white rounded-3xl shadow p-5 border border-gray-100">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                {editingHotel ? "✏️ Edit Hotel" : "➕ Add Hotel"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                  placeholder="Hotel Name"
                  value={hotelForm.name}
                  onChange={(v) => setHotelForm({ ...hotelForm, name: v })}
                />
                <Input
                  placeholder="Location"
                  value={hotelForm.location}
                  onChange={(v) =>
                    setHotelForm({ ...hotelForm, location: v })
                  }
                />
                <Input
                  type="number"
                  placeholder="Price per room / day"
                  value={hotelForm.price}
                  onChange={(v) => setHotelForm({ ...hotelForm, price: v })}
                />
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={saveHotel}
                  className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-700"
                >
                  {editingHotel ? "Update Hotel" : "Add Hotel"}
                </button>

                {editingHotel && (
                  <button
                    onClick={cancelHotelEdit}
                    className="bg-gray-200 px-5 py-2.5 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                )}

                <button
                  onClick={loadAdminData}
                  className="bg-blue-100 text-blue-700 px-5 py-2.5 rounded-xl font-bold"
                >
                  Refresh List
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow p-5 border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900">
                    🏨 Hotel List
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    মোট {hotels.length} টি hotel/service পাওয়া গেছে
                  </p>
                </div>
              </div>

              {hotels.length === 0 ? (
                <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-500">
                  কোনো hotel পাওয়া যায়নি। উপরের form থেকে নতুন hotel add করুন।
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {hotels.map((h) => (
                    <div
                      key={h._id}
                      className="bg-gradient-to-br from-green-50 to-white rounded-3xl shadow-sm p-5 border border-green-100"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-4xl mb-3">🏨</div>

                          <h3 className="text-xl font-bold text-gray-900">
                            {h.name}
                          </h3>

                          <p className="text-gray-600 mt-1">📍 {h.location}</p>

                          <p className="text-green-700 font-extrabold mt-2">
                            💰 ৳ {h.price} / রুম / দিন
                          </p>
                        </div>

                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                          Active
                        </span>
                      </div>

                      <div className="flex gap-2 mt-5">
                        <button
                          onClick={() => editHotel(h)}
                          className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-yellow-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteHotel(h._id)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "bookings" && (
          <section className="space-y-6">
            <div className="bg-white rounded-3xl shadow p-4 md:p-5 border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">
                    🔍 Booking Search
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Booking ID, phone, name, doctor, hotel, route বা status দিয়ে
                    খুঁজুন।
                  </p>
                </div>

                {bookingSearch && (
                  <button
                    onClick={() => setBookingSearch("")}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              <input
                type="text"
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                placeholder="যেমন: SB-2026-0007 / 017... / Pending / Hotel Green"
                className="w-full mt-4 p-3.5 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-300"
              />

              <p className="text-sm text-gray-500 mt-3">
                {bookingSearch ? (
                  <>
                    পাওয়া গেছে{" "}
                    <span className="font-bold text-blue-700">
                      {filteredBookingsCount}
                    </span>{" "}
                    টি matching booking
                  </>
                ) : (
                  <>
                    মোট{" "}
                    <span className="font-bold text-blue-700">
                      {allBookings.length}
                    </span>{" "}
                    টি booking
                  </>
                )}
              </p>
            </div>

            {Object.keys(filteredGrouped).length === 0 && (
              <div className="bg-white p-10 rounded-3xl shadow text-center text-gray-500">
                {bookingSearch
                  ? "এই search অনুযায়ী কোনো booking পাওয়া যায়নি"
                  : "No bookings yet"}
              </div>
            )}

            {Object.entries(filteredGrouped).map(([userKey, bookings]) => (
              <div
                key={userKey}
                className="bg-white p-5 rounded-3xl shadow border border-gray-100"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5 border-b pb-4">
                  <div>
                    <h2 className="font-bold text-xl text-green-700">
                      👤 {getUserName(userKey)}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      📱 {userKey} • দেখাচ্ছে: {bookings.length} টি booking
                    </p>
                  </div>

                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold w-fit">
                    Active Customer
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookings.map((b) => {
                    const edit = bookingEdits[b._id] || {
                      status: b.status || "Pending",
                      adminNote: b.adminNote || "",
                    };

                    return (
                      <div
                        key={b._id}
                        className={`border p-4 rounded-2xl hover:shadow transition flex flex-col min-h-[200px] ${
                          b.isNew
                            ? "bg-red-50 border-red-200"
                            : "bg-gray-50 border-gray-200 hover:bg-white"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex gap-2 flex-wrap">
                            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                              {getTypeBangla(b.type)}
                            </span>

                            {b.isNew && (
                              <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                                NEW
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => deleteBooking(b._id, userKey)}
                            className="text-red-500 text-sm font-bold hover:text-red-700"
                          >
                            ❌ Delete
                          </button>
                        </div>

                        <div className="space-y-2 text-gray-700 flex-1">
                          <p className="text-sm font-bold text-blue-700 bg-blue-50 rounded-xl px-3 py-2 inline-block">
                            🧾 Booking ID: {b.bookingId || "N/A"}
                          </p>

                          <span
                            className={`block w-fit px-3 py-1 rounded-full text-xs font-bold ${getStatusClass(
                              edit.status
                            )}`}
                          >
                            {edit.status}
                          </span>

                          {b.type === "doctor" && (
                            <>
                              <p className="font-bold text-gray-900">
                                👨‍⚕️ {b.doctor}
                              </p>
                              <p>📅 Date: {b.date}</p>
                              <p>⏰ Time: {b.time}</p>
                            </>
                          )}

                          {b.type === "hotel" && (
                            <>
                              <p className="font-bold text-gray-900">
                                🏨 {b.service}
                              </p>
                              <p>📅 Date: {b.date}</p>
                              <p>👥 People: {b.people || "N/A"} জন</p>
                              <p>🚪 Rooms: {b.rooms || "N/A"} টি</p>
                              <p>🌙 Days: {b.days || "N/A"} দিন</p>
                              <p className="font-bold text-green-700">
                                💰 Total: ৳ {b.total || 0}
                              </p>
                            </>
                          )}

                          {b.type === "transport" && (
                            <>
                              <p className="font-bold text-gray-900">
                                🚗 যাতায়াত
                              </p>
                              <p>
                                📍 Route: {b.from} → {b.to}
                              </p>
                              <p>
                                🚘 Vehicle:{" "}
                                {b.vehicleType || b.vehicle || "N/A"}
                              </p>
                              <p>❄️ Type: {b.acType || b.ac || "N/A"}</p>
                              <p>
                                💰 Fare:{" "}
                                {b.fare ? `৳ ${b.fare}` : "আলোচনা সাপেক্ষ"}
                              </p>
                            </>
                          )}
                        </div>

                        <div className="mt-4 space-y-3 border-t pt-3">
                          <select
                            value={edit.status}
                            onChange={(e) =>
                              updateBookingEdit(
                                b._id,
                                "status",
                                e.target.value
                              )
                            }
                            className="w-full p-2 border rounded-xl outline-none bg-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <textarea
                            value={edit.adminNote}
                            onChange={(e) =>
                              updateBookingEdit(
                                b._id,
                                "adminNote",
                                e.target.value
                              )
                            }
                            placeholder="Admin note লিখুন..."
                            className="w-full p-3 border rounded-xl outline-none min-h-[80px]"
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <button
                              onClick={() => saveBookingUpdate(b._id)}
                              className="bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700"
                            >
                              Save Update
                            </button>

                            <a
                              href={makeWhatsAppLink(b, userKey)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-600 text-white py-2 rounded-xl font-bold text-center hover:bg-green-700"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    orange: "bg-orange-50 text-orange-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <div className={`rounded-3xl p-5 text-center shadow ${colors[color]}`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm font-medium mt-1">{title}</p>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-2xl font-bold whitespace-nowrap transition ${
        active
          ? "bg-blue-600 text-white shadow"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
    />
  );
}