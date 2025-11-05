import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ProductName: "",
    ProductNo: "",
    unit: "",
    price: "",
    salePrice: "",
    carParts: "",
    side: "",
    make: "",
    model: "",
    stock: "",
    description: "",
    brand: "",
    size: "",
  });

 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Failed to load product", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.put(`/products/edit/${id}`, formData);
  //     alert("✅ Product updated!");
  //     navigate("/view-products");
  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Update failed.");
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const updatedForm = { ...formData, isAdmin: false }; // 👈 explicitly say vendor
    await axios.put(`/products/edit/${id}`, updatedForm);
    alert("✅ Product updated!");
    navigate("/vendor/view-products");
  } catch (err) {
    console.error(err);
    alert("❌ Update failed.");
  }
};

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData)
  .filter((field) => !["_id", "images", "createdAt", "updatedAt", "__v", "status", "watermarkedImages"].includes(field))
  .map((field) => (
    <div key={field} className="flex flex-col">
      <label className="capitalize">{field}</label>
      <input
        type="text"
        name={field}
        value={formData[field]}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
    </div>
))}

        <div className="col-span-2 text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
