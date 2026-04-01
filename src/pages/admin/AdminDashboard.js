// pages/admin/AdminDashboard.jsx

import { useEffect, useState } from "react";
import axios from "../../api/axios";
import {
  FaShoppingCart, FaUsers, FaStore, FaBell, FaTimes, FaCheckCircle,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [stats,         setStats]         = useState({ orders: 0, users: 0, vendors: 0 });
  const [notifications, setNotifications] = useState([]);
  const [showNotif,     setShowNotif]     = useState(false);

  const token   = sessionStorage.getItem("adminToken");
  const headers = { Authorization: `Bearer ${token}` };
  const adminInfo = JSON.parse(sessionStorage.getItem("adminInfo") || "{}");

  // ── Fetch stats ─────────────────────────────────────────────────────────
  useEffect(() => {
    axios.get("/admin/stats", { headers })
      .then((r) => setStats(r.data))
      .catch(console.error);
  }, []);

  // ── Fetch notifications ──────────────────────────────────────────────────
  const fetchNotifications = () => {
    axios.get("/notifications/admin", { headers })
      .then((r) => setNotifications(r.data))
      .catch(console.error);
  };

  useEffect(() => { fetchNotifications(); }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markRead = async (id) => {
    try {
      await axios.put(`/notifications/${id}/read`, {}, { headers });
      setNotifications((prev) =>
        prev.map((n) => n._id === id ? { ...n, isRead: true } : n)
      );
    } catch { /* silent */ }
  };

  const statCards = [
    { title: "Total Orders",  count: stats.orders,  color: "from-purple-500 to-purple-700", icon: <FaShoppingCart size={28} /> },
    { title: "Total Users",   count: stats.users,   color: "from-blue-500   to-blue-700",   icon: <FaUsers size={28} /> },
    { title: "Total Vendors", count: stats.vendors, color: "from-green-500  to-green-700",  icon: <FaStore size={28} /> },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">Admin Dashboard</h2>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back, <span className="text-blue-600 font-semibold">{adminInfo.username || "Admin"}</span>
          </p>
        </div>

        {/* Notification bell */}
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

      {/* ── Notifications Panel ──────────────────────────────────────────── */}
      {showNotif && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <FaBell className="text-yellow-500" /> Notifications
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount} new</span>
              )}
            </h3>
            <button onClick={() => setShowNotif(false)} className="text-gray-400 hover:text-gray-700">
              <FaTimes />
            </button>
          </div>

          <div className="divide-y max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-400 py-8 text-sm">No notifications yet.</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  className={`px-6 py-4 flex items-start gap-3 transition
                    ${n.isRead ? "bg-white" : "bg-blue-50"}`}
                >
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0
                    ${n.isRead ? "bg-gray-300" : "bg-blue-500"}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{n.subject}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{n.message}</p>
                    <p className="text-gray-400 text-xs mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                  </div>
                  {!n.isRead && (
                    <button
                      onClick={() => markRead(n._id)}
                      className="flex-shrink-0 text-blue-500 hover:text-blue-700"
                      title="Mark as read"
                    >
                      <FaCheckCircle size={16} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ── Stat Cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map(({ title, count, color, icon }) => (
          <div
            key={title}
            className={`bg-gradient-to-br ${color} text-white rounded-2xl p-6 shadow-lg flex items-center gap-5`}
          >
            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
              {icon}
            </div>
            <div>
              <p className="text-4xl font-extrabold">{count}</p>
              <p className="text-sm opacity-90 mt-1">{title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
