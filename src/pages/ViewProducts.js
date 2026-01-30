// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axios";

// export default function ViewProducts() {
//   const [products, setProducts] = useState([]);
// const navigate = useNavigate();
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//  const fetchProducts = async () => {
//   try {
//     const vendor = JSON.parse(sessionStorage.getItem("vendorInfo"));
//     if (!vendor?.id) {
//       alert("Vendor not logged in");
//       return;
//     }

//     const res = await axios.get(`/products/all?vendorId=${vendor.id}`);
//     setProducts(res.data);
//   } catch (err) {
//     console.error("❌ Failed to fetch products", err);
//   }
// };

// const handleDelete = async (id) => {
//   if (window.confirm("Are you sure you want to delete this product?")) {
//     try {
//       await axios.delete(`/products/delete/${id}`);
//       alert("Product deleted ✅");
//       fetchProducts(); // refresh list
//     } catch (err) {
//       console.error("❌ Delete failed", err);
//       alert("Failed to delete");
//     }
//   }
// };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">All Uploaded Products</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border text-sm text-left">
//           <thead className="bg-gray-100 border-b">
//             <tr>
//               <th className="p-2">#</th>
//               <th className="p-2">Product Name</th>
//               <th className="p-2">Price</th>
//               <th className="p-2">Stock</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((prod, index) => (
//               <tr key={prod._id} className="border-b hover:bg-gray-50">
//                 <td className="p-2">{index + 1}</td>
//                 <td className="p-2">{prod.ProductName}</td>
//                 <td className="p-2">AED {prod.price}</td>
//                 <td className="p-2">{prod.stock}</td>
//                 <td className="p-2">
//                   <span
//                     className={`px-2 py-1 rounded-full text-white text-xs ${
//                       prod.status === "sold" ? "bg-red-500" : "bg-green-600"
//                     }`}
//                   >
//                     {prod.status}
//                   </span>
//                 </td>
//                 <td className="p-2 space-x-2">
//                   <button
//   onClick={() => navigate(`/edit/${prod._id}`)}
//   className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
// >
//   Edit
// </button>
//                   <button
//   onClick={() => handleDelete(prod._id)}
//   className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
// >
//   Delete
// </button>

//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {products.length === 0 && (
//           <p className="text-gray-600 mt-4">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axios";

// export default function ViewProducts() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   let vendor = null;
//   let admin = null;

//   try {
//     vendor = JSON.parse(sessionStorage.getItem("vendorInfo"));
//     admin = JSON.parse(sessionStorage.getItem("adminInfo"));
//   } catch {
//     vendor = null;
//     admin = null;
//   }
// // ✅ Normalize values
// const vendorId = vendor?._id || vendor?.id;
// const adminToken = admin?.token;

// const isVendor = Boolean(vendorId);
// const isAdmin = Boolean(adminToken);
//   // const isVendor = vendor && typeof vendor.id === "string";
//   // const isAdmin = admin && typeof admin.token === "string";

//   // const fetchProducts = useCallback(async () => {
//   //   try {
//   //     let res;

//   //     if (isAdmin) {
//   //       res = await axios.get("/products/all-admin");
//   //     } else if (isVendor) {
//   //       res = await axios.get(`/products/all?vendorId=${vendor.id}`);
//   //     } else {
//   //       alert("❌ Unauthorized user.");
//   //       return;
//   //     }

//   //     setProducts(res.data);
//   //   } catch (err) {
//   //     console.error("❌ Failed to fetch products", err);
//   //   }
//   // }, [isAdmin, isVendor, vendor]);


//   const fetchProducts = useCallback(async () => {
//   try {
//     let res;

//     if (isAdmin) {
//       res = await axios.get("/products/all-admin", {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       });
//     } else if (isVendor) {
//       res = await axios.get(`/products/all?vendorId=${vendorId}`, {
//         headers: { Authorization: `Bearer ${sessionStorage.getItem("vendorToken")}` },
//       });
//     } else {
//       alert("❌ Unauthorized user.");
//       return;
//     }

//     setProducts(res.data);
//   } catch (err) {
//     console.error("❌ Failed to fetch products", err);
//   }
// }, [isAdmin, isVendor, vendorId, adminToken]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`/products/delete/${id}`);
//         alert("Product deleted ✅");
//         fetchProducts(); // Refresh
//       } catch (err) {
//         console.error("❌ Delete failed", err);
//         alert("Failed to delete");
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">
//         {isAdmin ? "All Products (Admin View)" : "Your Uploaded Products"}
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border text-sm text-left">
//           <thead className="bg-gray-100 border-b">
//             <tr>
//               <th className="p-2">#</th>
//               <th className="p-2">Product Name</th>
//               <th className="p-2">Price</th>
//               <th className="p-2">Stock</th>
//               <th className="p-2">Status</th>
//               {isAdmin && <th className="p-2">Vendor ID</th>}
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((prod, index) => (
//               <tr key={prod._id} className="border-b hover:bg-gray-50">
//                 <td className="p-2">{index + 1}</td>
//                 <td className="p-2">{prod.ProductName}</td>
//                 <td className="p-2">AED {prod.price}</td>
//                 <td className="p-2">{prod.stock}</td>
//                 <td className="p-2">
//                   <span
//                     className={`px-2 py-1 rounded-full text-white text-xs ${
//                       prod.status === "sold"
//                         ? "bg-red-500"
//                         : prod.status === "pending"
//                         ? "bg-yellow-500"
//                         : "bg-green-600"
//                     }`}
//                   >
//                     {prod.status}
//                   </span>
//                 </td>
//                 {isAdmin && <td className="p-2">{prod.vendorId}</td>}
//                 <td className="p-2 space-x-2">
//                   <button
//                     onClick={() =>
//                       navigate(
//                         isAdmin
//                           ? `/admin/edit/${prod._id}`
//                           : `/vendor/edit/${prod._id}`
//                       )
//                     }
//                     className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(prod._id)}
//                     className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {products.length === 0 && (
//           <p className="text-gray-600 mt-4">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// }



import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  let vendor = null;
  let admin = null;

  try {
    vendor = JSON.parse(sessionStorage.getItem("vendorInfo"));
    admin = JSON.parse(sessionStorage.getItem("adminInfo"));
  } catch {
    vendor = null;
    admin = null;
  }

  // ✅ Normalize values
  const vendorId = vendor?._id || vendor?.id;
  const adminToken = admin?.token;

  const isVendor = Boolean(vendorId);
  const isAdmin = Boolean(adminToken);

  const fetchProducts = useCallback(async () => {
    try {
      let res;

      if (isAdmin) {
        res = await axios.get("/products/all-admin", {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      } else if (isVendor) {
        res = await axios.get(`/products/all?vendorId=${vendorId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("vendorToken")}`,
          },
        });
      } else {
        alert("❌ Unauthorized user.");
        return;
      }

      setProducts(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch products", err);
    }
  }, [isAdmin, isVendor, vendorId, adminToken]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/products/delete/${id}`);
        alert("Product deleted ✅");
        fetchProducts(); // Refresh
      } catch (err) {
        console.error("❌ Delete failed", err);
        alert("Failed to delete");
      }
    }
  };

  const StatusBadge = ({ status }) => (
    <span
      className={`inline-block px-2 py-1 rounded-full text-white text-xs capitalize ${
        status === "sold"
          ? "bg-red-500"
          : status === "pending"
          ? "bg-yellow-500"
          : "bg-green-600"
      }`}
    >
      {status}
    </span>
  );

  return (
    <div className="p-3 sm:p-6">
      <h2 className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-4">
        {isAdmin ? "All Products (Admin View)" : "Your Uploaded Products"}
      </h2>

      {/* ✅ MOBILE VIEW (Cards) */}
      <div className="sm:hidden space-y-3">
        {products.map((prod, index) => (
          <div
            key={prod._id}
            className="bg-white border rounded-lg p-3 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-gray-500">#{index + 1}</p>
                <p className="font-semibold text-sm break-words">
                  {prod.ProductName}
                </p>
              </div>
              <StatusBadge status={prod.status} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">Price</p>
                <p className="font-medium">AED {prod.price}</p>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">Stock</p>
                <p className="font-medium">{prod.stock}</p>
              </div>

              {isAdmin && (
                <div className="col-span-2 bg-gray-50 rounded p-2">
                  <p className="text-xs text-gray-500">Vendor ID</p>
                  <p className="font-medium break-words">{prod.vendorId}</p>
                </div>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() =>
                  navigate(isAdmin ? `/admin/edit/${prod._id}` : `/vendor/edit/${prod._id}`)
                }
                className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(prod._id)}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded text-xs hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-gray-600 mt-4">No products found.</p>
        )}
      </div>

      {/* ✅ TABLET/DESKTOP VIEW (Table) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2 whitespace-nowrap">#</th>
              <th className="p-2 whitespace-nowrap">Product Name</th>
              <th className="p-2 whitespace-nowrap">Price</th>
              <th className="p-2 whitespace-nowrap">Stock</th>
              <th className="p-2 whitespace-nowrap">Status</th>
              {isAdmin && <th className="p-2 whitespace-nowrap">Vendor ID</th>}
              <th className="p-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod._id} className="border-b hover:bg-gray-50">
                <td className="p-2 whitespace-nowrap">{index + 1}</td>
                <td className="p-2 min-w-[220px] break-words">
                  {prod.ProductName}
                </td>
                <td className="p-2 whitespace-nowrap">AED {prod.price}</td>
                <td className="p-2 whitespace-nowrap">{prod.stock}</td>
                <td className="p-2 whitespace-nowrap">
                  <StatusBadge status={prod.status} />
                </td>
                {isAdmin && (
                  <td className="p-2 whitespace-nowrap">{prod.vendorId}</td>
                )}
                <td className="p-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(
                          isAdmin
                            ? `/admin/edit/${prod._id}`
                            : `/vendor/edit/${prod._id}`
                        )
                      }
                      className="px-3 py-2 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="px-3 py-2 bg-red-500 text-white rounded text-xs hover:bg-red-600 whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-gray-600 mt-4">No products found.</p>
        )}
      </div>
    </div>
  );
}

