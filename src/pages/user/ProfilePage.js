import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
      navigate("/loginuser");
      return;
    }

    axios
      .get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => navigate("/loginuser"));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("userToken");
    toast.success("✅ Logged out successfully!");
    setTimeout(() => navigate("/loginuser"), 1500);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("userToken");
      const res = await axios.post(
        "/auth/change-password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
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

  if (!user) return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Profile</h2>

      <div className="space-y-3 text-gray-700 text-base">
        <p><strong>First Name:</strong> {user.firstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
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

      {/* ✅ Show Change Password form only for manual login */}
     
        <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>

          {/* Old Password */}
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

          {/* New Password */}
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

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default Profile;
