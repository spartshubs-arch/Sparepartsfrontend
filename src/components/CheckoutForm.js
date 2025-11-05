

// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';
// import { useState } from 'react';
// import axios from '../api/axios';

// const ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       fontSize: '16px',
//       color: '#32325d',
//       '::placeholder': { color: '#aab7c4' },
//       fontFamily: 'Arial, sans-serif',
//     },
//     invalid: { color: '#fa755a' },
//   },
// };

// const CheckoutForm = ({ cartItems, customerInfo,onSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const totalAmount = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 1. Create PaymentIntent
//       const { data } = await axios.post('/payment/create-payment-intent', {
//         totalAmount,
//       });

//       // 2. Confirm Card Payment
//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: {
//             name: `${customerInfo.firstName} ${customerInfo.lastName}`,
//             email: customerInfo.email,
//             phone: customerInfo.contactNumber,
//           },
//         },
//       });

//       if (result.error) {
//         alert(result.error.message);
//       } else if (result.paymentIntent.status === 'succeeded') {
//         // 3. Prepare order object
//         const order = {
//           customerInfo,
//           cartItems,
//           totalAmount,
//           paymentIntentId: result.paymentIntent.id,
//           createdAt: new Date().toISOString(),
//         };

//         // 4. Save to backend
//         await axios.post('/orders', order);

//         // 5. Save in sessionStorage
//         sessionStorage.setItem('recentOrder', JSON.stringify(order));
// sessionStorage.setItem("orderEmail", customerInfo.email);

//         // 6. Clear cart
//         // clearCart();

//         // 7. Callback to show success
//         onSuccess(result.paymentIntent);
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Payment failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
//       <div className="space-y-3">
//         <label className="text-sm font-medium text-gray-700">Card Number</label>
//         <div className="border border-gray-300 rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-green-600">
//           <CardNumberElement options={ELEMENT_OPTIONS} />
//         </div>

//         <label className="text-sm font-medium text-gray-700">Expiry</label>
//         <div className="border border-gray-300 rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-green-600">
//           <CardExpiryElement options={ELEMENT_OPTIONS} />
//         </div>

//         <label className="text-sm font-medium text-gray-700">CVC</label>
//         <div className="border border-gray-300 rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-green-600">
//           <CardCvcElement options={ELEMENT_OPTIONS} />
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
//       >
//         {loading ? 'Processing...' : `Pay AED ${totalAmount}`}
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;






import { useState } from 'react';
import axios from '../api/axios';

const CheckoutForm = ({ cartItems, customerInfo, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
       const customOrderId = 'ORD-' + Date.now();
      const order = {
        orderId: customOrderId, 
        customerInfo,
        cartItems,   
        totalAmount,
        paymentMethod: 'Cash on Delivery',
        createdAt: new Date().toISOString(),
      };

      // Save to backend
      await axios.post('/orders', order);

      // Save in sessionStorage (optional)
      sessionStorage.setItem('recentOrder', JSON.stringify(order));
      sessionStorage.setItem('orderEmail', customerInfo.email);
    onSuccess({ id: customOrderId }); 
    } catch (err) {
      console.error(err);
      alert('Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md">
        Cash on Delivery selected. Please confirm to place your order.
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white font-medium py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
      >
        {loading ? 'Placing Order...' : `Place Order (AED ${totalAmount.toFixed(2)})`}
      </button>
    </form>
  );
};

export default CheckoutForm;
