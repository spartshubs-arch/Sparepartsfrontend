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
import { useState, useRef, useEffect, useCallback } from "react";
import { useCart } from "../components/CartContext";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCallbackForm, setShowCallbackForm] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const navigate = useNavigate();
  const hideTimeout = useRef(null);
  const { cartItems } = useCart();

  const fetchUnreadCount = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("userToken");
      const userInfo = sessionStorage.getItem("userInfo");

      if (!token || !userInfo) {
        setIsLoggedIn(false);
        setUnreadCount(0);
        return;
      }

      setIsLoggedIn(true);

      const res = await axios.get("/notifications/user/unread-count", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUnreadCount(res.data?.unreadCount || 0);
    } catch (error) {
      console.error("Unread count fetch failed:", error);
      setUnreadCount(0);
    }
  }, []);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  useEffect(() => {
    const handleNotificationUpdate = () => {
      fetchUnreadCount();
    };

    const handleFocus = () => {
      fetchUnreadCount();
    };

    const currentTimeout = hideTimeout.current;

    window.addEventListener(
      "user-notifications-updated",
      handleNotificationUpdate
    );
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener(
        "user-notifications-updated",
        handleNotificationUpdate
      );
      window.removeEventListener("focus", handleFocus);
      clearTimeout(currentTimeout);
    };
  }, [fetchUnreadCount]);

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
      <header className="bg-white shadow-md border-b-4 border-orange-500 fixed top-0 left-0 w-full z-50">
        <div className="w-full px-3 sm:px-4 lg:px-8">
          {/* Desktop Header */}
          <div className="hidden lg:grid grid-cols-[auto_1fr_auto] items-center min-h-[96px] gap-6">
            {/* Left */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center shrink-0">
                <img
                  src={logo}
                  alt="Logo"
                  className="h-24 w-auto cursor-pointer object-contain"
                />
              </Link>

              <button
                onClick={() => setShowCallbackForm(true)}
                className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 whitespace-nowrap text-base font-medium"
              >
                Request a Call Back
              </button>
            </div>

            {/* Center */}
            <nav className="flex items-center justify-center gap-8 text-black font-semibold text-lg">
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
              <Link to="/shop" className="hover:text-orange-500">
                Shop
              </Link>
              <Link to="/about" className="hover:text-orange-500">
                About Us
              </Link>
              <Link to="/blog" className="hover:text-orange-500">
                Blog
              </Link>
              <Link to="/faq" className="hover:text-orange-500">
                FAQ's
              </Link>
              <Link to="/contact" className="hover:text-orange-500">
                Contact Us
              </Link>
            </nav>

            {/* Right */}
            <div className="flex items-center justify-end gap-5">
              <Link to="/cart" title="Cart" className="relative">
                <ShoppingCart className="text-gray-700 hover:text-orange-500" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <Link to="/order" title="My Orders">
                <ClipboardList className="text-gray-700 hover:text-orange-500" />
              </Link>

              <Link to="/helpcenter" title="Help Center">
                <HelpCircle className="text-gray-700 hover:text-orange-500" />
              </Link>

              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="relative text-sm text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded flex items-center gap-1"
                >
                  <User size={16} />
                  Profile

                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => navigate("/loginuser")}
                  className="text-sm text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded flex items-center gap-1"
                >
                  <User size={16} />
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden flex flex-col w-full py-2">
            {/* Top mobile row */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
  <Link to="/" className="flex items-center shrink-0">
    <img
      src={logo}
      alt="Logo"
      className="h-20 sm:h-24 w-auto cursor-pointer object-contain"
    />
  </Link>

  <button
    onClick={() => setShowCallbackForm(true)}
    className="ml-4 sm:ml-6 bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 whitespace-nowrap text-[11px] sm:text-sm font-medium"
  >
    Request a Call Back
  </button>
</div>

              <button
                className="text-gray-700 hover:text-orange-500 p-1"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Bottom mobile icons row */}
            <div className="flex items-center justify-center gap-6 mt-2">
              <Link to="/cart" title="Cart" className="relative">
                <ShoppingCart
                  size={21}
                  className="text-gray-700 hover:text-orange-500"
                />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <Link to="/order" title="My Orders">
                <ClipboardList
                  size={21}
                  className="text-gray-700 hover:text-orange-500"
                />
              </Link>

              <Link to="/helpcenter" title="Help Center">
                <HelpCircle
                  size={21}
                  className="text-gray-700 hover:text-orange-500"
                />
              </Link>

              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="relative text-xs text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded flex items-center gap-1"
                >
                  <User size={15} />
                  Profile

                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => navigate("/loginuser")}
                  className="text-xs text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded flex items-center gap-1"
                >
                  <User size={15} />
                  Login
                </button>
              )}
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
              <nav className="mt-3 bg-white shadow-md rounded p-4 text-black font-semibold">
                <Link
                  to="/"
                  className="block py-2 border-b hover:text-orange-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="block py-2 border-b hover:text-orange-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  to="/about"
                  className="block py-2 border-b hover:text-orange-500"
                  onClick={() => setMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/blog"
                  className="block py-2 border-b hover:text-orange-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  to="/faq"
                  className="block py-2 border-b hover:text-orange-500"
                  onClick={() => setMenuOpen(false)}
                >
                  FAQ's
                </Link>
                <Link
                  to="/contact"
                  className="block py-2 hover:text-orange-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </nav>
            )}
          </div>
        </div>
      </header>

      {showCallbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowCallbackForm(false)}
              aria-label="Close callback form"
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border p-2 rounded"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <input
                type="tel"
                placeholder="Contact Number"
                className="w-full border p-2 rounded"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Reason for Callback"
                className="w-full border p-2 rounded min-h-[100px]"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
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
