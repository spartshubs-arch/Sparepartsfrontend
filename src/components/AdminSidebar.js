import React, { useEffect, useState } from 'react';
import axios from "../api/axios";
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt, FaUsers, FaBoxOpen, FaStore, FaSignOutAlt,
  FaImages, FaPhotoVideo, FaPlusSquare, FaCar, FaHeadset,
  FaSignInAlt, FaPhoneAlt, FaCommentDots, FaInfoCircle, FaQuestionCircle,
  FaBars, FaTimes
} from 'react-icons/fa';
import logo from "../logo/sparepartslogo.jpg";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const [hasNewOrders, setHasNewOrders] = useState(false);
  const [prevOrderCount, setPrevOrderCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleOrdersClick = () => {
    setHasNewOrders(false);
    setIsOpen(false);
  };

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
        console.error(err);
      }
    };

    checkOrders();
    const interval = setInterval(checkOrders, 30000);
    return () => clearInterval(interval);
  }, [prevOrderCount]);

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4 sticky top-0 z-50">
        <span className="font-bold">Admin Panel</span>
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={20} />
        </button>
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:fixed
          top-0 left-0
          w-full md:w-64
          h-full
          bg-gradient-to-b from-gray-700 to-gray-800
          text-white p-6 z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-y-0" : "-translate-y-full"}
          md:translate-y-0
        `}
      >
        {/* CLOSE BUTTON (MOBILE) */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-6">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold text-green-400">Admin Panel</span>
        </div>

        {/* NAV */}
        <nav className="space-y-4 max-h-[70vh] overflow-y-auto">

          <NavLink to="/admin/dashboard" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink to="/admin/vendors" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaStore /> Vendors
          </NavLink>

          <NavLink to="/admin/view-products" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaBoxOpen /> Products
          </NavLink>

          <NavLink to="/admin/users" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaUsers /> Users
          </NavLink>

          <NavLink to="/admin/sliders" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaImages /> Featured
          </NavLink>

          <NavLink to="/admin/category-banners" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaPhotoVideo /> Banners
          </NavLink>

          <NavLink to="/admin/add-category" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaPlusSquare /> Add Category
          </NavLink>

          <NavLink to="/admin/view-car-details" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaCar /> Car Details
          </NavLink>

          <NavLink to="/admin/orders" onClick={handleOrdersClick} className="flex gap-2 items-center relative">
            <FaStore /> Orders
            {hasNewOrders && (
              <span className="absolute left-20 top-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </NavLink>

          <NavLink to="/admin/callbackrequest" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaHeadset /> Callback
          </NavLink>

          <NavLink to="/admin/blogpage" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaSignInAlt /> Blog
          </NavLink>

          <NavLink to="/admin/contact" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaPhoneAlt /> Contact
          </NavLink>

          <NavLink to="/admin/messages" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaCommentDots /> Messages
          </NavLink>

          <NavLink to="/admin/about-us" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaInfoCircle /> About
          </NavLink>

          <NavLink to="/admin/faq" onClick={()=>setIsOpen(false)} className="flex gap-2 items-center">
            <FaQuestionCircle /> FAQ
          </NavLink>

        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 w-full py-2 px-4 rounded mt-6"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </>
  );
};

export default AdminSidebar;
