

import { useState } from "react";
import axios from "../api/axios";

export default function AddProduct() {
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
    condition: "new",
  });

  const [images, setImages] = useState([]);
const [uploading, setUploading] = useState(false);
const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Fields that should only contain numbers
    const numericFields = ["price", "salePrice", "stock", "unit"];
    if (numericFields.includes(name) && value && !/^\d+$/.test(value)) {
      return;
    }

    // Fields that should only contain letters
    const textOnlyFields = ["make", "model", "carParts", "brand", "side"];
    if (textOnlyFields.includes(name) && /\d/.test(value)) {
      return;
    }

    // Capitalize first letter for specific fields
    let formattedValue = value;
    const fieldsToCapitalize = ["ProductName", "make", "model"];
    if (fieldsToCapitalize.includes(name)) {
      formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    // Merge existing and new files, then limit to 5
    const updatedImages = [...images, ...newFiles].slice(0, 5);

    if (updatedImages.length > 5) {
      alert("You can upload a maximum of 5 images.");
    }

    setImages(updatedImages);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const vendor = JSON.parse(sessionStorage.getItem("vendorInfo"));
  const vendorId = vendor?._id || vendor?.id;

  if (!vendorId) {
    alert("Vendor not logged in");
    return;
  }

  if (!images || images.length === 0) {
    alert("Please select at least 1 image");
    return;
  }

  try {
    setUploading(true);
    setProgress(0);

    // ✅ Upload images directly to Cloudinary (sequential, stable)
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      const url = await uploadToCloudinarySigned(images[i]);
      imageUrls.push(url);
      setProgress(Math.round(((i + 1) * 100) / images.length));
    }

    // ✅ Now send JSON only to Railway
    const payload = {
      ...formData,
      vendorId,
      imageUrls,
    };

    const res = await axios.post("/products/add", payload, {
        headers: {
    Authorization: `Bearer ${sessionStorage.getItem("vendorToken")}`,
    "Content-Type": "application/json",
  },
    });

    alert("✅ Product added!");
    console.log(res.data);

    // reset
    setImages([]);
    setFormData({
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
      condition: "new",
    });
  } catch (err) {
    console.error(err);
    alert("❌ Upload failed: " + (err.response?.data?.error || err.message));
  } finally {
    setUploading(false);
  }
};


  const handleImageDelete = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
  };

const uploadToCloudinarySigned = async (file) => {
  const sigRes = await axios.get("/upload/cloudinary-signature?folder=products", {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("vendorToken")}` },
  });

  const { timestamp, signature, apiKey, cloudName, folder } = sigRes.data;

  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", apiKey);
  fd.append("timestamp", timestamp);
  fd.append("signature", signature);
  fd.append("folder", folder);

  const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  const res = await axios.post(cloudUrl, fd);
  return res.data.secure_url;
};

  return (
    <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>

      {/* ✅ Responsive grid: 1 col mobile, 2 col from sm+ */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(formData)
          .filter((field) => field !== "condition" && field !== "year")
          .map((field) => (
            <div key={field} className="flex flex-col">
              <label className="capitalize">{field}</label>
              <input
                type={["price", "salePrice", "stock", "unit"].includes(field) ? "number" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
            </div>
          ))}

        {/* ✅ Year field */}
        <div className="flex flex-col">
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear() + 1}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* ✅ Condition full-width on mobile, normal in grid */}
        <div className="border p-2 rounded flex flex-col gap-1 w-full">
          <label className="font-medium text-sm">Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Condition</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>

        {/* ✅ Images section spans full width always */}
        <div className="col-span-1 sm:col-span-2">
          <label>Product Images (multiple upto 5):</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block mt-1 w-full"
            required
          />

          {/* Show selected image names and count */}
          {images.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              <strong>{images.length}</strong> image(s) selected:
              <ul className="mt-2 space-y-2">
                {images.map((file, index) => (
                  <li
                    key={index}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-gray-100 px-3 py-2 rounded"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className="text-red-600 text-sm hover:underline sm:ml-4 self-start sm:self-auto"
                    >
                      🗑️ Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ✅ Button spans full width always */}
        <div className="col-span-1 sm:col-span-2">
         <button
  type="submit"
  disabled={uploading}
  className="w-full sm:w-auto sm:ml-auto block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-60"
>
  {uploading ? `Uploading... ${progress}%` : "Upload Product"}
</button>

        </div>
      </form>
    </div>
  );
}
