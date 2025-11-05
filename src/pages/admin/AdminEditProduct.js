


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function AdminEditProduct() {
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
    year: "", 
    stock: "",
    description: "",
    brand: "",
    size: "",
    status: "pending",
    condition: "", 
  });

  const [images, setImages] = useState([]);
  const [watermarkedImages, setWatermarkedImages] = useState([]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${id}`);
      const data = res.data;

      const cleanedData = {
        ProductName: data.ProductName || "",
        ProductNo: data.ProductNo || "",
        unit: data.unit || "",
        price: data.price || "",
        salePrice: data.salePrice || "",
        carParts: data.carParts || "",
        side: data.side || "",
        make: data.make || "",
        model: data.model || "",
        year: data.year || "",
        stock: data.stock || "",
        description: data.description || "",
        brand: data.brand || "",
        size: data.size || "",
        status: data.status || "pending",
        condition: data.condition || "",
      };

      setFormData(cleanedData);
      setImages(data.images || []);
      setWatermarkedImages(data.watermarkedImages || []); 
    } catch (err) {
      console.error("Failed to load product", err);
    }
  };

 useEffect(() => {
  fetchProduct();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedForm = { ...formData, isAdmin: true }; // 👈 Tell backend it's admin
      await axios.put(`/products/edit/${id}`, updatedForm);

      alert("✅ Product updated!");

      // 👇 Fetch again to refresh with updated watermarked images
      await fetchProduct();


      navigate("/admin/view-products");
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
          .filter((field) => !["_id", "images", "createdAt", "updatedAt", "__v", "vendorId"].includes(field))
          .map((field) => (
            <div key={field} className="flex flex-col">
              <label className="capitalize">{field}</label>
              {field === "status" ? (
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="sold">Sold</option>
                </select>
              ) : field === "condition" ? (
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Condition</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
      ) : (
                <input
                  type={field === "year" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="border p-2 rounded"
                  required
                />
              )}
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

        {/* ✅ Show watermarked images if available */}
        {(watermarkedImages.length > 0 ? watermarkedImages : images).length > 0 && (
          <div className="col-span-2 mt-6">
            <h3 className="text-lg font-medium mb-2">
              {watermarkedImages.length > 0 ? "Watermarked Images:" : "Uploaded Images:"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(watermarkedImages.length > 0 ? watermarkedImages : images).map((url, index) => (
                <div key={index} className="border p-2 rounded">
                  <img
                    src={url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-40 object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
