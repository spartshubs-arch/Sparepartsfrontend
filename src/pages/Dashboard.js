import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "../api/axios";
import {
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaBell,
  FaTimes,
  FaCheckCircle as FaCheck,
} from "react-icons/fa";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    sold: 0,
  });
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  const vendor = JSON.parse(sessionStorage.getItem("vendorInfo") || "{}");
  const token = sessionStorage.getItem("vendorToken");
  const vendorId = vendor?._id || vendor?.id;

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  // ── Product stats ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!vendorId) return;

    axios
      .get(`/products/all?vendorId=${vendorId}`)
      .then((res) => {
        const all = res.data;
        setStats({
          total: all.length,
          pending: all.filter((p) => p.status === "pending").length,
          approved: all.filter((p) => p.status === "approved").length,
          sold: all.filter((p) => p.status === "sold").length,
        });
      })
      .catch(console.error);
  }, [vendorId]);

  // ── Vendor profile ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) return;

    axios
      .get("/vendor/profile", { headers })
      .then((res) => {
        setProfile(res.data);
        sessionStorage.setItem("vendorInfo", JSON.stringify(res.data));
      })
      .catch(console.error);
  }, [token, headers]);

  // ── Notifications ──────────────────────────────────────────────────────
  const fetchNotifications = useCallback(() => {
    if (!token) return;

    axios
      .get("/notifications/vendor", { headers })
      .then((r) => setNotifications(r.data))
      .catch(console.error);
  }, [token, headers]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markRead = async (id) => {
    try {
      await axios.put(`/notifications/${id}/read`, {}, { headers });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch {
      // silent
    }
  };

  const statCards = [
    {
      label: "Total Products",
      value: stats.total,
      color: "from-blue-500 to-blue-700",
      icon: <FaBoxOpen size={24} />,
    },
    {
      label: "Pending",
      value: stats.pending,
      color: "from-yellow-400 to-yellow-600",
      icon: <FaClock size={24} />,
    },
    {
      label: "Approved",
      value: stats.approved,
      color: "from-green-500 to-green-700",
      icon: <FaCheckCircle size={24} />,
    },
    {
      label: "Sold",
      value: stats.sold,
      color: "from-red-500 to-red-700",
      icon: <FaTimesCircle size={24} />,
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Vendor Dashboard
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Welcome,{" "}
            <span className="text-green-600 font-semibold">
              {profile?.tradeName || vendor?.tradeName || "Vendor"}
            </span>
          </p>
        </div>

        <button
          onClick={() => setShowNotif(!showNotif)}
          className="relative bg-white shadow border border-gray-200 rounded-xl p-3 hover:bg-gray-50 transition"
        >
          <FaBell size={20} className="text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {showNotif && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FaBell className="text-yellow-500" /> Notifications
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h3>
            <button
              onClick={() => setShowNotif(false)}
              className="text-gray-400 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <div className="divide-y max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-400 py-8 text-sm">
                No notifications yet.
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`px-6 py-4 flex items-start gap-3 ${
                    n.isRead ? "bg-white" : "bg-green-50"
                  }`}
                >
                  <div
                    className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                      n.isRead ? "bg-gray-300" : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">
                      {n.subject}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {n.message}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!n.isRead && (
                    <button
                      onClick={() => markRead(n._id)}
                      className="flex-shrink-0 text-green-500 hover:text-green-700"
                      title="Mark as read"
                    >
                      <FaCheck size={16} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        {statCards.map(({ label, value, color, icon }) => (
          <div
            key={label}
            className={`bg-gradient-to-br ${color} text-white rounded-2xl p-5 shadow flex items-center gap-4`}
          >
            <div className="bg-white bg-opacity-20 p-2 rounded-xl">{icon}</div>
            <div>
              <p className="text-3xl font-extrabold">{value}</p>
              <p className="text-xs opacity-90 mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {profile && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
            Business Profile
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
              <ProfileRow
                label="Full Name"
                value={`${profile.firstName} ${profile.lastName}`}
              />
              <ProfileRow label="Trade Name" value={profile.tradeName} />
              <ProfileRow label="License No." value={profile.licenseNumber} />
              <ProfileRow label="TRN Number" value={profile.trnNumber} />
              <ProfileRow label="Business Type" value={profile.businessType} />
              <ProfileRow label="Vendor ID" value={profile.idNumber} />
              <ProfileRow label="Contact" value={profile.contact} />
              <ProfileRow
                label="Address"
                value={`${profile.address}, ${profile.city}, ${profile.area}`}
              />
              <div className="sm:col-span-2">
                <span className="text-gray-500 font-medium">Status: </span>
                {profile.isApproved ? (
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">
                    ✅ Approved
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-bold">
                    ⏳ Pending Approval
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-3">
              {profile.idCardImage && (
                <DocImage src={profile.idCardImage} alt="ID Card" />
              )}
              {profile.licenseImage && (
                <DocImage src={profile.licenseImage} alt="License" />
              )}
              {profile.passportImage && (
                <DocImage src={profile.passportImage} alt="Passport" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div>
      <span className="text-gray-400 text-xs uppercase tracking-wide">
        {label}
      </span>
      <p className="text-gray-800 font-medium">{value || "—"}</p>
    </div>
  );
}

function DocImage({ src, alt }) {
  return (
    <div className="text-center">
      <img src={src} alt={alt} className="w-32 rounded-lg shadow border" />
      <p className="text-xs text-gray-400 mt-1">{alt}</p>
    </div>
  );
}
