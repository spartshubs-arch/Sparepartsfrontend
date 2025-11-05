// import { useEffect, useState } from "react";
// import axios from "../../api/axios";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const user = JSON.parse(sessionStorage.getItem("userInfo"));

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`/orders/user/${user.email}`);
//         setOrders(response.data);
//       } catch (err) {
//         console.error("Failed to fetch orders", err);
//       }
//     };

//     if (user?.email) {
//       fetchOrders();
//     }
//   }, [user]);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>

//       {orders.length === 0 ? (
//         <p className="text-center text-gray-600">No orders found.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order, index) => (
//             <div key={order._id} className="border p-4 rounded shadow bg-white">
//               <h3 className="font-semibold text-lg mb-2">
//                 Order #{index + 1} – AED {order.totalAmount}
//               </h3>
//               <p className="text-sm text-gray-500 mb-1">
//                 <span className="font-medium">Transaction ID:</span> {order.paymentIntentId}
//               </p>
//               <p className="text-sm mb-1">
//                 <span className="font-medium">Status:</span> <span className="capitalize text-blue-700">{order.status}</span>
//               </p>
//               <p className="text-sm mb-1">
//                 <span className="font-medium">Customer:</span> {order.customerInfo.firstName} {order.customerInfo.lastName}
//               </p>
//               <p className="text-sm mb-1">
//                 <span className="font-medium">Email:</span> {order.customerInfo.email}
//               </p>
//               <p className="text-sm mb-1">
//                 <span className="font-medium">Phone:</span> {order.customerInfo.contactNumber}
//               </p>
//               <p className="text-sm mb-3">
//                 <span className="font-medium">Address:</span> {order.customerInfo.homeAddress}, {order.customerInfo.area}, {order.customerInfo.city}
//               </p>

//               <ul className="list-disc list-inside text-sm text-gray-700">
//                 {order.cartItems.map((item, idx) => (
//                   <li key={idx}>
//                     {item.name} × {item.quantity} – AED {item.price * item.quantity}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
  console.log("Orders fetched:", orders);
}, [orders]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/orders/user/${user.email}`);
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    

    if (user?.email) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-800">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">To See Your Orders Login First.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order, index) => (
            <div key={order._id} className="rounded-2xl shadow-lg border border-gray-200 bg-white p-6 hover:shadow-xl transition">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-800">
                  Order #{index + 1} – <span className="text-green-600">AED {order.totalAmount}</span>
                </h3>
                <span className="px-3 py-1 mt-2 sm:mt-0 text-sm font-medium bg-blue-100 text-blue-700 rounded-full capitalize">
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-gray-700 space-y-1 mb-4">
<p>
  <span className="font-medium">Order ID:</span> {order.orderId || order._id}
</p>

                <p><span className="font-medium">Customer:</span> {order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                <p><span className="font-medium">Email:</span> {order.customerInfo.email}</p>
                <p><span className="font-medium">Phone:</span> {order.customerInfo.contactNumber}</p>
                <p><span className="font-medium">Address:</span> {order.customerInfo.homeAddress}, {order.customerInfo.area}, {order.customerInfo.city}</p>
              </div>

              <div>
                <h4 className="text-md font-semibold mb-2">Items:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-800">
                  {order.cartItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 border border-gray-100 rounded-lg p-3 bg-gray-50">
                      <img src={item.images[0]} alt={item.name} className="w-14 h-14 object-cover rounded" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} × AED {item.price}</p>
                        <p className="text-xs font-semibold text-gray-800">Total: AED {item.price * item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
