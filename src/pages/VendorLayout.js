import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/SidebarShow';

const VendorLayout = () => {
  const isVendor = sessionStorage.getItem("vendorInfo");

  if (!isVendor) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default VendorLayout;
