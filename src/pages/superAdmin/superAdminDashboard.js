import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import {
  FaUserShield,
  FaCheckCircle,
  FaClock,
  FaLayerGroup,
  FaSignOutAlt,
  FaBell,
  FaTrash,
  FaEdit,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("superAdminToken");

  const headers = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  );

  const [stats, setStats] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    subject: "",
    message: "",
    targetType: "admin",
  });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    axios
      .get("/superadmin/admin-stats", { headers })
      .then((r) => setStats(r.data))
      .catch(console.error);
  }, [headers]);

  const fetchNotifications = useCallback(() => {
    axios
      .get("/notifications/all", { headers })
      .then((r) => setNotifications(r.data))
      .catch(console.error);
  }, [headers]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleSubmit = async () => {
    if (!form.subject.trim() || !form.message.trim()) {
      alert("Please fill in subject and message.");
      return;
    }

    setSending(true);
    try {
      if (editingId) {
        await axios.put(`/notifications/${editingId}`, form, { headers });
        alert("✅ Notification updated!");
      } else {
        await axios.post("/notifications", form, { headers });
        alert("✅ Notification sent!");
      }

      setForm({ subject: "", message: "", targetType: "admin" });
      setEditingId(null);
      fetchNotifications();
    } catch (err) {
      alert(err.response?.data?.message || "Failed.");
    } finally {
      setSending(false);
    }
  };

  const handleEdit = (n) => {
    setEditingId(n._id);
    setForm({
      subject: n.subject,
      message: n.message,
      targetType: n.targetType,
    });
    setShowPanel(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notification?")) return;
    try {
      await axios.delete(`/notifications/${id}`, { headers });
      fetchNotifications();
    } catch {
      alert("Failed to delete.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ subject: "", message: "", targetType: "admin" });
  };

  const handleLogout = () => {
    localStorage.removeItem("superAdminToken");
    navigate("/superadmin/login");
  };

  const cards = [
    {
      label: "Total Admins",
      value: stats.totalAdmins ?? 0,
      color: "bg-blue-500",
      icon: <FaUserShield size={24} />,
    },
    {
      label: "Approved",
      value: stats.approvedAdmins ?? 0,
      color: "bg-green-500",
      icon: <FaCheckCircle size={24} />,
    },
    {
      label: "Pending",
      value: stats.pendingAdmins ?? 0,
      color: "bg-yellow-500",
      icon: <FaClock size={24} />,
    },
    {
      label: "Remaining Slots",
      value: stats.remainingSlots ?? 0,
      color: "bg-purple-500",
      icon: <FaLayerGroup size={24} />,
    },
  ];

  const targetBadge = (t) => {
    const map = {
      admin: "bg-blue-100 text-blue-700",
      vendor: "bg-green-100 text-green-700",
      both: "bg-purple-100 text-purple-700",
    };

    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${map[t]}`}
      >
        {t === "both" ? "Admins & Vendors" : t}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between shadow sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-wide">
          ⚙️ Super Admin Panel
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setShowPanel(!showPanel);
              cancelEdit();
            }}
            className="relative flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-sm font-semibold transition"
          >
            <FaBell /> Notifications
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <main className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {cards.map((c) => (
            <div
              key={c.label}
              className={`${c.color} text-white rounded-xl p-5 shadow flex items-center gap-4`}
            >
              <div className="opacity-80">{c.icon}</div>
              <div>
                <p className="text-3xl font-extrabold">{c.value}</p>
                <p className="text-sm opacity-90">{c.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            onClick={() => navigate("/superadmin/admin-approval")}
            className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all border-l-4 border-blue-500"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              🛡️ Admin Approval & Permissions
            </h2>
            <p className="text-gray-500 text-sm">
              Approve pending admins and control page access.
            </p>
          </div>

          <div
            onClick={() => {
              setShowPanel(true);
              cancelEdit();
            }}
            className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all border-l-4 border-yellow-500"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              🔔 Notifications
            </h2>
            <p className="text-gray-500 text-sm">
              Send announcements to admins, vendors, or both.{" "}
              {notifications.length} sent so far.
            </p>
          </div>
        </div>

        {showPanel && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "✏️ Edit Notification" : "📢 Send Notification"}
              </h2>
              <button
                onClick={() => {
                  setShowPanel(false);
                  cancelEdit();
                }}
                className="text-gray-400 hover:text-gray-700"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  placeholder="Notification subject..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Send To
                </label>
                <div className="flex gap-3">
                  {["admin", "vendor", "both"].map((t) => (
                    <label
                      key={t}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="targetType"
                        value={t}
                        checked={form.targetType === t}
                        onChange={() => setForm({ ...form, targetType: t })}
                        className="accent-blue-600"
                      />
                      <span className="text-sm capitalize font-medium text-gray-700">
                        {t === "both"
                          ? "Both"
                          : t === "admin"
                          ? "Admins"
                          : "Vendors"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={sending}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
              >
                <FaPaperPlane />{" "}
                {editingId ? "Update" : "Send Notification"}
              </button>

              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                  Sent Notifications
                </h3>
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div
                      key={n._id}
                      className="flex items-start justify-between bg-gray-50 border border-gray-200 rounded-xl p-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="font-semibold text-gray-800 text-sm">
                            {n.subject}
                          </p>
                          {targetBadge(n.targetType)}
                        </div>
                        <p className="text-gray-500 text-xs line-clamp-2">
                          {n.message}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2 ml-4 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(n)}
                          className="text-blue-500 hover:text-blue-700 p-1"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(n._id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          title="Delete"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
