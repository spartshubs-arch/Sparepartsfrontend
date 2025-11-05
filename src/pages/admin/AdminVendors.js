// import { useEffect, useState } from 'react';
// import axios from '../../api/axios';

// export default function AdminVendors() {
//   const [vendors, setVendors] = useState([]);

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const res = await axios.get('/admin/vendors', {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//         }
//       });
//       setVendors(res.data);
//     } catch (err) {
//       console.error('Failed to load vendors', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this vendor?")) return;
//     try {
//       await axios.delete(`/admin/vendor/${id}`, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//         }
//       });
//       setVendors(vendors.filter(v => v._id !== id));
//     } catch (err) {
//       console.error('Failed to delete vendor', err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Registered Vendors</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-gray-200 text-gray-700">
//             <tr>
//               <th className="py-2 px-4">ID Number</th>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Contact</th>
//               <th className="py-2 px-4">Address</th>
//               <th className="py-2 px-4">City</th>
//               <th className="py-2 px-4">Area</th>
//               <th className="py-2 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {vendors.map(vendor => (
//               <tr key={vendor._id} className="border-t">
//                 <td className="py-2 px-4">{vendor.idNumber}</td>
//                 <td className="py-2 px-4">{vendor.firstName} {vendor.lastName}</td>
//                 <td className="py-2 px-4">{vendor.contact}</td>
//                 <td className="py-2 px-4">{vendor.address}</td>
//                 <td className="py-2 px-4">{vendor.city}</td>
//                 <td className="py-2 px-4">{vendor.area}</td>
//                 <td className="py-2 px-4">
//                   <button
//                     onClick={() => handleDelete(vendor._id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {vendors.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="py-4 text-center text-gray-500">No vendors found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }






// import { useEffect, useState } from 'react';
// import axios from '../../api/axios';

// export default function AdminVendors() {
//   const [vendors, setVendors] = useState([]);
//   const [search, setSearch] = useState('');

//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const fetchVendors = async () => {
//     try {
//       const res = await axios.get('/admin/vendors', {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//         }
//       });
//       setVendors(res.data);
//     } catch (err) {
//       console.error('Failed to load vendors', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this vendor?")) return;
//     try {
//       await axios.delete(`/admin/vendor/${id}`, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//         }
//       });
//       setVendors(vendors.filter(v => v._id !== id));
//     } catch (err) {
//       console.error('Failed to delete vendor', err);
//     }
//   };

//   // Filter vendors by ID or Name
//   const filtered = vendors.filter(v => {

//   const fullName = `${v.firstName} ${v.lastName}`.toLowerCase();
//   const query = search.toLowerCase();
//   return(
//     v.idNumber.includes(search) ||
//     v.firstName.toLowerCase().includes(search.toLowerCase()) ||
//     v.lastName.toLowerCase().includes(search.toLowerCase())  ||
//      fullName.includes(query)
//   );
// });

// // to aprove vendor here Ab

// const handleApprove = async (id) => {
//   if (!window.confirm("Approve this vendor?")) return;
//   try {
//     await axios.put(`/admin/vendor/approve/${id}`, {}, {
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//       }
//     });
//     fetchVendors();
//   } catch (err) {
//     console.error('Failed to approve vendor', err);
//   }
// };



//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Registered Vendors</h2>

//       {/* 🔍 Search Box */}
//       <input
//         type="text"
//         placeholder="Search by ID or Name"
//         className="mb-4 px-4 py-2 border rounded w-full max-w-md"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-gray-200 text-gray-700">
//             <tr>
//               <th className="py-2 px-4">ID Number</th>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Contact</th>
//               <th className="py-2 px-4">Address</th>
//               <th className="py-2 px-4">City</th>
//               <th className="py-2 px-4">Area</th>
//               <th className="py-2 px-4">ID Image</th>
//               <th className="py-2 px-4">Actions</th>
//             </tr>
//           </thead>
//  <tbody>
//   {filtered.map(vendor => (
//     <tr key={vendor._id} className="border-t">
//       <td className="py-2 px-4">{vendor.idNumber}</td>
//       <td className="py-2 px-4">{vendor.firstName} {vendor.lastName}</td>
//       <td className="py-2 px-4">{vendor.contact}</td>
//       <td className="py-2 px-4">{vendor.address}</td>
//       <td className="py-2 px-4">{vendor.city}</td>
//       <td className="py-2 px-4">{vendor.area}</td>
//     <td className="py-2 px-4">
//   <img
//     src={vendor.idCardImage}
//     alt="ID"
//     className="w-20 h-auto rounded cursor-pointer"
//     onClick={() => setSelectedImage(vendor.idCardImage)}
//   />
// </td>


//       <td className="py-2 px-4 space-x-2 flex items-center">
//         {/* ✅ Approval Button */}
//         {vendor.isApproved ? (
//           <span className="text-green-600 font-semibold">Approved</span>
//         ) : (
//           <button
//             onClick={() => handleApprove(vendor._id)}
//             className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//           >
//             Approve
//           </button>
//         )}

//         {/* 🗑 Delete Button */}
//         <button
//           onClick={() => handleDelete(vendor._id)}
//           className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   ))}
//   {filtered.length === 0 && (
//     <tr>
//       <td colSpan="7" className="py-4 text-center text-gray-500">No vendors match your search.</td>
//     </tr>
//   )}
// </tbody>

//         </table>
//       </div>


//       {selectedImage && (
//   <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//     <div className="bg-white p-4 rounded shadow-lg relative">
//       <button
//         className="absolute top-2 right-2 text-gray-700 text-lg"
//         onClick={() => setSelectedImage(null)}
//       >
//         ✖
//       </button>
//       <img
//         src={selectedImage}
//         alt="Full ID"
//         className="max-w-[90vw] max-h-[90vh] object-contain"
//       />
//     </div>
//   </div>
// )}

//     </div>
//   );
// }





// import { useEffect, useState } from 'react';
// import axios from '../../api/axios';
// import { useNavigate } from "react-router-dom";

// export default function AdminVendors() {
//   const [vendors, setVendors] = useState([]);
//   const [search, setSearch] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedVendor, setSelectedVendor] = useState(null); // ✅ For profile modal

//   useEffect(() => {
//     fetchVendors();
//   }, []);
// const navigate = useNavigate();
//   const fetchVendors = async () => {
//     try {
//       const res = await axios.get('/admin/vendors', {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//         }
//       });
//       setVendors(res.data);
//     } catch (err) {
//       console.error('Failed to load vendors', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this vendor?")) return;
//     try {
//       await axios.delete(`/admin/vendor/${id}`, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//         }
//       });
//       setVendors(vendors.filter(v => v._id !== id));
//     } catch (err) {
//       console.error('Failed to delete vendor', err);
//     }
//   };

//   const handleApprove = async (id) => {
//     if (!window.confirm("Approve this vendor?")) return;
//     try {
//       await axios.put(`/admin/vendor/approve/${id}`, {}, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//         }
//       });
//       fetchVendors();
//     } catch (err) {
//       console.error('Failed to approve vendor', err);
//     }
//   };

//   // Filter vendors
//   const filtered = vendors.filter(v => {
//     const fullName = `${v.firstName} ${v.lastName}`.toLowerCase();
//     const query = search.toLowerCase();
//     return (
//       v.idNumber.includes(search) ||
//       v.firstName.toLowerCase().includes(query) ||
//       v.lastName.toLowerCase().includes(query) ||
//       fullName.includes(query)
//     );
//   });

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Registered Vendors</h2>

//       {/* 🔍 Search Box */}
//       <input
//         type="text"
//         placeholder="Search by ID or Name"
//         className="mb-4 px-4 py-2 border rounded w-full max-w-md"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-gray-200 text-gray-700">
//             <tr>
//               <th className="py-2 px-4">ID Number</th>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Contact</th>
//               <th className="py-2 px-4">City</th>
//               <th className="py-2 px-4">Area</th>
//               <th className="py-2 px-4">ID Image</th>
//               <th className="py-2 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map(vendor => (
//               <tr key={vendor._id} className="border-t">
//                 <td className="py-2 px-4">{vendor.idNumber}</td>
//                 <td className="py-2 px-4">{vendor.firstName} {vendor.lastName}</td>
//                 <td className="py-2 px-4">{vendor.contact}</td>
//                 <td className="py-2 px-4">{vendor.city}</td>
//                 <td className="py-2 px-4">{vendor.area}</td>
//                 <td className="py-2 px-4">
//                   <img
//                     src={vendor.idCardImage}
//                     alt="ID"
//                     className="w-20 h-auto rounded cursor-pointer"
//                     onClick={() => setSelectedImage(vendor.idCardImage)}
//                   />
//                 </td>
//                 <td className="py-2 px-4 space-x-2 flex items-center">
//                   {/* 👀 View Profile Button */}
//                 <button
//   onClick={() => navigate(`/admin/vendors/${vendor._id}`)}
//   className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
// >
//   View Profile
// </button>

//                   {/* ✅ Approval Button */}
//                   {vendor.isApproved ? (
//                     <span className="text-green-600 font-semibold">Approved</span>
//                   ) : (
//                     <button
//                       onClick={() => handleApprove(vendor._id)}
//                       className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//                     >
//                       Approve
//                     </button>
//                   )}

//                   {/* 🗑 Delete Button */}
//                   <button
//                     onClick={() => handleDelete(vendor._id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filtered.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="py-4 text-center text-gray-500">No vendors match your search.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🖼 Full Image Preview (always on top of everything) */}
// {selectedImage && (
//   <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-60">
//     <div className="bg-white p-4 rounded shadow-lg relative">
//       <button
//         className="absolute top-2 right-2 text-gray-700 text-lg"
//         onClick={() => setSelectedImage(null)}
//       >
//         ✖
//       </button>
//       <img
//         src={selectedImage}
//         alt="Full Preview"
//         className="max-w-[90vw] max-h-[90vh] object-contain"
//       />
//     </div>
//   </div>
// )}

// {/* 👤 Vendor Profile Modal */}
// {selectedVendor && (
//   <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//     <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
//       <button
//         className="absolute top-2 right-2 text-gray-700 text-lg"
//         onClick={() => setSelectedVendor(null)}
//       >
//         ✖
//       </button>
//       <h3 className="text-xl font-bold mb-4">Vendor Profile</h3>
//       <p><strong>Name:</strong> {selectedVendor.firstName} {selectedVendor.lastName}</p>
//       <p><strong>Trade Name:</strong> {selectedVendor.tradeName}</p>
//       <p><strong>License Number:</strong> {selectedVendor.licenseNumber}</p>
//       <p><strong>TRN Number:</strong> {selectedVendor.trnNumber}</p>
//       <p><strong>Business Type:</strong> {selectedVendor.businessType}</p>
//       <p><strong>Vendor ID:</strong> {selectedVendor.idNumber}</p>
//       <p><strong>Contact:</strong> {selectedVendor.contact}</p>
//       <p><strong>Address:</strong> {selectedVendor.address}, {selectedVendor.city}, {selectedVendor.area}</p>

//       <div className="flex gap-4 mt-4">
//         {selectedVendor.idCardImage && (
//           <img
//             src={selectedVendor.idCardImage}
//             alt="ID"
//             className="w-32 rounded shadow cursor-pointer"
//             onClick={() => setSelectedImage(selectedVendor.idCardImage)}
//           />
//         )}
//         {selectedVendor.licenseImage && (
//           <img
//             src={selectedVendor.licenseImage}
//             alt="License"
//             className="w-32 rounded shadow cursor-pointer"
//             onClick={() => setSelectedImage(selectedVendor.licenseImage)}
//           />
//         )}
//         {selectedVendor.passportImage && (
//           <img
//             src={selectedVendor.passportImage}
//             alt="Passport"
//             className="w-32 rounded shadow cursor-pointer"
//             onClick={() => setSelectedImage(selectedVendor.passportImage)}
//           />
//         )}
//       </div>
//     </div>
//   </div>


//       )}
//     </div>
//   );
// }




// import { useEffect, useState } from 'react';
// import axios from '../../api/axios';
// import { useNavigate } from "react-router-dom";

// export default function AdminVendors() {
//   const [vendors, setVendors] = useState([]);
//   const [search, setSearch] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedVendor, setSelectedVendor] = useState(null);

//   useEffect(() => {
//     fetchVendors();
//   }, []);

//   const navigate = useNavigate();

//   const fetchVendors = async () => {
//     try {
//       const res = await axios.get('/admin/vendors', {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//         }
//       });
//       setVendors(res.data);
//     } catch (err) {
//       console.error('Failed to load vendors', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this vendor?")) return;
//     try {
//       await axios.delete(`/admin/vendor/${id}`, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//         }
//       });
//       setVendors(vendors.filter(v => v._id !== id));
//     } catch (err) {
//       console.error('Failed to delete vendor', err);
//     }
//   };

//   const handleApprove = async (id) => {
//     if (!window.confirm("Approve this vendor?")) return;
//     try {
//       await axios.put(`/admin/vendor/approve/${id}`, {}, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
//         }
//       });
//       fetchVendors();
//     } catch (err) {
//       console.error('Failed to approve vendor', err);
//     }
//   };

//   const filtered = vendors.filter(v => {
//     const fullName = `${v.firstName} ${v.lastName}`.toLowerCase();
//     const query = search.toLowerCase();
//     return (
//       v.idNumber.includes(search) ||
//       v.firstName.toLowerCase().includes(query) ||
//       v.lastName.toLowerCase().includes(query) ||
//       fullName.includes(query)
//     );
//   });

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Registered Vendors</h2>

//       {/* 🔍 Search Box */}
//       <input
//         type="text"
//         placeholder="Search by ID or Name"
//         className="mb-4 px-4 py-2 border rounded w-full max-w-md"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded shadow">
//           <thead className="bg-gray-200 text-gray-700">
//             <tr>
//               <th className="py-2 px-4">ID Number</th>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Contact</th>
//               <th className="py-2 px-4">City</th>
//               <th className="py-2 px-4">Area</th>
//               <th className="py-2 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map(vendor => (
//               <tr key={vendor._id} className="border-t">
//                 <td className="py-2 px-4">{vendor.idNumber}</td>
//                 <td className="py-2 px-4">{vendor.firstName} {vendor.lastName}</td>
//                 <td className="py-2 px-4">{vendor.contact}</td>
//                 <td className="py-2 px-4">{vendor.city}</td>
//                 <td className="py-2 px-4">{vendor.area}</td>
//                 <td className="py-2 px-4 space-x-2 flex items-center">
//                   {/* 👀 View Profile Button */}
//                   <button
//                     onClick={() => navigate(`/admin/vendors/${vendor._id}`)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//                   >
//                     View Profile
//                   </button>

//                   {/* ✅ Approval Button */}
//                   {vendor.isApproved ? (
//                     <span className="text-green-600 font-semibold">Approved</span>
//                   ) : (
//                     <button
//                       onClick={() => handleApprove(vendor._id)}
//                       className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//                     >
//                       Approve
//                     </button>
//                   )}

//                   {/* 🗑 Delete Button */}
//                   <button
//                     onClick={() => handleDelete(vendor._id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {filtered.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="py-4 text-center text-gray-500">
//                   No vendors match your search.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🖼 Full Image Preview */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-60">
//           <div className="bg-white p-4 rounded shadow-lg relative">
//             <button
//               className="absolute top-2 right-2 text-gray-700 text-lg"
//               onClick={() => setSelectedImage(null)}
//             >
//               ✖
//             </button>
//             <img
//               src={selectedImage}
//               alt="Full Preview"
//               className="max-w-[90vw] max-h-[90vh] object-contain"
//             />
//           </div>
//         </div>
//       )}

//       {/* 👤 Vendor Profile Modal (kept, but no ID image) */}
//       {selectedVendor && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
//             <button
//               className="absolute top-2 right-2 text-gray-700 text-lg"
//               onClick={() => setSelectedVendor(null)}
//             >
//               ✖
//             </button>
//             <h3 className="text-xl font-bold mb-4">Vendor Profile</h3>
//             <p><strong>Name:</strong> {selectedVendor.firstName} {selectedVendor.lastName}</p>
//             <p><strong>Trade Name:</strong> {selectedVendor.tradeName}</p>
//             <p><strong>License Number:</strong> {selectedVendor.licenseNumber}</p>
//             <p><strong>TRN Number:</strong> {selectedVendor.trnNumber}</p>
//             <p><strong>Business Type:</strong> {selectedVendor.businessType}</p>
//             <p><strong>Vendor ID:</strong> {selectedVendor.idNumber}</p>
//             <p><strong>Contact:</strong> {selectedVendor.contact}</p>
//             <p><strong>Address:</strong> {selectedVendor.address}, {selectedVendor.city}, {selectedVendor.area}</p>

//             <div className="flex gap-4 mt-4">
//               {selectedVendor.licenseImage && (
//                 <img
//                   src={selectedVendor.licenseImage}
//                   alt="License"
//                   className="w-32 rounded shadow cursor-pointer"
//                   onClick={() => setSelectedImage(selectedVendor.licenseImage)}
//                 />
//               )}
//               {selectedVendor.passportImage && (
//                 <img
//                   src={selectedVendor.passportImage}
//                   alt="Passport"
//                   className="w-32 rounded shadow cursor-pointer"
//                   onClick={() => setSelectedImage(selectedVendor.passportImage)}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from "react-router-dom";

export default function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await axios.get('/admin/vendors', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
        }
      });
      setVendors(res.data);
    } catch (err) {
      console.error('Failed to load vendors', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;
    try {
      await axios.delete(`/admin/vendor/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
        }
      });
      setVendors(vendors.filter(v => v._id !== id));
    } catch (err) {
      console.error('Failed to delete vendor', err);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Approve this vendor?")) return;
    try {
      await axios.put(`/admin/vendor/approve/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
        }
      });
      fetchVendors();
    } catch (err) {
      console.error('Failed to approve vendor', err);
    }
  };

  const filtered = vendors.filter(v => {
    const fullName = `${v.firstName} ${v.lastName}`.toLowerCase();
    const query = search.toLowerCase();
    return (
      v.idNumber.includes(search) ||
      v.firstName.toLowerCase().includes(query) ||
      v.lastName.toLowerCase().includes(query) ||
      fullName.includes(query)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Registered Vendors</h2>

      {/* 🔍 Search Box */}
      <input
        type="text"
        placeholder="Search by ID or Name"
        className="mb-4 px-4 py-2 border rounded w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4">ID Number</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Contact</th>
              <th className="py-2 px-4">City</th>
              <th className="py-2 px-4">Area</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(vendor => (
              <tr key={vendor._id} className="border-t">
                <td className="py-2 px-4">{vendor.idNumber}</td>
                <td className="py-2 px-4">{vendor.firstName} {vendor.lastName}</td>
                <td className="py-2 px-4">{vendor.contact}</td>
                <td className="py-2 px-4">{vendor.city}</td>
                <td className="py-2 px-4">{vendor.area}</td>
                <td className="py-2 px-4 space-x-2 flex items-center">
                  
                  {/* 👀 View Profile Button */}
                  <button
                    onClick={() => navigate(`/admin/vendors/${vendor._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View Profile
                  </button>

                  {/* ✅ Approval Button */}
                  {vendor.isApproved ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <button
                      onClick={() => handleApprove(vendor._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}

                  {/* 🗑 Delete Button */}
                  <button
                    onClick={() => handleDelete(vendor._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No vendors match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
