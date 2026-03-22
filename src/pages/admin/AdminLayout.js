import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

const AdminLayout = () => {
  const token = sessionStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="p-6 md:ml-64">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;
