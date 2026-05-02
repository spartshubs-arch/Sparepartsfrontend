import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import logo from "../logo/sparepartslogo.jpg";

// Common country codes
const countryCodes = [
  { code: "+92", name: "Pakistan 🇵🇰" },
  { code: "+91", name: "India 🇮🇳" },
  { code: "+971", name: "UAE 🇦🇪" },
  { code: "+966", name: "Saudi Arabia 🇸🇦" },
  { code: "+1", name: "USA 🇺🇸" },
  { code: "+44", name: "UK 🇬🇧" },
  { code: "+61", name: "Australia 🇦🇺" },
  { code: "+81", name: "Japan 🇯🇵" },
  { code: "+49", name: "Germany 🇩🇪" },
  { code: "+33", name: "France 🇫🇷" },
  { code: "+39", name: "Italy 🇮🇹" },
  { code: "+86", name: "China 🇨🇳" },
  { code: "+7", name: "Russia 🇷🇺" },
  { code: "+34", name: "Spain 🇪🇸" },
  { code: "+55", name: "Brazil 🇧🇷" },
  { code: "+234", name: "Nigeria 🇳🇬" },
  { code: "+27", name: "South Africa 🇿🇦" },
  { code: "+60", name: "Malaysia 🇲🇾" },
  { code: "+62", name: "Indonesia 🇮🇩" },
  { code: "+94", name: "Sri Lanka 🇱🇰" },
];

export default function Register() {
  const [form, setForm] = useState({
    idNumber: "",
    password: "",
    contact: "+971",
    address: "",
    firstName: "",
    lastName: "",
    city: "",
    area: "",
  });

  const [countryCode, setCountryCode] = useState("+971");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanId = form.idNumber.replace(/-/g, "");

    if (cleanId.length !== 15) {
      return alert("ID must be exactly 15 digits.");
    }

    // Password: min 8, at least 1 uppercase, at least 1 special char
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      return alert(
        "Password must be at least 8 characters and include 1 uppercase letter and 1 special character."
      );
    }

    // First/Last name: letters, spaces, apostrophes, hyphens
    const nameRegex = /^[A-Za-z][A-Za-z\s'-]{0,49}$/;

    if (!nameRegex.test(form.firstName.trim())) {
      return alert(
        "First name can contain only letters, spaces, apostrophes, and hyphens."
      );
    }

    if (!nameRegex.test(form.lastName.trim())) {
      return alert(
        "Last name can contain only letters, spaces, apostrophes, and hyphens."
      );
    }

    // City/Area: letters, spaces, apostrophes, hyphens, periods
    const placeRegex = /^[A-Za-z][A-Za-z\s.'-]{0,99}$/;
    const areaRegex = /^[A-Za-z][A-Za-z\s.'-]{0,149}$/;

    if (!placeRegex.test(form.city.trim())) {
      return alert(
        "City can contain only letters, spaces, apostrophes, hyphens, and periods."
      );
    }

    if (!areaRegex.test(form.area.trim())) {
      return alert(
        "Area can contain only letters, spaces, apostrophes, hyphens, and periods."
      );
    }

    try {
      await axios.post("/vendor/register", {
        ...form,
        idNumber: cleanId,
        contact: form.contact,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        city: form.city.trim(),
        area: form.area.trim(),
        address: form.address.trim(),
      });

      alert("✅ Registered successfully!");
      navigate("/login");
    } catch (err) {
  console.error("Registration error:", err);

  const message =
    err.response?.data?.message ||
    "Registration failed. Please try again.";

  alert(`❌ ${message}`);
}
  };

  const handleCountryChange = (e) => {
    const newCode = e.target.value;
    setCountryCode(newCode);

    const current = form.contact.replace(/^\+\d+\s?/, "");
    setForm({ ...form, contact: newCode + current });
  };

  const handleContactChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith(countryCode)) {
      value = countryCode + value.replace(/^\+\d+/, "");
    }

    const withoutCode = value
      .replace(countryCode, "")
      .replace(/[^0-9]/g, "");

    setForm({ ...form, contact: countryCode + withoutCode });
  };

  const handleNameChange = (field, value) => {
    const cleanedValue = value.replace(/[^A-Za-z\s'-]/g, "");
    setForm({ ...form, [field]: cleanedValue });
  };

  const handlePlaceChange = (field, value) => {
    const cleanedValue = value.replace(/[^A-Za-z\s.'-]/g, "");
    setForm({ ...form, [field]: cleanedValue });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-md mt-10">
      <div className="flex justify-center mb-6">
        <img src={logo} alt="Vendor Logo" className="h-24 w-auto" />
      </div>

      <h2 className="text-2xl font-bold mb-6">Vendor Registration</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          name="firstName"
          value={form.firstName}
          onChange={(e) => handleNameChange("firstName", e.target.value)}
          placeholder="First Name"
          required
          maxLength={50}
          className="p-2 border rounded"
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={(e) => handleNameChange("lastName", e.target.value)}
          placeholder="Last Name"
          required
          maxLength={50}
          className="p-2 border rounded"
        />

        <input
          name="idNumber"
          value={form.idNumber}
          onChange={(e) => {
            let value = e.target.value.replace(/[^0-9]/g, "");
            if (value.length > 3) value = value.slice(0, 3) + "-" + value.slice(3);
            if (value.length > 8) value = value.slice(0, 8) + "-" + value.slice(8);
            if (value.length > 16) {
              value = value.slice(0, 16) + "-" + value.slice(16, 17);
            }
            setForm({ ...form, idNumber: value });
          }}
          placeholder="15-digit Vendor ID"
          required
          maxLength={18}
          className="p-2 border rounded"
        />

        // <div className="col-span-2 relative">
        //   <input
        //     type={showPassword ? "text" : "password"}
        //     name="password"
        //     value={form.password}
        //     onChange={(e) => setForm({ ...form, password: e.target.value })}
        //     placeholder="Password (8+ chars, 1 uppercase, 1 special char)"
        //     required
        //     minLength={8}
        //     title="Password must be at least 8 characters long and include 1 uppercase letter and 1 special character"
        //     className="p-2 w-full border rounded"
        //   />

        //   <span
        //     onClick={() => setShowPassword(!showPassword)}
        //     className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
        //   >
        //     {showPassword ? "🙈 Hide" : "👁 Show"}
        //   </span>
        // </div>
<div className="col-span-2 relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={form.password}
    onChange={(e) => setForm({ ...form, password: e.target.value })}
    placeholder="Password (8+ chars, 1 uppercase, 1 special)"
    required
    minLength={8}
    title="Password must be at least 8 characters long and include 1 uppercase letter and 1 special character"
    className="p-2 pr-16 w-full border rounded"
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xs text-gray-600 bg-white px-1"
  >
    {showPassword ? "🙈 Hide" : "👁 Show"}
  </span>
</div>
        <div className="col-span-2 flex">
          <select
            value={countryCode}
            onChange={handleCountryChange}
            className="border rounded-l p-2 w-40 bg-gray-50 cursor-pointer"
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} {c.code}
              </option>
            ))}
          </select>

          <input
            name="contact"
            type="tel"
            value={form.contact}
            onChange={handleContactChange}
            placeholder="Contact Number"
            required
            maxLength={13}
            className="p-2 border rounded-r w-full"
          />
        </div>

        <input
          name="address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Shop Address"
          required
          className="p-2 border rounded col-span-2"
        />

        <input
          name="city"
          value={form.city}
          onChange={(e) => handlePlaceChange("city", e.target.value)}
          placeholder="City"
          required
          maxLength={100}
          className="p-2 border rounded"
        />

        <input
          name="area"
          value={form.area}
          onChange={(e) => handlePlaceChange("area", e.target.value)}
          placeholder="Area"
          required
          maxLength={150}
          className="p-2 border rounded"
        />

        <div className="col-span-2 text-right">
          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Login here
        </span>
      </p>
    </div>
  );
}
