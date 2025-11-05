import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("/admin/login", { username, password });

    // ✅ Save token and admin info
    sessionStorage.setItem("adminToken", res.data.token);
    sessionStorage.setItem("adminInfo", JSON.stringify(res.data.admin));

    alert("✅ Logged in as Super Admin");
    navigate("/admin/dashboard");

  } catch (err) {
    console.error(err);
    alert("❌ Login failed");
  }
};


  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Super Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <div className="relative">
          <input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute top-2 right-3 text-sm cursor-pointer text-gray-500"
          >
            {show ? "🙈 Hide" : "👁 Show"}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
          Login as Admin
        </button>
      </form>
    </div>
  );
}
