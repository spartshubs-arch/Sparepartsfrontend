// import { useEffect, useState , useCallback} from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios";

// export default function ViewProducts() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   const vendor = JSON.parse(sessionStorage.getItem("vendorInfo"));
// let admin = null;
// try {
//   admin = JSON.parse(sessionStorage.getItem("adminInfo"));
// } catch {
//   admin = null;
// }

// const isAdmin = admin && typeof admin.token === "string";


// const fetchProducts = useCallback(async () => {
//   try {
//     let res;

//     if (isAdmin) {
//       res = await axios.get("/products/all-admin");
//     } else if (vendor?.id) {
//       res = await axios.get(`/products/all?vendorId=${vendor.id}`);
//     } else {
//       alert("Unauthorized user");
//       return;
//     }

//     setProducts(res.data);
//   } catch (err) {
//     console.error("❌ Failed to fetch products", err);
//   }
// }, [isAdmin, vendor]);

// useEffect(() => {
//   fetchProducts();
// }, [fetchProducts]);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`/products/delete/${id}`);
//         alert("Product deleted ✅");
//         fetchProducts(); // Refresh list
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
//                     onClick={() => navigate(`/admin/edit/${prod._id}`)}
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





// import { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../api/axios";

// export default function AdminViewProducts() {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   // Fetch admin from sessionStorage
// const token = sessionStorage.getItem("adminToken");
// const isAdmin = !!token  



//   // Function to fetch all products (for admin)
//  const fetchAllProducts = useCallback(async () => {
//   if (!isAdmin) {
//     alert("❌ Unauthorized admin access");
//     return;
//   }

//   try {
//     const res = await axios.get("/products/all-admin", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setProducts(res.data);
//   } catch (err) {
//     console.error("❌ Failed to fetch all products:", err);
//     alert("Failed to fetch products");
//   }
// }, [isAdmin, token]);


//   useEffect(() => {
//     fetchAllProducts();
//   }, [fetchAllProducts]);

//   // Handle deleting a product
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`/products/delete/${id}`);
//         alert("Product deleted ✅");
//         fetchAllProducts(); 
//       } catch (err) {
//         console.error("❌ Delete failed", err);
//         alert("Failed to delete product");
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">All Vendor Products</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border text-sm text-left">
//           <thead className="bg-gray-100 border-b">
//             <tr>
//               <th className="p-2">#</th>
//               <th className="p-2">Product Name</th>
//               <th className="p-2">Price</th>
//               <th className="p-2">Stock</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Vendor ID</th>
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
//       <td className="p-2">
//   {prod.vendorId?.idNumber || "Unknown"}
// </td>

//                 <td className="p-2 space-x-2">
//                   <button
//                     onClick={() => navigate(`/admin/edit-product/${prod._id}`)}
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
import axios from "../../api/axios";

export default function AdminViewProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // ✅ for search results
  const [search, setSearch] = useState(""); // ✅ search input
  const navigate = useNavigate();

  // Fetch admin from sessionStorage
  const token = sessionStorage.getItem("adminToken");
  const isAdmin = !!token;

  // Function to fetch all products (for admin)
  const fetchAllProducts = useCallback(async () => {
    if (!isAdmin) {
      alert("❌ Unauthorized admin access");
      return;
    }

    try {
      const res = await axios.get("/products/all-admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
      setFilteredProducts(res.data); // ✅ set initial
    } catch (err) {
      console.error("❌ Failed to fetch all products:", err);
      alert("Failed to fetch products");
    }
  }, [isAdmin, token]);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // ✅ Filter products by name
  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const results = products.filter((prod) =>
      prod.ProductName?.toLowerCase().includes(lowerSearch)
    );
    setFilteredProducts(results);
  }, [search, products]);

  // Handle deleting a product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/products/delete/${id}`);
        alert("Product deleted ✅");
        fetchAllProducts();
      } catch (err) {
        console.error("❌ Delete failed", err);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Vendor Products</h2>

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search by product name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Status</th>
              <th className="p-2">Vendor ID</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((prod, index) => (
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
                <td className="p-2">{prod.vendorId?.idNumber || "Unknown"}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => navigate(`/admin/edit-product/${prod._id}`)}
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

        {filteredProducts.length === 0 && (
          <p className="text-gray-600 mt-4">No products found.</p>
        )}
      </div>
    </div>
  );
}
