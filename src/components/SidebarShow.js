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

  useEffect(() => {
    const token = sessionStorage.getItem('vendorToken');
    if (!token) return;

    axios
      .get('/vendor/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setVendor(res.data);
        sessionStorage.setItem('vendorInfo', JSON.stringify(res.data));
      })
      .catch((err) => console.error('Failed to fetch vendor profile', err));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('vendorToken');
    sessionStorage.removeItem('vendorInfo');
    navigate('/login');
  };

  const linkClass = (path) => {
    const isActive = location.pathname === path;

    return isActive
      ? 'flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500 text-white font-semibold transition'
      : 'flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-green-600 transition';
  };

  return (
    <aside className="w-full md:w-64 bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:sticky md:top-4 h-fit">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <img
          src={logo}
          alt="Vendor Logo"
          className="w-11 h-11 rounded-full shadow-md object-cover shrink-0"
        />
        <div className="min-w-0">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
            Vendor Panel
          </h1>
          <p className="text-xs text-gray-500">Vendor Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <Link to="/vendor" className={linkClass('/vendor')}>
          <FaTachometerAlt className="shrink-0" />
          <span>Dashboard</span>
        </Link>

        <Link to="/vendor/profile" className={linkClass('/vendor/profile')}>
          <FaUser className="shrink-0" />
          <span>Profile</span>
        </Link>

        {vendor?.isApproved && (
          <>
            <Link
              to="/vendor/add-product"
              className={linkClass('/vendor/add-product')}
            >
              <FaPlusSquare className="shrink-0" />
              <span>Add Product</span>
            </Link>

            <Link
              to="/vendor/view-products"
              className={linkClass('/vendor/view-products')}
            >
              <FaBoxOpen className="shrink-0" />
              <span>View Products</span>
            </Link>
          </>
        )}
      </nav>

      {/* Logout */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-medium transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}
