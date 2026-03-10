import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/SidebarShow';

const VendorLayout = () => {
  const isVendor = sessionStorage.getItem('vendorInfo');

  if (!isVendor) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-3 sm:p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-64 md:flex-shrink-0">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 p-4 sm:p-6 bg-white rounded-2xl shadow-sm">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;
