// import { useEffect, useState } from "react";
// import axios from "../api/axios";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     approved: 0,
//     sold: 0,
//   });

//   const vendor = JSON.parse(sessionStorage.getItem("vendorInfo"));

//   useEffect(() => {
//     if (!vendor?.id) return;

//     axios
//       .get(`/products/all?vendorId=${vendor.id}`)
//       .then((res) => {
//         const all = res.data;
//         const pending = all.filter((p) => p.status === "pending").length;
//         const approved = all.filter((p) => p.status === "approved").length;
//         const sold = all.filter((p) => p.status === "sold").length;

//         setStats({
//           total: all.length,
//           pending,
//           approved,
//           sold,
//         });
//       })
//       .catch((err) => {
//         console.error("❌ Error fetching dashboard stats", err);
//       });
//   }, [vendor?.id]);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Vendor Dashboard</h2>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//         <StatBox label="Total Products" value={stats.total} color="bg-blue-600" />
//         <StatBox label="Pending" value={stats.pending} color="bg-yellow-500" />
//         <StatBox label="Approved" value={stats.approved} color="bg-green-600" />
//         <StatBox label="Sold" value={stats.sold} color="bg-red-600" />
//       </div>

//       <div className="bg-gray-100 p-4 rounded text-sm">
//         <p>
//           <strong>Vendor ID:</strong>{" "}
//           <span className="text-blue-700">{vendor?.idNumber}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// function StatBox({ label, value, color }) {
//   return (
//     <div
//       className={`p-4 rounded shadow text-white ${color} flex flex-col items-center justify-center`}
//     >
//       <p className="text-xl font-semibold">{value}</p>
//       <p className="text-sm mt-1">{label}</p>
//     </div>
//   );
// }

// src/pages/Dashboard.js
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    sold: 0,
  });
  const [profile, setProfile] = useState(null);

  // ✅ Grab vendor + token from session
  const vendor = JSON.parse(sessionStorage.getItem("vendorInfo"));
  const token = sessionStorage.getItem("vendorToken");

  // ✅ Normalize vendorId (backend sometimes returns `_id`, sometimes `id`)
  const vendorId = vendor?._id || vendor?.id;

  // 🔹 Fetch product stats
  useEffect(() => {
    if (!vendorId) return;

    axios
      .get(`/products/all?vendorId=${vendorId}`)
      .then((res) => {
        const all = res.data;
        const pending = all.filter((p) => p.status === "pending").length;
        const approved = all.filter((p) => p.status === "approved").length;
        const sold = all.filter((p) => p.status === "sold").length;

        setStats({
          total: all.length,
          pending,
          approved,
          sold,
        });
      })
      .catch((err) => {
        console.error("❌ Error fetching dashboard stats", err);
      });
  }, [vendorId]);

  // 🔹 Fetch vendor profile (fresh data from backend)
  useEffect(() => {
    if (!token) return;

    axios
      .get("/vendor/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        sessionStorage.setItem("vendorInfo", JSON.stringify(res.data)); // keep updated
      })
      .catch((err) => console.error("❌ Error fetching vendor profile", err));
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Vendor Dashboard</h2>

      {/* ✅ Product Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatBox label="Total Products" value={stats.total} color="bg-blue-600" />
        <StatBox label="Pending" value={stats.pending} color="bg-yellow-500" />
        <StatBox label="Approved" value={stats.approved} color="bg-green-600" />
        <StatBox label="Sold" value={stats.sold} color="bg-red-600" />
      </div>

      {/* ✅ Vendor Profile Info */}
      {profile && (
        <div className="bg-gray-100 p-4 rounded text-sm flex gap-6">
          <div>
            <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
            <p><strong>Trade Name:</strong> {profile.tradeName}</p>
            <p><strong>License Number:</strong> {profile.licenseNumber}</p>
            <p><strong>TRN Number:</strong> {profile.trnNumber}</p>
            <p><strong>Business Type:</strong> {profile.businessType}</p>
            <p><strong>Vendor ID:</strong> {profile.idNumber}</p>
            <p><strong>Contact:</strong> {profile.contact}</p>
            <p><strong>Address:</strong> {profile.address}, {profile.city}, {profile.area}</p>
            <p>
              <strong>Status:</strong>{" "}
              {profile.isApproved ? (
                <span className="text-green-600 font-semibold">Approved</span>
              ) : (
                <span className="text-yellow-600 font-semibold">Pending Approval</span>
              )}
            </p>
          </div>

          {/* ✅ Images */}
          <div className="flex flex-col gap-2">
            {profile.idCardImage && (
              <img src={profile.idCardImage} alt="Vendor ID" className="w-40 rounded shadow" />
            )}
            {profile.licenseImage && (
              <img src={profile.licenseImage} alt="License" className="w-40 rounded shadow" />
            )}
            {profile.passportImage && (
              <img src={profile.passportImage} alt="Passport" className="w-40 rounded shadow" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, color }) {
  return (
    <div
      className={`p-4 rounded shadow text-white ${color} flex flex-col items-center justify-center`}
    >
      <p className="text-xl font-semibold">{value}</p>
      <p className="text-sm mt-1">{label}</p>
    </div>
  );
}
