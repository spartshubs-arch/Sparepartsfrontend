import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    users: 0,
    vendors: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/admin/stats", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
          }
        });
        setStats(res.data);
      } catch (err) {
        console.error("❌ Failed to load admin stats", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Total Orders" count={stats.orders} color="bg-purple-600" />
        <StatCard title="Total Users" count={stats.users} color="bg-blue-600" />
        <StatCard title="Total Vendors" count={stats.vendors} color="bg-green-600" />
      </div>
    </div>
  );
}

function StatCard({ title, count, color }) {
  return (
    <div className={`p-6 rounded shadow-md text-white ${color}`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
}
