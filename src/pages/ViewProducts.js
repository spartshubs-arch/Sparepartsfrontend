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
  // const isVendor = vendor && typeof vendor.id === "string";
  // const isAdmin = admin && typeof admin.token === "string";

  // const fetchProducts = useCallback(async () => {
  //   try {
  //     let res;

  //     if (isAdmin) {
  //       res = await axios.get("/products/all-admin");
  //     } else if (isVendor) {
  //       res = await axios.get(`/products/all?vendorId=${vendor.id}`);
  //     } else {
  //       alert("❌ Unauthorized user.");
  //       return;
  //     }

  //     setProducts(res.data);
  //   } catch (err) {
  //     console.error("❌ Failed to fetch products", err);
  //   }
  // }, [isAdmin, isVendor, vendor]);


  const fetchProducts = useCallback(async () => {
  try {
    let res;

    if (isAdmin) {
      res = await axios.get("/products/all-admin", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
    } else if (isVendor) {
      res = await axios.get(`/products/all?vendorId=${vendorId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("vendorToken")}` },
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {isAdmin ? "All Products (Admin View)" : "Your Uploaded Products"}
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Status</th>
              {isAdmin && <th className="p-2">Vendor ID</th>}
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{prod.ProductName}</td>
                <td className="p-2">AED {prod.price}</td>
                <td className="p-2">{prod.stock}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      prod.status === "sold"
                        ? "bg-red-500"
                        : prod.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                  >
                    {prod.status}
                  </span>
                </td>
                {isAdmin && <td className="p-2">{prod.vendorId}</td>}
                <td className="p-2 space-x-2">
                  <button
                    onClick={() =>
                      navigate(
                        isAdmin
                          ? `/admin/edit/${prod._id}`
                          : `/vendor/edit/${prod._id}`
                      )
                    }
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
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
