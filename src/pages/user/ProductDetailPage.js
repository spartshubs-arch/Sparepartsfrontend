// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { useCart } from '../../components/CartContext';
// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const { addToCart } = useCart(); 


//   useEffect(() => {
//     axios.get(`/products/${id}`)
//       .then((res) => {
//         const data = res.data;
//         setProduct(data);
//         const imgs = data.watermarkedImages?.length ? data.watermarkedImages : data.images || [];
//         setSelectedImage(imgs[0]);
//       })
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!product) return <div className="p-6">Loading...</div>;

//   const images = product.watermarkedImages?.length
//     ? product.watermarkedImages
//     : product.images || [];

//   return (
//     <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
//       {/* Left: Image Gallery */}
//       <div>
//         <div className="border rounded-lg overflow-hidden shadow-md">
//           <img
//             src={selectedImage}
//             alt="Main"
//             className="w-full h-[400px] object-contain bg-white"
//           />
//         </div>
//         <div className="flex mt-4 gap-2 overflow-x-auto">
//           {images.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               onClick={() => setSelectedImage(img)}
//               className={`w-20 h-20 object-contain border rounded cursor-pointer ${
//                 selectedImage === img ? "border-blue-500" : "border-gray-300"
//               }`}
//               alt={`thumb-${index}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Right: Product Info */}
//       <div className="space-y-6">
//         <h2 className="text-3xl font-semibold text-gray-800">{product.ProductName}</h2>
//         <p className="text-xl text-red-600 font-bold">AED {product.price}</p>
//         <p className="text-gray-700 leading-relaxed">{product.description || "No description available."}</p>
        
//         <button
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//           onClick={() => addToCart(product)}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }










// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from '../../api/axios';
// import { useCart } from '../../components/CartContext';  

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const { addToCart } = useCart();  // ✅ Correct usage

//   useEffect(() => {
//     axios.get(`/products/${id}`)
//       .then((res) => {
//         const data = res.data;
//         setProduct(data);
//         const imgs = data.watermarkedImages?.length ? data.watermarkedImages : data.images || [];
//         setSelectedImage(imgs[0]);
//       })
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!product) return <div className="p-6">Loading...</div>;

//   const images = product.watermarkedImages?.length
//     ? product.watermarkedImages
//     : product.images || [];

//   return (
//     <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
//       {/* Left: Image Gallery */}
//       <div>
//         <div className="border rounded-lg overflow-hidden shadow-md">
//           <img
//             src={selectedImage}
//             alt="Main"
//             className="w-full h-[400px] object-contain bg-white"
//           />
//         </div>
//         <div className="flex mt-4 gap-2 overflow-x-auto">
//           {images.map((img, index) => (
//             <img
//               key={index}
//               src={img}
//               onClick={() => setSelectedImage(img)}
//               className={`w-20 h-20 object-contain border rounded cursor-pointer ${
//                 selectedImage === img ? "border-blue-500" : "border-gray-300"
//               }`}
//               alt={`thumb-${index}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Right: Product Info */}
//       <div className="space-y-6">
//         <h2 className="text-3xl font-semibold text-gray-800">{product.ProductName}</h2>
//         <p className="text-xl text-red-600 font-bold">AED {product.price}</p>
//         <p className="text-gray-700 leading-relaxed">{product.description || "No description available."}</p>
        
//         <button
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//           onClick={() => addToCart(product)}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from '../../api/axios';
import { useCart } from '../../components/CartContext';
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`/products/${id}`)
      .then((res) => {
        const data = res.data;
        setProduct(data);
        const imgs = data.watermarkedImages?.length ? data.watermarkedImages : data.images || [];
        setSelectedImage(imgs[0]);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  const images = product.watermarkedImages?.length
    ? product.watermarkedImages
    : product.images || [];

  const handleAddToCart = () => {
addToCart({
  _id: product._id,
  name: product.ProductName, 
  price: product.price,
  quantity,
  brand: product.brand,
  make: product.make,
  model: product.model,
  year: product.year,
  size: product.size,
  images: product.images || [],
});
    toast.success(`${quantity} item(s) added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto p-4"
    >
      <ToastContainer position="top-right" autoClose={2000} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Image and Thumbnails */}
        <div className="flex flex-col gap-4 items-center">
          <div className="border rounded-lg shadow-md w-full bg-white flex justify-center">
            <img
              src={selectedImage}
              alt="Main"
              className="object-contain h-[400px] w-full max-w-full"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-contain border rounded cursor-pointer ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
                alt={`thumb-${index}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-900">{product.ProductName}</h2>
          <p className="text-xl text-red-600 font-bold">AED {product.price}</p>

          {product.make && <p><strong>Make:</strong> {product.make}</p>}
          {product.model && <p><strong>Model:</strong> {product.model}</p>}
                    {product.year && <p><strong>Year:</strong> {product.year}</p>}

          {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
          {product.category && <p><strong>Category:</strong> {product.category}</p>}
          {product.tags?.length > 0 && (
            <p><strong>Tags:</strong> {product.tags.join(", ")}</p>
          )}

          {/* Description Box */}
          <div className="max-h-48 overflow-auto bg-gray-100 p-4 rounded-md border">
            <p className="text-gray-700 leading-relaxed">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border rounded px-3 py-1">
              <button
                className="px-2 text-lg"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >−</button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-2 text-lg"
                onClick={() => setQuantity((prev) => prev + 1)}
              >+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="border border-gray-400 text-gray-700 px-6 py-2 rounded hover:bg-gray-100 transition"
              onClick={() => navigate('/shop')}
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
