
import { toast } from "react-toastify";
import axios from "../api/axios"; 
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  HelpCircle,
  ClipboardList,
  User,
  Menu,
  X,
} from "lucide-react";
import logo from "../logo/sparepartslogo.jpg";
import { useState, useRef, useEffect } from "react";
import { useCart } from "../components/CartContext";

export default function Header() {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [showCallbackForm, setShowCallbackForm] = useState(false); // popup state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: ""
  });

  const hideTimeout = useRef(null);
  const { cartItems } = useCart();

  useEffect(() => {
    const userInfo = sessionStorage.getItem("userInfo");
    setIsLoggedIn(!!userInfo);
  }, []);

 

  const handleMouseEnter = () => {
    clearTimeout(hideTimeout.current);
    setShowLoginDropdown(true);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setShowLoginDropdown(false);
    }, 300);
  };
const handleFormSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("/callback-request", formData); 
    toast.success("Request submitted successfully! Will Contact Soon");
    setShowCallbackForm(false);
    setFormData({ name: "", email: "", phone: "", reason: "" });
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.error || "Error submitting request.");
  }
};

  return (
    <>
<header className="bg-white shadow-md py-0.9 px-4 border-b-4 border-orange-500 relative">
      {/* <header className="fixed top-0 left-0 w-full bg-white shadow-md px-6 border-b-4 border-orange-500 z-50"> */}

  <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
    
    {/* Left Section: Logo + Call Back */}
<div className="flex flex-row items-center gap-0 w-33 mr-20  lg:w-auto">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img 
          src={logo} 
          alt="Logo" 
className="h-24 md:h-28 lg:h-32 w-auto mr-20 cursor-pointer"/>
      </Link>

     {/* Request a Call Back (opens modal) */}
<button
  onClick={() => setShowCallbackForm(true)}
  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full lg:w-auto text-center"
>
  Request a Call Back
</button>

    </div>

    {/* Desktop Nav */}
    <nav className="hidden lg:flex gap-6 text-black font-semibold ml-5">
      <Link to="/" className="hover:text-orange-500">Home</Link>
      <Link to="/shop" className="hover:text-orange-500">Shop</Link>
      <Link to="/about" className="hover:text-orange-500">About Us</Link>
      <Link to="/blog" className="hover:text-orange-500">Blog</Link>
      <Link to="/faq" className="hover:text-orange-500">FAQ's</Link>
      <Link to="/contact" className="hover:text-orange-500">Contact Us</Link>
    </nav>

    {/* Right Section → Icons + Login + Menu */}
<div className="flex items-center gap-4 ml-auto relative bottom-2 md:bottom-0">
      {/* Cart */}
      <Link to="/cart" title="Cart" className="relative">
        <ShoppingCart className="text-gray-700 hover:text-orange-500" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </Link>

      {/* Orders */}
      <Link to="/order" title="My Orders">
        <ClipboardList className="text-gray-700 hover:text-orange-500" />
      </Link>

      {/* Help */}
      <Link to="/helpcenter" title="Help Center">
        <HelpCircle className="text-gray-700 hover:text-orange-500" />
      </Link>

      {/* Login / Logout */}
      {isLoggedIn ? (
       
  <Link
    to="/profile"
    className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded flex items-center gap-1"
  >
    <User size={16} />
    Profile
  </Link>
      ) : (
       <div
  className="relative"
  onMouseEnter={handleMouseEnter}   
  onMouseLeave={handleMouseLeave}  
>
  <button
    onClick={() => setShowLoginDropdown((prev) => !prev)} 
    className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded flex items-center gap-1"
  >
    <User size={16} />
    Login
  </button>


          {showLoginDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10 text-sm">
              <Link
                to="/loginuser"
                className="block px-4 py-2 hover:bg-orange-100 text-black"
              >
                Buyer Login
              </Link>
              <Link
                to="/vendor/login"
                className="block px-4 py-2 hover:bg-orange-100 text-black"
              >
                Seller Login
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Mobile menu button */}
<div className="lg:hidden ml-20">
  <button
    className="text-gray-700 hover:text-orange-500"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    {menuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
</div>

    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="lg:hidden mt-3 bg-white shadow-md rounded p-4">
      <Link to="/" className="block py-2 border-b hover:text-orange-500" onClick={() => setMenuOpen(false)}>Home</Link>
      <Link to="/shop" className="block py-2 border-b hover:text-orange-500" onClick={() => setMenuOpen(false)}>Shop</Link>
      <Link to="/about" className="block py-2 border-b hover:text-orange-500" onClick={() => setMenuOpen(false)}>About Us</Link>
      <Link to="/blog" className="block py-2 border-b hover:text-orange-500" onClick={() => setMenuOpen(false)}>Blog</Link>
      <Link to="/faq" className="block py-2 border-b hover:text-orange-500" onClick={() => setMenuOpen(false)}>FAQ's</Link>
      <Link to="/contact" className="block py-2 hover:text-orange-500" onClick={() => setMenuOpen(false)}>Contact Us</Link>
    </div>
  )}
</header>


      {/* Callback Form Modal */}
      {showCallbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowCallbackForm(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">Request a Call Back</h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border p-2 rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border p-2 rounded"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="tel"
                placeholder="Contact Number"
                className="w-full border p-2 rounded"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <textarea
                placeholder="Reason for Callback"
                className="w-full border p-2 rounded"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
