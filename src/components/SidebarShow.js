



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



// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import {
//   FaTachometerAlt,
//   FaPlusSquare,
//   FaBoxOpen,
//   FaUser,
//   FaSignOutAlt
// } from 'react-icons/fa';
// import { useEffect, useState } from 'react';
// import axios from '../api/axios';
// import logo from '../logo/sparepartslogo.jpg';

// export default function SidebarShow() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [vendor, setVendor] = useState(null);

//   // ✅ Fetch vendor profile on mount
//  useEffect(() => {
//   const token = sessionStorage.getItem("vendorToken");
//   if (!token) return;

//   axios.get("/vendor/profile", {
//     headers: { Authorization: `Bearer ${token}` }
//   })
//   .then(res => {
//     setVendor(res.data);
//     sessionStorage.setItem("vendorInfo", JSON.stringify(res.data)); // 🔄 keep updated
//   })
//   .catch(err => console.error("❌ Failed to fetch vendor profile", err));
// }, []);


//   const handleLogout = () => {
//     sessionStorage.removeItem("vendorToken");
//     sessionStorage.removeItem("vendorInfo");
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
//           <Link to="/vendor" className={linkClass("/vendor")}>
//             <FaTachometerAlt /> Dashboard
//           </Link>
//           <Link to="/vendor/profile" className={linkClass("/vendor/profile")}>
//             <FaUser /> Profile
//           </Link>

//           {/* 🚫 Hide until approved */}
//           {vendor?.isApproved && (
//             <>
//               <Link to="/vendor/add-product" className={linkClass("/vendor/add-product")}>
//                 <FaPlusSquare /> Add Product
//               </Link>
//               <Link to="/vendor/view-products" className={linkClass("/vendor/view-products")}>
//                 <FaBoxOpen /> View Products
//               </Link>
//             </>
//           )}
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



import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusSquare,
  FaBoxOpen,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import logo from "../logo/sparepartslogo.jpg";

export default function SidebarShow() {
  const navigate = useNavigate();
  const location = useLocation();
  const [vendor, setVendor] = useState(null);

  // ✅ Mobile sidebar toggle
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Fetch vendor profile on mount
  useEffect(() => {
    const token = sessionStorage.getItem("vendorToken");
    if (!token) return;

    axios
      .get("/vendor/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setVendor(res.data);
        sessionStorage.setItem("vendorInfo", JSON.stringify(res.data)); // 🔄 keep updated
      })
      .catch((err) => console.error("❌ Failed to fetch vendor profile", err));
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

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* ✅ Mobile Top Bar (keeps logo + Vendor Panel on top) */}
      <div className="md:hidden sticky top-0 z-40 bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-nowrap min-w-0">
          <img
            src={logo}
            alt="Vendor Logo"
            className="w-10 h-10 rounded-full shadow-md shrink-0"
          />
          <h1 className="text-lg font-bold text-green-400 whitespace-nowrap">
            Vendor Panel
          </h1>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="text-white text-xl p-2 -mr-2"
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </div>

      {/* ✅ Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* ✅ Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 z-50
          bg-gray-800 text-white h-screen p-4 flex flex-col justify-between
          w-[85vw] max-w-[18rem] md:w-64
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="flex-1 min-h-0 overflow-y-auto">
          {/* ✅ Logo + Vendor Panel ALWAYS at top (desktop + mobile sidebar) */}
          <div className="flex items-center justify-between mb-6 flex-nowrap">
            <div className="flex items-center gap-2 flex-nowrap min-w-0">
              <img
                src={logo}
                alt="Vendor Logo"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full shadow-md shrink-0"
              />
              <h1 className="text-lg md:text-xl font-bold text-green-400 whitespace-nowrap">
                Vendor Panel
              </h1>
            </div>

            {/* ✅ Close button on mobile only */}
            <button
              onClick={closeSidebar}
              className="md:hidden text-white text-xl p-2 -mr-2"
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>

          {/* ✅ Navigation Links */}
          <nav className="text-sm md:text-base">
            <Link to="/vendor" className={linkClass("/vendor")} onClick={closeSidebar}>
              <FaTachometerAlt /> Dashboard
            </Link>

            <Link
              to="/vendor/profile"
              className={linkClass("/vendor/profile")}
              onClick={closeSidebar}
            >
              <FaUser /> Profile
            </Link>

            {/* 🚫 Hide until approved */}
            {vendor?.isApproved && (
              <>
                <Link
                  to="/vendor/add-product"
                  className={linkClass("/vendor/add-product")}
                  onClick={closeSidebar}
                >
                  <FaPlusSquare /> Add Product
                </Link>

                <Link
                  to="/vendor/view-products"
                  className={linkClass("/vendor/view-products")}
                  onClick={closeSidebar}
                >
                  <FaBoxOpen /> View Products
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* ✅ Logout Button (sticky bottom inside sidebar) */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center md:justify-start gap-2 mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </>
  );
}
