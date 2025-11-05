// import { useEffect, useState, useRef } from "react";
// import axios from "../../api/axios";

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const printRefs = useRef({});

//   // Fetch all orders on mount
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get("/orders");
//         setOrders(response.data);
//       } catch (err) {
//         console.error("Failed to fetch orders", err);
//       }
//     };
//     fetchOrders();
//   }, []);

//   // Update order status
//   const updateStatus = async (id, newStatus) => {
//     try {
//       const response = await axios.put(`/orders/${id}/status`, { status: newStatus }); // ✅ correct route
//       const updatedOrder = response.data;
//       setOrders((prev) =>
//         prev.map((order) => (order._id === id ? updatedOrder : order))
//       );
//     } catch (err) {
//       console.error("Status update failed", err);
//     }
//   };

//   // Delete order
//   const deleteOrder = async (id) => {
//     try {
//       await axios.delete(`/orders/${id}`);
//       setOrders((prev) => prev.filter((order) => order._id !== id));
//     } catch (err) {
//       console.error("Failed to delete order", err);
//     }
//   };

//   // Print order
//   const handlePrint = (id) => {
//     const printContent = printRefs.current[id];
//     const printWindow = window.open("", "", "width=900,height=700");
//     printWindow.document.write(`
//       <html>
//         <head><title>Order Print</title></head>
//         <body>${printContent.innerHTML}</body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//     printWindow.close();
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-600">No orders available.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order, index) => (
//             <div
//               key={order._id}
//               ref={(el) => (printRefs.current[order._id] = el)}
//               className="bg-white p-4 sm:p-6 rounded-2xl border shadow-md transition hover:shadow-lg"
//             >
//               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   Order #{index + 1} – <span className="text-green-600">AED {order.totalAmount}</span>
//                 </h2>
//                 <span className="text-sm text-gray-500">
//                   {new Date(order.createdAt).toLocaleString()}
//                 </span>
//               </div>

//               <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
//                 <p><span className="font-medium">Order ID:</span> {order.orderId}</p>
//                 <p><span className="font-medium">Customer:</span> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
//                 <p><span className="font-medium">Phone:</span> {order.customerInfo.contactNumber}</p>
//                 <p><span className="font-medium">Email:</span> {order.customerInfo.email}</p>
//                 <p className="sm:col-span-2"><span className="font-medium">Address:</span> {order.customerInfo.homeAddress}, {order.customerInfo.area}, {order.customerInfo.city}</p>
//               </div>

//               <div className="mb-3">
//                 <label className="block text-sm font-medium mb-1">Status:</label>
//                 <select
//                   value={order.status}
//                   onChange={(e) => updateStatus(order._id, e.target.value)}
//                   className="border rounded-md px-3 py-2 text-sm w-full sm:w-60"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="in process">In Process</option>
//                   <option value="out for delivery">Out for Delivery</option>
//                   <option value="delivered">Delivered</option>
//                 </select>
//               </div>
// <div className="bg-gray-50 p-3 rounded-md mb-4">
//   <h4 className="font-medium text-sm mb-2">Items:</h4>
//   <ul>
//     {order.cartItems.map((item, idx) => (
//       <li
//         key={idx}
//         className="flex flex-col sm:flex-row sm:justify-between border-b py-1"
//       >
//         <div>
//           <span className="font-medium">{item.name}</span> × {item.quantity}
//           <div className="text-xs text-gray-600">
//             Brand: {item.brand || 'N/A'} | Make: {item.make || 'N/A'} | Model: {item.model || 'N/A'} | Year: {item.year || 'N/A'} | Size: {item.size || 'N/A'}
//           </div>
//         </div>
//         <span className="mt-1 sm:mt-0">AED {(item.price * item.quantity).toFixed(2)}</span>
//       </li>
//     ))}
//   </ul>
// </div>


//               <div className="flex justify-end space-x-3 mt-4">
//                 <button
//                   onClick={() => handlePrint(order._id)}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
//                 >
//                   Print
//                 </button>
//                 <button
//                   onClick={() => deleteOrder(order._id)}
//                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





import { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search state
  const printRefs = useRef({});

  // Fetch all orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/orders");
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`/orders/${id}/status`, { status: newStatus });
      const updatedOrder = response.data;
      setOrders((prev) =>
        prev.map((order) => (order._id === id ? updatedOrder : order))
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      console.error("Failed to delete order", err);
    }
  };

  // Print order
  const handlePrint = (id) => {
    const printContent = printRefs.current[id];
    const printWindow = window.open("", "", "width=900,height=700");
    printWindow.document.write(`
      <html>
        <head><title>Order Print</title></head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  // 🔍 Filter orders by Order ID
  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Orders</h1>

      {/* 🔍 Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-96 border px-3 py-2 rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order, index) => (
            <div
              key={order._id}
              ref={(el) => (printRefs.current[order._id] = el)}
              className="bg-white p-4 sm:p-6 rounded-2xl border shadow-md transition hover:shadow-lg"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  Order #{index + 1} – <span className="text-green-600">AED {order.totalAmount}</span>
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
                <p><span className="font-medium">Order ID:</span> {order.orderId}</p>
                <p><span className="font-medium">Customer:</span> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                <p><span className="font-medium">Phone:</span> {order.customerInfo.contactNumber}</p>
                <p><span className="font-medium">Email:</span> {order.customerInfo.email}</p>
                <p className="sm:col-span-2"><span className="font-medium">Address:</span> {order.customerInfo.homeAddress}, {order.customerInfo.area}, {order.customerInfo.city}</p>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm w-full sm:w-60"
                >
                  <option value="pending">Pending</option>
                  <option value="in process">In Process</option>
                  <option value="out for delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <h4 className="font-medium text-sm mb-2">Items:</h4>
                <ul>
                  {order.cartItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex flex-col sm:flex-row sm:justify-between border-b py-1"
                    >
                      <div>
                        <span className="font-medium">{item.name}</span> × {item.quantity}
                        <div className="text-xs text-gray-600">
                          Brand: {item.brand || 'N/A'} | Make: {item.make || 'N/A'} | Model: {item.model || 'N/A'} | Year: {item.year || 'N/A'} | Size: {item.size || 'N/A'}
                        </div>
                      </div>
                      <span className="mt-1 sm:mt-0">AED {(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => handlePrint(order._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
                >
                  Print
                </button>
                <button
                  onClick={() => deleteOrder(order._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
