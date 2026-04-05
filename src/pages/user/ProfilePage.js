

import React, { useEffect, useMemo, useState, useCallback } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { FaBell, FaCheckCircle } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("userToken");

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const notifyHeaderRefresh = useCallback(() => {
    window.dispatchEvent(new Event("user-notifications-updated"));
  }, []);

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    const res = await axios.get("/auth/profile", { headers });
    setUser(res.data);
  }, [headers, token]);

  const fetchNotifications = useCallback(async () => {
    if (!token) return;

    setLoadingNotifications(true);
    try {
      const res = await axios.get("/notifications/user", { headers });
      setNotifications(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setNotifications([]);
    } finally {
      setLoadingNotifications(false);
    }
  }, [headers, token]);

  useEffect(() => {
    if (!token) {
      navigate("/loginuser");
      return;
    }

    Promise.all([fetchProfile(), fetchNotifications()]).catch((error) => {
      console.error("Profile load error:", error);
      navigate("/loginuser");
    });
  }, [token, navigate, fetchProfile, fetchNotifications]);

  useEffect(() => {
    const handleNotificationUpdate = () => {
      fetchNotifications();
    };

    const handleFocus = () => {
      fetchNotifications();
    };

    window.addEventListener("user-notifications-updated", handleNotificationUpdate);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("user-notifications-updated", handleNotificationUpdate);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchNotifications]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("userToken");
    notifyHeaderRefresh();
    toast.success("✅ Logged out successfully!");
    setTimeout(() => navigate("/loginuser"), 1500);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/auth/change-password",
        { oldPassword, newPassword },
        { headers }
      );

      toast.success(res.data.message || "✅ Password updated successfully!");
      setOldPassword("");
      setNewPassword("");

      setTimeout(() => {
        handleLogout();
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Error changing password");
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await axios.put(`/notifications/${id}/read`, {}, { headers });

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );

      notifyHeaderRefresh();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark as read");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await axios.put("/notifications/user/mark-all-read", {}, { headers });

      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      notifyHeaderRefresh();
      toast.success("All notifications marked as read");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to mark all as read");
    }
  };

  if (!user) {
    return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 mb-10 grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 pt-28">
      {/* Profile Card */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          My Profile
        </h2>

        <div className="space-y-3 text-gray-700 text-base">
          <p>
            <strong>First Name:</strong> {user.firstName || "—"}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName || "—"}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "—"}
          </p>
          <p>
            <strong>Login Type:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-white text-sm font-semibold ${
                user.isSocialLogin ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {user.isSocialLogin ? "Social Login" : "Manual Login"}
            </span>
          </p>
        </div>

        <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>

          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Update Password
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Notifications Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border min-h-[500px]">
        <div className="flex items-center justify-between mb-4 border-b pb-3 flex-wrap gap-3">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaBell className="text-orange-500" />
            Notifications
          </h3>

          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                {unreadCount} unread
              </span>
            )}

            <button
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className="text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-3 py-1.5 rounded-lg"
            >
              Mark All Read
            </button>
          </div>
        </div>

        <div className="max-h-[560px] overflow-y-auto divide-y">
          {loadingNotifications ? (
            <p className="text-gray-400 text-center py-10">
              Loading notifications...
            </p>
          ) : notifications.length === 0 ? (
            <p className="text-gray-400 text-center py-10">
              No notifications yet.
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`py-4 px-2 flex items-start gap-3 ${
                  n.isRead ? "bg-white" : "bg-orange-50"
                }`}
              >
                <div
                  className={`mt-2 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                    n.isRead ? "bg-gray-300" : "bg-orange-500"
                  }`}
                />

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800">{n.subject}</p>
                  <p className="text-sm text-gray-600 mt-1 break-words">
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>

                {!n.isRead && (
                  <button
                    onClick={() => handleMarkRead(n._id)}
                    className="text-green-600 hover:text-green-700 flex-shrink-0"
                    title="Mark as read"
                  >
                    <FaCheckCircle size={18} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default Profile;
