import { toast } from "react-toastify";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

import {
  ShoppingCart,
  HelpCircle,
  ClipboardList,
  User,
  Menu,
  X,
} from "lucide-react";

import logo from "../logo/sparepartslogo.jpg";
import { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCallbackForm, setShowCallbackForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const navigate = useNavigate();
  const { cartItems } = useCart();

  useEffect(() => {
    const userInfo = sessionStorage.getItem("userInfo");
    setIsLoggedIn(!!userInfo);
  }, []);

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
      <header className="bg-white shadow-md px-4 border-b-4 border-orange-500 fixed top-0 left-0 w-full z-50">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-auto cursor-pointer"
              />
            </Link>

            <button
              onClick={() => setShowCallbackForm(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Request a Call Back
            </button>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-6 text-black font-semibold">
            <Link to="/" className="hover:text-orange-500">Home</Link>
            <Link to="/shop" className="hover:text-orange-500">Shop</Link>
            <Link to="/about" className="hover:text-orange-500">About Us</Link>
            <Link to="/blog" className="hover:text-orange-500">Blog</Link>
            <Link to="/faq" className="hover:text-orange-500">FAQ's</Link>
            <Link to="/contact" className="hover:text-orange-500">Contact Us</Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="hover:text-orange-500" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Orders */}
            <Link to="/order">
              <ClipboardList className="hover:text-orange-500" />
            </Link>

            {/* Help */}
            <Link to="/helpcenter">
              <HelpCircle className="hover:text-orange-500" />
            </Link>

            {/* Login/Profile */}
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="text-white bg-orange-500 px-3 py-1 rounded flex items-center gap-1"
              >
                <User size={16} />
                Profile
              </Link>
            ) : (
              <button
                onClick={() => navigate("/loginuser")}
                className="text-white bg-orange-500 px-3 py-1 rounded flex items-center gap-1"
              >
                <User size={16} />
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-3 bg-white shadow-md rounded p-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2">Home</Link>
            <Link to="/shop" onClick={() => setMenuOpen(false)} className="block py-2">Shop</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="block py-2">About</Link>
            <Link to="/blog" onClick={() => setMenuOpen(false)} className="block py-2">Blog</Link>
            <Link to="/faq" onClick={() => setMenuOpen(false)} className="block py-2">FAQ</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="block py-2">Contact</Link>
          </div>
        )}
      </header>

      {/* Callback Modal */}
      {showCallbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md relative">
            
            <button
              onClick={() => setShowCallbackForm(false)}
              className="absolute top-2 right-2"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">Request a Call Back</h2>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <input
                type="tel"
                placeholder="Phone"
                className="w-full border p-2"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Reason"
                className="w-full border p-2"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                required
              />

              <button className="bg-orange-500 text-white w-full py-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
