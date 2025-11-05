
// import { useCart } from '../../components/CartContext';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CartPage = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     updateQuantity,
//   } = useCart();

//   const handleQuantityChange = (productId, amount) => {
//     const item = cartItems.find((item) => item._id === productId);
//     const newQty = item.quantity + amount;
//     if (newQty < 1) return;
//     updateQuantity(productId, newQty);
//     toast.success('Quantity updated');
//   };

//   const handleRemove = (productId) => {
//     removeFromCart(productId);
//     toast.info('Item removed from cart');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.4 }}
//       className="container mx-auto p-4"
//     >
//       <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

//       {cartItems.length === 0 ? (
//         <div className="text-center">
//           <p className="text-gray-500">Your cart is empty.</p>
//           <Link
//             to="/shop"
//             className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Back to Shop
//           </Link>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {cartItems.map((item) => (
//             <motion.div
//               key={item._id}
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 50 }}
//               className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white shadow-lg rounded-lg p-5"
//             >
//               <div className="flex items-start gap-4">
//                 <img
//                   src={item.images[0]}
//                   alt={item.name}
//                   className="w-28 h-28 object-cover rounded"
//                 />
//                 <div>
//                   <h3 className="text-lg font-bold">{item.name}</h3>
//                   <p className="text-gray-600 mb-1">${item.price.toFixed(2)}</p>
//                   <p className="text-sm text-gray-500">Brand: <span className="text-black">{item.brand || 'N/A'}</span></p>
//                   <p className="text-sm text-gray-500">Make: <span className="text-black">{item.make || 'N/A'}</span></p>
//                   <p className="text-sm text-gray-500">Model: <span className="text-black">{item.model || 'N/A'}</span></p>
//                   <p className="text-sm text-gray-500">Size: <span className="text-black">{item.size || 'N/A'}</span></p>
//                 </div>
//               </div>

//               <div className="flex items-center mt-4 md:mt-0 space-x-3">
//                 <button
//                   onClick={() => handleQuantityChange(item._id, -1)}
//                   className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
//                 >
//                   −
//                 </button>
//                 <span className="px-2 font-semibold">{item.quantity}</span>
//                 <button
//                   onClick={() => handleQuantityChange(item._id, 1)}
//                   className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
//                 >
//                   +
//                 </button>
//                 <button
//                   onClick={() => handleRemove(item._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </motion.div>
//           ))}

//          <form
//   onSubmit={(e) => {
//     e.preventDefault();
//     // We'll add Stripe integration here in the next step
//     toast.success("Form submitted. Ready for payment.");
//   }}
//   className="bg-gray-100 p-4 rounded-lg mt-6 space-y-4"
// >
//   <h3 className="text-xl font-semibold">Customer Information</h3>

//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     <input
//       type="text"
//       placeholder="First Name"
//       required
//       className="p-2 border rounded"
//     />
//     <input
//       type="text"
//       placeholder="Last Name"
//       required
//       className="p-2 border rounded"
//     />
//     <input
//       type="tel"
//       placeholder="Contact Number"
//       required
//       className="p-2 border rounded"
//     />
//     <input
//       type="email"
//       placeholder="Email Address"
//       required
//       className="p-2 border rounded"
//     />
//     <input
//       type="text"
//       placeholder="Home Address"
//       required
//       className="p-2 border rounded"
//     />
//     <input
//       type="text"
//       placeholder="Area"
//       required
//       className="p-2 border rounded"
//     />
//     <input
//       type="text"
//       placeholder="City"
//       required
//       className="p-2 border rounded"
//     />
//   </div>

//   <h3 className="text-lg font-semibold mt-4">Order Summary</h3>
//   <ul className="list-disc list-inside text-gray-700">
//     {cartItems.map((item) => (
//       <li key={item._id}>
//         {item.name} x {item.quantity} = ${item.price * item.quantity}
//       </li>
//     ))}
//   </ul>

//   <div className="mt-2 text-lg font-semibold">
//     Total: $
//     {cartItems
//       .reduce((acc, item) => acc + item.price * item.quantity, 0)
//       .toFixed(2)}
//   </div>

//   <button
//     type="submit"
//     className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-green-700"
//   >
//     Proceed to Payment
//   </button>
// </form>

//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default CartPage;





import { useCart } from '../../components/CartContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import CheckoutForm from '../../components/CheckoutForm';

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
      clearCart, // 👈 Add this

  } = useCart();

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paidAmount, setPaidAmount] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    homeAddress: '',
    area: '',
    city: '',
  });

  const handleQuantityChange = (productId, amount) => {
    const item = cartItems.find((item) => item._id === productId);
    const newQty = item.quantity + amount;
    if (newQty < 1) return;
    updateQuantity(productId, newQty);
    toast.success('Quantity updated');
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    toast.info('Item removed from cart');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
  e.preventDefault();
  setShowPaymentOptions(true);
};


  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
const handlePaymentSuccess = (paymentIntent) => {
  setPaidAmount(totalAmount); // 💡 Save it BEFORE cart is cleared
  setPaymentSuccess(true);
  setPaymentDetails(paymentIntent);
  clearCart(); // 👈 now it's safe
  toast.success('Payment successful!');
};



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="container mx-auto p-4"
    >
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {paymentSuccess ? (
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-green-800">Order Confirmed!</h3>
          <p>Thank you, {formData.firstName} {formData.lastName}.</p>
<p>Order ID: <span className="font-mono">{paymentDetails.id}</span></p>
<p>Total Paid: AED{paidAmount !== null ? paidAmount.toFixed(2) : "N/A"}</p>
          <Link to="/" className="text-blue-600 underline mt-4 inline-block">Go back to home</Link>
        </div>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-500">Your cart is empty.</p>
              <Link
                to="/shop"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Back to Shop
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white shadow-lg rounded-lg p-5"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-bold">{item.name}</h3>
<p className="text-gray-600 mb-1">AED{item.price ? item.price.toFixed(2) : "0.00"}</p>

                      <p className="text-sm text-gray-500">Brand: <span className="text-black">{item.brand || 'N/A'}</span></p>
                      <p className="text-sm text-gray-500">Make: <span className="text-black">{item.make || 'N/A'}</span></p>
                      <p className="text-sm text-gray-500">Model: <span className="text-black">{item.model || 'N/A'}</span></p>
                      <p className="text-sm text-gray-500">Year: <span className="text-black">{item.year || 'N/A'}</span></p>
                      <p className="text-sm text-gray-500">Size: <span className="text-black">{item.size || 'N/A'}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 md:mt-0 space-x-3">
                    <button
                      onClick={() => handleQuantityChange(item._id, -1)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="px-2 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, 1)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}

              {!showPaymentOptions ? (
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-gray-100 p-4 rounded-lg mt-6 space-y-4"
                >
                  <h3 className="text-xl font-semibold">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="firstName" placeholder="First Name" required className="p-2 border rounded" onChange={handleInputChange} />
                    <input type="text" name="lastName" placeholder="Last Name" required className="p-2 border rounded" onChange={handleInputChange} />
                    <input type="tel" name="contactNumber" placeholder="Contact Number" required className="p-2 border rounded" onChange={handleInputChange} />
                    <input type="email" name="email" placeholder=" ⚠️Enter Valid Same Email Address Through Which You Login" required className="p-2 border rounded" onChange={handleInputChange} />
                    <input type="text" name="Address" placeholder="Address" required className="p-2 border rounded" onChange={handleInputChange} />
                    <input type="text" name="area" placeholder="Area" required className="p-2 border rounded" onChange={handleInputChange} />
                    <input type="text" name="city" placeholder="City" required className="p-2 border rounded" onChange={handleInputChange} />
                  </div>

                  <h3 className="text-lg font-semibold mt-4">Order Summary</h3>
              <ul className="list-disc list-inside text-gray-700">
  {cartItems.map((item) => (
    <li key={item._id}>
      {item.name} ({item.brand || 'N/A'} / {item.make || 'N/A'} / {item.model || 'N/A'} / {item.size || 'N/A'})
      &nbsp; x {item.quantity} = AED{(item.price * item.quantity).toFixed(2)}
    </li>
  ))}
</ul>


                  <div className="mt-2 text-lg font-semibold">
                    Total: AED{totalAmount.toFixed(2)}
                  </div>

                  <button
                    type="submit"
                    className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-green-700"
                  >
                    Proceed to Checkout
                  </button>
                </form>
              ) : (
                <div className="bg-white p-4 rounded shadow mt-4">
                  <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
                  <CheckoutForm
                    cartItems={cartItems}
                    customerInfo={formData}
                    onSuccess={handlePaymentSuccess}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default CartPage;
