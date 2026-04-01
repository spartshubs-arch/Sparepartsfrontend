// components/AdminProtectedRoute.jsx

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";

// pageKey must match the keys in NAV_ITEMS e.g. "orders", "users"
const AdminProtectedRoute = ({ children, pageKey }) => {
  const [status, setStatus] = useState("loading"); // "loading" | "allowed" | "denied"

  useEffect(() => {
    const check = async () => {
      try {
        const token = sessionStorage.getItem("adminToken");
        if (!token) { setStatus("denied"); return; }

        const res = await axios.get("/admin/my-permissions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { accessType, allowedPages } = res.data;

        // If full access OR this page is in their allowed list → allow
        if (accessType === "all" || allowedPages.includes(pageKey)) {
          setStatus("allowed");
        } else {
          setStatus("denied");
        }
      } catch {
        setStatus("denied");
      }
    };
    check();
  }, [pageKey]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-sm animate-pulse">Checking access...</div>
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-500 text-sm">
          You don't have permission to view this page.
        </p>
        <p className="text-gray-400 text-xs mt-1">
          Contact your super admin to request access.
        </p>
      </div>
    );
  }

  return children;
};

export default AdminProtectedRoute;
