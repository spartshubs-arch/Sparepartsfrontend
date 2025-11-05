// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FaTachometerAlt, FaUsers, FaBoxOpen, FaStore, FaSignOutAlt ,FaImages,  FaPhotoVideo, FaPlusSquare, FaCar } from 'react-icons/fa';

// const AdminSidebar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     sessionStorage.removeItem("adminToken");
//     navigate("/admin/login");
//   };

//   return (
//     <div className="bg-gray-900 text-white w-64 h-screen p-6 flex flex-col justify-between">
//       <div>
//         <h1 className="text-2xl font-bold text-green-400 mb-6">🚀 Admin Panel</h1>
//         <nav className="space-y-4">
//           <NavLink to="/admin/dashboard" className={({ isActive }) =>
//             isActive ? "text-white font-semibold flex items-center gap-2" : "text-gray-400 hover:text-white flex items-center gap-2"}>
//             <FaTachometerAlt /> Dashboard
//           </NavLink>

//           <NavLink to="/admin/vendors" className="flex items-center gap-2 text-gray-400 hover:text-white">
//             <FaStore /> Vendors
//           </NavLink>

//           <NavLink to="/admin/view-products" className="flex items-center gap-2 text-gray-400 hover:text-white">
//             <FaBoxOpen /> Added Products
//           </NavLink>

//           <NavLink to="/admin/users" className="flex items-center gap-2 text-gray-400 hover:text-white">
//             <FaUsers /> Users
//           </NavLink>
//           <NavLink to="/admin/sliders" className="flex items-center gap-2 text-gray-400 hover:text-white">
//   <FaImages /> ADD Slider Banner
// </NavLink>
// <NavLink to="/admin/category-banners" className="flex items-center gap-2 text-gray-400 hover:text-white">
//   <FaPhotoVideo/> Category Banners
// </NavLink>

// <NavLink to="/admin/add-category" className="flex items-center gap-2 text-gray-400 hover:text-white">
//     <FaPlusSquare/> ADD CarDetails Category
// </NavLink>
   
//    <NavLink to="/admin/view-car-details" className="flex items-center gap-2 text-gray-400 hover:text-white">
//     <FaCar/>  View CarDetails
// </NavLink>

//         </nav>
//       </div>

//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
//       >
//         <FaSignOutAlt /> Logout
//       </button>
//     </div>
//   );
// };

// export default AdminSidebar;





import React, { useEffect, useState } from 'react';
import axios from "../api/axios";
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt, FaUsers, FaBoxOpen, FaStore, FaSignOutAlt,
  FaImages, FaPhotoVideo, FaPlusSquare, FaCar , FaHeadset, FaSignInAlt, FaPhoneAlt, FaCommentDots, FaInfoCircle, FaQuestionCircle
  
} from 'react-icons/fa';
import logo from "../logo/sparepartslogo.jpg"

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [hasNewOrders, setHasNewOrders] = useState(false);
  const [prevOrderCount, setPrevOrderCount] = useState(0);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleOrdersClick = () => {
  setHasNewOrders(false);
};

  // Poll for new orders
  useEffect(() => {
    const checkOrders = async () => {
      try {
        const res = await axios.get("/orders");
        const orderCount = res.data.length;

        if (orderCount > prevOrderCount) {
          setHasNewOrders(true);
        }
        setPrevOrderCount(orderCount);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    checkOrders(); // run immediately
    const interval = setInterval(checkOrders, 30000); // every 30 sec
    return () => clearInterval(interval);
  }, [prevOrderCount]);



  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-800 text-white  w-64 sm:w-64  min-h-screen p-6 shadow-lg flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="flex items-center gap-3 mb-6">
        <img src={logo} alt="Admin Logo" className="w-10 h-10 rounded-full shadow-lg" />
          <span className="text-xl font-bold text-green-400">Admin Panel</span>
        </div>

        <nav className="space-y-4">
          <NavLink to="/admin/dashboard" className={({ isActive }) =>
            isActive ? "text-white font-semibold flex items-center gap-2" : "text-gray-400 hover:text-white flex items-center gap-2"}>
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink to="/admin/vendors" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaStore /> Vendors
          </NavLink>

          <NavLink to="/admin/view-products" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaBoxOpen /> Added Products
          </NavLink>

          <NavLink to="/admin/users" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaUsers /> Users
          </NavLink>

          <NavLink to="/admin/sliders" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaImages /> Home Featured Products
          </NavLink>

          <NavLink to="/admin/category-banners" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaPhotoVideo /> Home Top Banner
          </NavLink>

          <NavLink to="/admin/add-category" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaPlusSquare /> Add CarDetails Category
          </NavLink>

          <NavLink to="/admin/view-car-details" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaCar /> View CarDetails
          </NavLink>

              {/* Orders Link with Red Dot */}
         <NavLink
  to="/admin/orders"
  onClick={handleOrdersClick}
  className="flex items-center gap-2 text-gray-400 hover:text-white relative"
>
  <FaStore /> Orders
  {hasNewOrders && (
    <span className="absolute left-16 top-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
  )}
</NavLink>


           <NavLink to="/admin/callbackrequest" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaHeadset/> CallbackRequests
          </NavLink>

           <NavLink to="/admin/blogpage" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaSignInAlt/> Blog page
          </NavLink>

           <NavLink to="/admin/contact" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaPhoneAlt/> Contact-us page
          </NavLink>
            
           <NavLink to="/admin/messages" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaCommentDots/> User Messages From ContactUs
          </NavLink>
          <NavLink to="/admin/about-us" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaInfoCircle/>About Page 
          </NavLink>

          <NavLink to="/admin/faq" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaQuestionCircle/>FAQ's
          </NavLink>

          <NavLink to="/admin/footer" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaInfoCircle/>Footer
          </NavLink>

          <NavLink to="/admin/helpcenter" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <FaInfoCircle/>HelpCenter
          </NavLink>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-6"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
