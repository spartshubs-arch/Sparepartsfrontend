
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { FaCheckCircle, FaEdit, FaTimes, FaTrash } from "react-icons/fa"; // ← add FaTrash

const ALL_PAGES = [
  { key: "dashboard",        label: "Dashboard" },
  { key: "vendors",          label: "Vendors" },
  { key: "view-products",    label: "Products" },
  { key: "users",            label: "Users" },
  { key: "sliders",          label: "Featured Sliders" },
  { key: "category-banners", label: "Banners" },
  { key: "add-category",     label: "Add Category" }, 
  { key: "view-car-details", label: "Car Details" },
  { key: "orders",           label: "Orders" },
  { key: "callbackrequest",  label: "Callback Requests" },
  { key: "blogpage",         label: "Blog" },
  { key: "contact",          label: "Contact" },
  { key: "messages",         label: "Messages" },
  { key: "about-us",         label: "About Us" },
  { key: "faq",              label: "FAQ" },
];

function PermissionModal({ admin, onClose, onSave }) {
  const [accessType,    setAccessType]    = useState(admin?.accessType || "all");
  const [selectedPages, setSelectedPages] = useState(admin?.allowedPages || []);

  const togglePage = (key) =>
    setSelectedPages((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const selectAll = () => setSelectedPages(ALL_PAGES.map((p) => p.key));
  const clearAll  = () => setSelectedPages([]);

  const handleSave = () => {
    if (accessType === "selected" && selectedPages.length === 0) {
      alert("Please select at least one page.");
      return;
    }
    onSave({ accessType, allowedPages: selectedPages });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">
            Set Permissions — <span className="text-blue-600">{admin?.username}</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <FaTimes size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-4 flex-1">
          <p className="font-semibold text-gray-700 mb-3">Access Type</p>
          <div className="flex gap-4 mb-5">
            {["all", "selected"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="accessType"
                  value={type}
                  checked={accessType === type}
                  onChange={() => setAccessType(type)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className="capitalize font-medium text-gray-700">
                  {type === "all" ? "🌐 All Pages" : "🔒 Selected Pages Only"}
                </span>
              </label>
            ))}
          </div>

          {accessType === "selected" && (
            <>
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-gray-700">Choose Pages</p>
                <div className="flex gap-3">
                  <button onClick={selectAll} className="text-xs text-blue-600 hover:underline">Select All</button>
                  <button onClick={clearAll}  className="text-xs text-red-500 hover:underline">Clear</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ALL_PAGES.map(({ key, label }) => (
                  <label
                    key={key}
                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition
                      ${selectedPages.includes(key)
                        ? "bg-blue-50 border-blue-400 text-blue-700"
                        : "border-gray-200 hover:bg-gray-50 text-gray-600"}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedPages.includes(key)}
                      onChange={() => togglePage(key)}
                      className="accent-blue-600"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {selectedPages.length} / {ALL_PAGES.length} pages selected
              </p>
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50 text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
          >
            Save &amp; Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminApprovalPage() {
  const [stats,  setStats]  = useState({});
  const [admins, setAdmins] = useState([]);
  const [modal,  setModal]  = useState(null);

  const token   = localStorage.getItem("superAdminToken");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      const [sRes, aRes] = await Promise.all([
        axios.get("/superadmin/admin-stats", { headers }),
        axios.get("/superadmin/admins",      { headers }),
      ]);
      setStats(sRes.data);
      setAdmins(aRes.data);
    } catch {
      alert("Failed to load data");
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async ({ accessType, allowedPages }) => {
    try {
      if (modal.mode === "approve") {
        await axios.put(
          `/superadmin/approve-admin/${modal.admin._id}`,
          { accessType, allowedPages },
          { headers }
        );
        alert("✅ Admin approved with permissions!");
      } else {
        await axios.put(
          `/superadmin/update-permissions/${modal.admin._id}`,
          { accessType, allowedPages },
          { headers }
        );
        alert("✅ Permissions updated!");
      }
      setModal(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  // ── DELETE HANDLER ──────────────────────────────────────────────────────────
  const handleDelete = async (admin) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete admin "${admin.username}"?\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/superadmin/delete-admin/${admin._id}`, { headers });
      alert(`✅ Admin "${admin.username}" deleted successfully.`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to delete admin");
    }
  };
  // ───────────────────────────────────────────────────────────────────────────

  const statCards = [
    { label: "Total",     value: stats.totalAdmins   ?? 0, bg: "bg-blue-100   text-blue-700"   },
    { label: "Remaining", value: stats.remainingSlots ?? 0, bg: "bg-purple-100 text-purple-700" },
    { label: "Approved",  value: stats.approvedAdmins ?? 0, bg: "bg-green-100  text-green-700"  },
    { label: "Pending",   value: stats.pendingAdmins  ?? 0, bg: "bg-yellow-100 text-yellow-700" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🛡️ Admin Approval &amp; Permissions</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-5 shadow`}>
            <p className="text-3xl font-extrabold">{value}</p>
            <p className="text-sm font-medium">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Registered By</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Access Type</th>
              <th className="px-4 py-3 text-left">Allowed Pages</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold text-gray-800">{admin.username}</td>
                <td className="px-4 py-3 text-gray-500">{admin.registeredBy}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold
                    ${admin.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {admin.isApproved ? "✅ Approved" : "⏳ Pending"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {admin.isApproved ? (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold
                      ${admin.accessType === "all"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"}`}>
                      {admin.accessType === "all" ? "🌐 All" : "🔒 Selected"}
                    </span>
                  ) : "—"}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs max-w-xs">
                  {admin.isApproved
                    ? admin.accessType === "all"
                      ? <span className="text-blue-500">All Pages</span>
                      : admin.allowedPages?.length > 0
                        ? admin.allowedPages.join(", ")
                        : "None"
                    : "—"}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>

                {/* ── ACTIONS COLUMN ───────────────────────────────────────── */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {/* Approve / Edit Access */}
                    {!admin.isApproved ? (
                      <button
                        onClick={() => setModal({ admin, mode: "approve" })}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-semibold"
                      >
                        <FaCheckCircle /> Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => setModal({ admin, mode: "edit" })}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-semibold"
                      >
                        <FaEdit /> Edit Access
                      </button>
                    )}

                    {/* Delete button — always visible */}
                    <button
                      onClick={() => handleDelete(admin)}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-semibold"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
                {/* ─────────────────────────────────────────────────────────── */}

              </tr>
            ))}
          </tbody>
        </table>

        {admins.length === 0 && (
          <p className="text-center py-10 text-gray-400">No admins found.</p>
        )}
      </div>

      {modal && (
        <PermissionModal
          admin={modal.admin}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
