import { createContext, useContext, useState } from 'react';

const CartContext = createContext();



export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
  setCartItems((prev) => {
    const exists = prev.find((item) => item._id === product._id);
    if (exists) {
      return prev.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + product.quantity } // ✅ Fix here
          : item
      );
    }
    return [...prev, product];
  });
};


  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
 const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);