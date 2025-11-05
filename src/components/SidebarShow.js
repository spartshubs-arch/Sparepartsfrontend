



// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import {
//   FaTachometerAlt,
//   FaPlusSquare,
//   FaBoxOpen,
//   FaSignOutAlt
// } from 'react-icons/fa';
// import logo from '../logo/sparepartslogo.jpg'; // Replace with actual vendor logo if needed

// export default function SidebarShow() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem("vendorToken");
//     localStorage.removeItem("vendorInfo");
//     navigate("/login");
//   };

//   const linkClass = (path) =>
//     location.pathname === path
//       ? "flex items-center gap-2 mb-3 text-white font-semibold"
//       : "flex items-center gap-2 mb-3 text-gray-400 hover:text-green-400";

//   return (
//     <div className="bg-gray-800 text-white w-64 h-screen p-4 flex flex-col justify-between">
//       <div>
//         {/* ✅ Vendor Logo and Heading */}
//         <div className="flex items-center gap-2 mb-6">
//           <img src={logo} alt="Vendor Logo" className="w-11 h-13 rounded-full shadow-md" />
//           <h1 className="text-xl font-bold text-green-400">Vendor Panel</h1>
//         </div>

//         {/* ✅ Navigation Links */}
//         <nav>
//           <Link to="/vendor/" className={linkClass("/")}>
//             <FaTachometerAlt /> Dashboard
//           </Link>
//           <Link to="/vendor/add-product" className={linkClass("/add-product")}>
//             <FaPlusSquare /> Add Product
//           </Link>
//           <Link to="/vendor/view-products" className={linkClass("/view-products")}>
//             <FaBoxOpen /> View Products
//           </Link>
//         </nav>
//       </div>

//       {/* ✅ Logout Button */}
//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-2 mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
//       >
//         <FaSignOutAlt /> Logout
//       </button>
//     </div>
//   );
// }



import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaPlusSquare,
  FaBoxOpen,
  FaUser,
  FaSignOutAlt
} from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import logo from '../logo/sparepartslogo.jpg';

export default function SidebarShow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [vendor, setVendor] = useState(null);

  // ✅ Fetch vendor profile on mount
 useEffect(() => {
  const token = sessionStorage.getItem("vendorToken");
  if (!token) return;

  axios.get("/vendor/profile", {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(res => {
    setVendor(res.data);
    sessionStorage.setItem("vendorInfo", JSON.stringify(res.data)); // 🔄 keep updated
  })
  .catch(err => console.error("❌ Failed to fetch vendor profile", err));
}, []);


  const handleLogout = () => {
    sessionStorage.removeItem("vendorToken");
    sessionStorage.removeItem("vendorInfo");
    navigate("/login");
  };

  const linkClass = (path) =>
    location.pathname === path
      ? "flex items-center gap-2 mb-3 text-white font-semibold"
      : "flex items-center gap-2 mb-3 text-gray-400 hover:text-green-400";

  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4 flex flex-col justify-between">
      <div>
        {/* ✅ Vendor Logo and Heading */}
        <div className="flex items-center gap-2 mb-6">
          <img src={logo} alt="Vendor Logo" className="w-11 h-13 rounded-full shadow-md" />
          <h1 className="text-xl font-bold text-green-400">Vendor Panel</h1>
        </div>

        {/* ✅ Navigation Links */}
        <nav>
          <Link to="/vendor" className={linkClass("/vendor")}>
            <FaTachometerAlt /> Dashboard
          </Link>
          <Link to="/vendor/profile" className={linkClass("/vendor/profile")}>
            <FaUser /> Profile
          </Link>

          {/* 🚫 Hide until approved */}
          {vendor?.isApproved && (
            <>
              <Link to="/vendor/add-product" className={linkClass("/vendor/add-product")}>
                <FaPlusSquare /> Add Product
              </Link>
              <Link to="/vendor/view-products" className={linkClass("/vendor/view-products")}>
                <FaBoxOpen /> View Products
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* ✅ Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
}
