import { useState } from "react";
import axios from "../../api/axios"; 
import { useNavigate } from "react-router-dom";

export default function AdminRegister() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    registeredBy: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const { username, password, registeredBy } = form;

  try {
    const res = await axios.post("/admin/register", {
      username,
      password,
      message: registeredBy, // 👈 mapping registeredBy to message for the backend
    });
    console.log("Admin registered:", res.data);

    alert("✅ Admin registered successfully!");
    navigate("/admin/login");
  } catch (err) {
    const message =
      err.response?.data?.message || "❌ Registration failed!";
    alert(message);
  }
};

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Registration</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          required
          className="p-2 border rounded"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
            className="p-2 w-full border rounded"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
          >
            {showPassword ? "🙈 Hide" : "👁 Show"}
          </span>
        </div>
        <input
          name="registeredBy"
          onChange={handleChange}
          placeholder="Registered By (e.g. Super Admin)"
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register Admin
        </button>
      </form>
    </div>
  );
}
