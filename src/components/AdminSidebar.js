import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt, FaUsers, FaBoxOpen, FaStore, FaSignOutAlt,
  FaImages, FaPhotoVideo, FaPlusSquare, FaCar, FaHeadset,
  FaSignInAlt, FaPhoneAlt, FaCommentDots, FaInfoCircle, FaQuestionCircle,
  FaBars, FaTimes,
} from "react-icons/fa";
import logo from "../logo/sparepartslogo.jpg";

// ── All possible nav items (key must match what super admin assigns) ───────────
const NAV_ITEMS = [
  { key: "dashboard",        label: "Dashboard",      path: "/admin/dashboard",         icon: <FaTachometerAlt /> },
  { key: "vendors",          label: "Vendors",         path: "/admin/vendors",           icon: <FaStore /> },
  { key: "view-products",    label: "Products",        path: "/admin/view-products",     icon: <FaBoxOpen /> },
  { key: "users",            label: "Users",           path: "/admin/users",             icon: <FaUsers /> },
  { key: "sliders",          label: "Featured",        path: "/admin/sliders",           icon: <FaImages /> },
  { key: "category-banners", label: "Banners",         path: "/admin/category-banners",  icon: <FaPhotoVideo /> },
  { key: "add-category",     label: "Add Category",    path: "/admin/add-category",      icon: <FaPlusSquare /> },
  { key: "view-car-details", label: "Car Details",     path: "/admin/view-car-details",  icon: <FaCar /> },
  { key: "orders",           label: "Orders",          path: "/admin/orders",            icon: <FaStore />, isOrders: true },
  { key: "callbackrequest",  label: "Callback",        path: "/admin/callbackrequest",   icon: <FaHeadset /> },
  { key: "blogpage",         label: "Blog",            path: "/admin/blogpage",          icon: <FaSignInAlt /> },
  { key: "contact",          label: "Contact",         path: "/admin/contact",           icon: <FaPhoneAlt /> },
  { key: "messages",         label: "Messages",        path: "/admin/messages",          icon: <FaCommentDots /> },
  { key: "about-us",         label: "About",           path: "/admin/about-us",          icon: <FaInfoCircle /> },
  { key: "faq",              label: "FAQ",             path: "/admin/faq",               icon: <FaQuestionCircle /> },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  const [hasNewOrders,    setHasNewOrders]    = useState(false);
  const [prevOrderCount,  setPrevOrderCount]  = useState(0);
  const [isOpen,          setIsOpen]          = useState(false);
  const [accessType,      setAccessType]      = useState("all");   // "all" | "selected"
  const [allowedPages,    setAllowedPages]    = useState([]);      // array of keys

  // ── Fetch this admin's permissions ──────────────────────────────────────────
  // ── Fetch this admin's permissions ──────────────────────────────────────────
useEffect(() => {
  const fetchPermissions = async () => {
    try {
      const token = sessionStorage.getItem("adminToken"); // ← get token
      if (!token) return;

      const res = await axios.get("/admin/my-permissions", {
        headers: { Authorization: `Bearer ${token}` }, // ← send it
      });

      setAccessType(res.data.accessType || "all");
      setAllowedPages(res.data.allowedPages || []);
    } catch (err) {
      console.error("Could not load permissions", err);
    }
  };
  fetchPermissions();
}, []);

  // ── Poll for new orders ─────────────────────────────────────────────────────
  useEffect(() => {
    const checkOrders = async () => {
      try {
        const res = await axios.get("/orders");
        const count = res.data.length;
        if (count > prevOrderCount) setHasNewOrders(true);
        setPrevOrderCount(count);
      } catch (err) {
        console.error(err);
      }
    };
    checkOrders();
    const interval = setInterval(checkOrders, 30000);
    return () => clearInterval(interval);
  }, [prevOrderCount]);

  // ── Filter nav based on permissions ────────────────────────────────────────
  const visibleNav = NAV_ITEMS.filter((item) =>
    accessType === "all" || allowedPages.includes(item.key)
  );

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4 sticky top-0 z-50">
        <span className="font-bold">Admin Panel</span>
        <button onClick={() => setIsOpen(true)}><FaBars size={20} /></button>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 w-full md:w-64 h-full
          bg-gradient-to-b from-gray-700 to-gray-800
          text-white p-6 z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-y-0" : "-translate-y-full"}
          md:translate-y-0
        `}
      >
        {/* CLOSE (mobile) */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setIsOpen(false)}><FaTimes size={20} /></button>
        </div>

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-6">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold text-green-400">Admin Panel</span>
        </div>

        {/* Permission badge */}
        <div className="mb-4">
          <span className={`text-xs px-2 py-1 rounded-full font-semibold
            ${accessType === "all" ? "bg-blue-600" : "bg-orange-500"}`}>
            {accessType === "all" ? "🌐 Full Access" : `🔒 ${allowedPages.length} Pages`}
          </span>
        </div>

        {/* NAV */}
        <nav className="space-y-1 max-h-[65vh] overflow-y-auto pr-1">
          {visibleNav.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              onClick={() => {
                if (item.isOrders) setHasNewOrders(false);
                setIsOpen(false);
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                 ${isActive
                   ? "bg-green-500 text-white"
                   : "hover:bg-gray-600 text-gray-200"}`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
              {item.isOrders && hasNewOrders && (
                <span className="ml-auto w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
              )}
            </NavLink>
          ))}
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 w-full py-2 px-4 rounded-lg mt-6 text-sm font-semibold"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </>
  );
};

export default AdminSidebar;
