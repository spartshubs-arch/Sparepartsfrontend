
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
  FaStore,
  FaUsers,
  FaCheckSquare,
  FaSquare,
} from "react-icons/fa";

const RECIPIENT_CONFIG = {
  admin: {
    label: "Admins",
    endpoint: "/notifications/recipients/admins",
    icon: <FaUserShield />,
    chip: "bg-blue-100 text-blue-700",
  },
  vendor: {
    label: "Vendors",
    endpoint: "/notifications/recipients/vendors",
    icon: <FaStore />,
    chip: "bg-green-100 text-green-700",
  },
  user: {
    label: "Users",
    endpoint: "/notifications/recipients/users",
    icon: <FaUsers />,
    chip: "bg-purple-100 text-purple-700",
  },
};

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
  const [sending, setSending] = useState(false);
  const [loadingRecipients, setLoadingRecipients] = useState(false);
  const [recipientError, setRecipientError] = useState("");

  const [form, setForm] = useState({
    subject: "",
    message: "",
    recipientType: "admin",
  });

  const [recipients, setRecipients] = useState([]);
  const [selectedRecipientIds, setSelectedRecipientIds] = useState([]);
  const [sendToAll, setSendToAll] = useState(false);
  const [search, setSearch] = useState("");

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

  const fetchRecipients = useCallback(async () => {
    try {
      setLoadingRecipients(true);
      setRecipientError("");

      const endpoint = RECIPIENT_CONFIG[form.recipientType].endpoint;
      const res = await axios.get(endpoint, { headers });

      const data = Array.isArray(res.data) ? res.data : [];
      setRecipients(data);
    } catch (error) {
      console.error("Recipient fetch error:", error);
      setRecipients([]);
      setRecipientError(
        error.response?.data?.message ||
          error.message ||
          "Failed to load recipients."
      );
    } finally {
      setLoadingRecipients(false);
    }
  }, [form.recipientType, headers]);

  useEffect(() => {
    if (!showPanel || editingId) return;
    fetchRecipients();
  }, [fetchRecipients, showPanel, editingId]);

  const filteredRecipients = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return recipients;

    return recipients.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const subtitle = item.subtitle?.toLowerCase() || "";
      return name.includes(term) || subtitle.includes(term);
    });
  }, [recipients, search]);

  const handleSubmit = async () => {
    if (!form.subject.trim() || !form.message.trim()) {
      alert("Please fill in subject and message.");
      return;
    }

    if (!editingId && !sendToAll && selectedRecipientIds.length === 0) {
      alert("Please select at least one recipient or enable Send To All.");
      return;
    }

    setSending(true);
    try {
      if (editingId) {
        await axios.put(
          `/notifications/${editingId}`,
          {
            subject: form.subject,
            message: form.message,
          },
          { headers }
        );
        alert("✅ Notification updated!");
      } else {
        await axios.post(
          "/notifications/superadmin/send",
          {
            recipientType: form.recipientType,
            recipientIds: sendToAll ? [] : selectedRecipientIds,
            sendToAll,
            subject: form.subject,
            message: form.message,
          },
          { headers }
        );
        alert("✅ Notification sent!");
      }

      cancelEdit();
      setShowPanel(true);
      fetchNotifications();

      if (!editingId) {
        fetchRecipients();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed.");
    } finally {
      setSending(false);
    }
  };

  const handleEdit = (n) => {
    setEditingId(n._id);
    setForm({
      subject: n.subject || "",
      message: n.message || "",
      recipientType: n.recipientType || "admin",
    });
    setSelectedRecipientIds([]);
    setSendToAll(false);
    setSearch("");
    setRecipientError("");
    setShowPanel(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notification?")) return;

    try {
      await axios.delete(`/notifications/${id}`, { headers });
      fetchNotifications();
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      subject: "",
      message: "",
      recipientType: "admin",
    });
    setRecipients([]);
    setSelectedRecipientIds([]);
    setSendToAll(false);
    setSearch("");
    setRecipientError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("superAdminToken");
    navigate("/superadmin/login");
  };

  const isSelected = (id) => selectedRecipientIds.includes(id);

  const toggleRecipient = (id) => {
    if (sendToAll || editingId) return;

    setSelectedRecipientIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAllVisible = () => {
    if (editingId) return;
    const ids = filteredRecipients.map((item) => item._id);
    setSelectedRecipientIds((prev) => Array.from(new Set([...prev, ...ids])));
  };

  const clearSelected = () => {
    setSelectedRecipientIds([]);
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

  const recipientBadge = (type) => {
    const cfg = RECIPIENT_CONFIG[type];
    if (!cfg) return null;

    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${cfg.chip}`}
      >
        {cfg.label}
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
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center">
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
              Send notifications to admins, vendors, or users.{" "}
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

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Write your message here..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Send To
                    </label>

                    <div className="flex flex-wrap gap-3">
                      {Object.entries(RECIPIENT_CONFIG).map(([key, cfg]) => (
                        <label
                          key={key}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition ${
                            form.recipientType === key
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="recipientType"
                            value={key}
                            checked={form.recipientType === key}
                            disabled={!!editingId}
                            onChange={() => {
                              setForm({ ...form, recipientType: key });
                              setSelectedRecipientIds([]);
                              setSendToAll(false);
                              setSearch("");
                              setRecipientError("");
                            }}
                            className="accent-blue-600"
                          />
                          <span className="flex items-center gap-2 text-sm font-medium">
                            {cfg.icon} {cfg.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {!editingId && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sendToAll}
                          onChange={(e) => setSendToAll(e.target.checked)}
                          className="mt-1 accent-blue-600"
                        />
                        <div>
                          <p className="font-semibold text-blue-800">
                            Send to all{" "}
                            {RECIPIENT_CONFIG[form.recipientType].label.toLowerCase()}
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            If checked, all recipients in this category will receive the notification.
                          </p>
                        </div>
                      </label>
                    </div>
                  )}

                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={handleSubmit}
                      disabled={sending}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                    >
                      <FaPaperPlane />
                      {sending
                        ? "Please wait..."
                        : editingId
                        ? "Update Notification"
                        : "Send Notification"}
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
                </div>
              </div>

              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                <div className="px-4 py-3 bg-gray-50 border-b">
                  <h3 className="font-bold text-gray-800">
                    {editingId
                      ? "Recipient info"
                      : `${RECIPIENT_CONFIG[form.recipientType].label} List`}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {editingId
                      ? "This edit only changes the selected notification record."
                      : "Select one, many, or send to all."}
                  </p>
                </div>

                {!editingId && (
                  <div className="p-4 border-b space-y-3">
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={`Search ${RECIPIENT_CONFIG[
                        form.recipientType
                      ].label.toLowerCase()}...`}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={selectAllVisible}
                        type="button"
                        className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
                      >
                        Select All Visible
                      </button>
                      <button
                        onClick={clearSelected}
                        type="button"
                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                      >
                        Clear Selected
                      </button>
                    </div>

                    <div className="text-xs text-gray-500">
                      Selected: {selectedRecipientIds.length}
                    </div>

                    {recipientError && (
                      <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded p-2">
                        {recipientError}
                      </div>
                    )}
                  </div>
                )}

                <div className="max-h-[420px] overflow-y-auto divide-y">
                  {editingId ? (
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {recipientBadge(form.recipientType)}
                      </div>
                      <p className="text-sm text-gray-600">
                        Subject and message can be edited here. Recipient targeting is not changed for already sent notification rows.
                      </p>
                    </div>
                  ) : loadingRecipients ? (
                    <p className="p-4 text-sm text-gray-500">Loading recipients...</p>
                  ) : filteredRecipients.length === 0 ? (
                    <p className="p-4 text-sm text-gray-500">No recipients found.</p>
                  ) : (
                    filteredRecipients.map((item) => {
                      const checked = isSelected(item._id);

                      return (
                        <button
                          key={item._id}
                          type="button"
                          disabled={sendToAll}
                          onClick={() => toggleRecipient(item._id)}
                          className={`w-full px-4 py-3 flex items-center justify-between text-left transition ${
                            sendToAll
                              ? "bg-gray-50 opacity-60 cursor-not-allowed"
                              : checked
                              ? "bg-blue-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <div>
                            <p className="font-semibold text-sm text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>

                          <div className="text-blue-600">
                            {checked ? <FaCheckSquare /> : <FaSquare />}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
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
                          {recipientBadge(n.recipientType)}
                        </div>

                        <p className="text-gray-500 text-xs line-clamp-2">
                          {n.message}
                        </p>

                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(n.createdAt).toLocaleString()}
                        </p>

                        <p className="text-gray-400 text-xs mt-1">
                          Recipient ID: {n.recipientId}
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
