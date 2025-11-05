// import { useState } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import logo from'../logo/sparepartslogo.jpg'
// export default function Register() {
//   const [form, setForm] = useState({
//     idNumber: "",
//     password: "",
//     contact: "",
//     address: "",
//     firstName: "",
//     lastName: "",
//     city: "",
//     area: ""
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.idNumber.length !== 15) {
//       return alert("ID must be exactly 15 digits.");
//     }

//     try {
//       await axios.post("/vendor/register", form);
//       alert("✅ Registered successfully!");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-md mt-10">
//          <div className="flex justify-center mb-6">
//           <img src={logo} alt="Vendor Logo" className="h-24 w-auto" />
//         </div>
//       <h2 className="text-2xl font-bold mb-6">Vendor Registration</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//         <input name="firstName" onChange={handleChange} placeholder="First Name" required className="p-2 border rounded" />
//         <input name="lastName" onChange={handleChange} placeholder="Last Name" required className="p-2 border rounded" />
//         <input name="idNumber" onChange={handleChange} placeholder="15-digit Vendor ID" required className="p-2 border rounded" />
        
//         <div className="col-span-2 relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             onChange={handleChange}
//             placeholder="Create Password"
//             required
//             className="p-2 w-full border rounded"
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
//           >
//             {showPassword ? "🙈 Hide" : "👁 Show"}
//           </span>
//         </div>

//         <input name="contact" onChange={handleChange} placeholder="Contact Number" required className="p-2 border rounded" />
//         <input name="address" onChange={handleChange} placeholder="Shop Address" required className="p-2 border rounded" />
//         <input name="city" onChange={handleChange} placeholder="City" required className="p-2 border rounded" />
//         <input name="area" onChange={handleChange} placeholder="Area" required className="p-2 border rounded" />
//         <input
//   type="file"
//   name="idCardImage"
//   accept="image/*"
//   onChange={(e) => setFormData(e.target.files[0])}
// />

//         <div className="col-span-2 text-right">
//           <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" type="submit">
//             Register
//           </button>
//         </div>
//       </form>
//       <p className="mt-4 text-sm text-center">
//   Already have an account?{" "}
//   <span
//     onClick={() => navigate("/login")}
//     className="text-blue-600 hover:underline cursor-pointer"
//   >
//     Login here
//   </span>
// </p>

//     </div>
//   );
// }



// import { useState } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import logo from '../logo/sparepartslogo.jpg'

// export default function Register() {
//   const [form, setForm] = useState({
//     idNumber: "",
//     password: "",
//     contact: "",
//     address: "",
//     firstName: "",
//     lastName: "",
//     city: "",
//     area: ""
//   });

//   // NEW: state for file
//   const [idCardImage, setIdCardImage] = useState(null);

//   // NEW: Preview URL state
//   const [previewURL, setPreviewURL] = useState(null);

//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.idNumber.length !== 15) {
//       return alert("ID must be exactly 15 digits.");
//     }
//     if (!idCardImage) {
//       return alert("Please upload an ID Card image!");
//     }

//     // NEW: building FormData
//     const formData = new FormData();
//     Object.keys(form).forEach((key) => {
//       formData.append(key, form[key]);
//     });
//     formData.append("idCardImage", idCardImage);

//     try {
//       await axios.post("/vendor/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("✅ Registered successfully!");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-md mt-10">
//       <div className="flex justify-center mb-6">
//         <img src={logo} alt="Vendor Logo" className="h-24 w-auto" />
//       </div>
//       <h2 className="text-2xl font-bold mb-6">Vendor Registration</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//         <input name="firstName" onChange={handleChange} placeholder="First Name" required className="p-2 border rounded" />
//         <input name="lastName" onChange={handleChange} placeholder="Last Name" required className="p-2 border rounded" />
//         <input name="idNumber" onChange={handleChange} placeholder="15-digit Vendor ID" required className="p-2 border rounded" />
        
//         <div className="col-span-2 relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             onChange={handleChange}
//             placeholder="Create Password"
//             required
//             className="p-2 w-full border rounded"
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
//           >
//             {showPassword ? "🙈 Hide" : "👁 Show"}
//           </span>
//         </div>

//         <input name="contact" onChange={handleChange} placeholder="Contact Number" required className="p-2 border rounded" />
//         <input name="address" onChange={handleChange} placeholder="Shop Address" required className="p-2 border rounded" />
//         <input name="city" onChange={handleChange} placeholder="City" required className="p-2 border rounded" />
//         <input name="area" onChange={handleChange} placeholder="Area" required className="p-2 border rounded" />

//      {/* Label text for file input */}
// <label className="col-span-2 text-sm font-medium">Upload Your ID Card Image</label>

// <input
//   type="file"
//   name="idCardImage"
//   accept="image/*"
//   onChange={(e) => {
//     const file = e.target.files[0];
//     setIdCardImage(file);
//     if (file) {
//       setPreviewURL(URL.createObjectURL(file));
//     }
//   }}
//   className="col-span-2 p-2"
// />


//         {/* NEW Image Preview */}
//         {previewURL && (
//           <img
//             src={previewURL}
//             alt="ID Card Preview"
//             className="col-span-2 h-40 object-cover border rounded"
//           />
//         )}

//         <div className="col-span-2 text-right">
//           <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" type="submit">
//             Register
//           </button>
//         </div>
//       </form>

//       <p className="mt-4 text-sm text-center">
//         Already have an account?{" "}
//         <span
//           onClick={() => navigate("/login")}
//           className="text-blue-600 hover:underline cursor-pointer"
//         >
//           Login here
//         </span>
//       </p>
//     </div>
//   );
// // }
// import { useState } from "react";
// import axios from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import logo from '../logo/sparepartslogo.jpg';

// export default function Register() {
//   const [form, setForm] = useState({
//     idNumber: "",
//     password: "",
//     contact: "",
//     address: "",
//     firstName: "",
//     lastName: "",
//     city: "",
//     area: ""
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.idNumber.length !== 15) {
//       return alert("ID must be exactly 15 digits.");
//     }

//     try {
//       await axios.post("/vendor/register", form); // 🚀 sending normal JSON now
//       alert("✅ Registered successfully!");
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Registration failed");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-md mt-10">
//       <div className="flex justify-center mb-6">
//         <img src={logo} alt="Vendor Logo" className="h-24 w-auto" />
//       </div>
//       <h2 className="text-2xl font-bold mb-6">Vendor Registration</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//         <input name="firstName" onChange={handleChange} placeholder="First Name" required className="p-2 border rounded" />
//         <input name="lastName" onChange={handleChange} placeholder="Last Name" required className="p-2 border rounded" />
//         <input name="idNumber" onChange={handleChange} placeholder="15-digit Vendor ID" required className="p-2 border rounded" />

//         <div className="col-span-2 relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             onChange={handleChange}
//             placeholder="Create Password"
//             required
//             className="p-2 w-full border rounded"
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
//           >
//             {showPassword ? "🙈 Hide" : "👁 Show"}
//           </span>
//         </div>

//         <input name="contact" onChange={handleChange} placeholder="Contact Number" required className="p-2 border rounded" />
//         <input name="address" onChange={handleChange} placeholder="Shop Address" required className="p-2 border rounded" />
//         <input name="city" onChange={handleChange} placeholder="City" required className="p-2 border rounded" />
//         <input name="area" onChange={handleChange} placeholder="Area" required className="p-2 border rounded" />

//         <div className="col-span-2 text-right">
//           <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" type="submit">
//             Register
//           </button>
//         </div>
//       </form>

//       <p className="mt-4 text-sm text-center">
//         Already have an account?{" "}
//         <span
//           onClick={() => navigate("/login")}
//           className="text-blue-600 hover:underline cursor-pointer"
//         >
//           Login here
//         </span>
//       </p>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import logo from "../logo/sparepartslogo.jpg";

// 🌍 Common country codes
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
    contact: "+92", // default start with Pakistan code
    address: "",
    firstName: "",
    lastName: "",
    city: "",
    area: "",
  });

  const [countryCode, setCountryCode] = useState("+92");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanId = form.idNumber.replace(/-/g, "");

    if (cleanId.length !== 15) {
      return alert("ID must be exactly 15 digits.");
    }

    try {
      await axios.post("/vendor/register", {
        ...form,
        idNumber: cleanId,
        contact: form.contact, // already includes country code
      });
      alert("✅ Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("❌ Registration failed");
    }
  };

  // 📞 When user selects new country code
  const handleCountryChange = (e) => {
    const newCode = e.target.value;
    setCountryCode(newCode);

    // replace old code prefix if present
    const current = form.contact.replace(/^\+\d+\s?/, "");
    setForm({ ...form, contact: newCode + current });
  };

  // 📱 Handle typing in contact field
  const handleContactChange = (e) => {
    let value = e.target.value;

    // Always keep code prefix fixed
    if (!value.startsWith(countryCode)) {
      value = countryCode + value.replace(/^\+\d+/, "");
    }

    // Allow only digits after code
    const withoutCode = value.replace(countryCode, "").replace(/[^0-9]/g, "");
    setForm({ ...form, contact: countryCode + withoutCode });
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
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          placeholder="First Name"
          required
          className="p-2 border rounded"
        />
        <input
          name="lastName"
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          placeholder="Last Name"
          required
          className="p-2 border rounded"
        />

        <input
          name="idNumber"
          value={form.idNumber}
          onChange={(e) => {
            let value = e.target.value.replace(/[^0-9]/g, "");
            if (value.length > 3) value = value.slice(0, 3) + "-" + value.slice(3);
            if (value.length > 8) value = value.slice(0, 8) + "-" + value.slice(8);
            if (value.length > 16)
              value = value.slice(0, 16) + "-" + value.slice(16, 17);
            setForm({ ...form, idNumber: value });
          }}
          placeholder="15-digit Vendor ID"
          required
          maxLength={18}
          className="p-2 border rounded"
        />

        <div className="col-span-2 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Create Password"
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

        {/* 🌍 Country Code + Contact Field */}
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
            className="p-2 border rounded-r w-full"
          />
        </div>

        <input
          name="address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          placeholder="Shop Address"
          required
          className="p-2 border rounded col-span-2"
        />
        <input
          name="city"
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          placeholder="City"
          required
          className="p-2 border rounded"
        />
        <input
          name="area"
          onChange={(e) => setForm({ ...form, area: e.target.value })}
          placeholder="Area"
          required
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
