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
    condition: "new"
    
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
  const { name, value } = e.target;

  // Fields that should only contain numbers
  const numericFields = ["price", "salePrice", "stock", "unit"];
  if (numericFields.includes(name) && value && !/^\d+$/.test(value)) {
    return;
  }

  // Fields that should only contain letters
  const textOnlyFields = ["make","model", "carParts", "brand", "side"];
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const vendor = JSON.parse(sessionStorage.getItem("vendorInfo"));
  //   if (!vendor?.id) {
  //     alert("Vendor not logged in");
  //     return;
  //   }

  //   const data = new FormData();
  //   for (const key in formData) {
  //     data.append(key, formData[key]);
  //   }

  //   data.append("vendorId", vendor.id); // Attach vendor ID

  //   images.forEach((file) => data.append("images", file));

  //   try {
  //     const res = await axios.post("/products/add", data);
  //     alert("✅ Product added!");
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error(err);
  //     alert("❌ Upload failed.");
  //   }
  // };



  const handleSubmit = async (e) => {
  e.preventDefault();

  const vendor = JSON.parse(sessionStorage.getItem("vendorInfo"));
  const vendorId = vendor?._id || vendor?.id;

  if (!vendorId) {
    alert("Vendor not logged in");
    return;
  }

  const data = new FormData();
  for (const key in formData) {
    data.append(key, formData[key]);
  }

  data.append("vendorId", vendorId); // ✅ Correct vendor id
  images.forEach((file) => data.append("images", file));

  try {
    const res = await axios.post("/products/add", data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("vendorToken")}`, // ✅ include token too
      },
    });
    alert("✅ Product added!");
    console.log(res.data);
  } catch (err) {
    console.error(err);
    alert("❌ Upload failed.");
  }
};

const handleImageDelete = (indexToRemove) => {
  const updatedImages = images.filter((_, index) => index !== indexToRemove);
  setImages(updatedImages);
};

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* {Object.keys(formData).map((field) => (
          <div key={field} className="flex flex-col">
            <label className="capitalize">{field}</label>
            <input
              type={
                ["price", "salePrice", "stock", "unit"].includes(field)
                  ? "number"
                  : "text"
              }
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>
        ))} */}


        {Object.keys(formData)
  .filter((field) => field !== "condition") 
  .map((field) => (
    <div key={field} className="flex flex-col">
      <label className="capitalize">{field}</label>
      <input
        type={
          ["price", "salePrice", "stock", "unit"].includes(field)
            ? "number"
            : "text"
        }
        name={field}
        value={formData[field]}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
    </div>
))}

<div className="flex flex-col">
  <label>Year</label>
  <input
    type="number"
    name="year"
    value={formData.year}
    onChange={handleChange}
    min="1900"
    max={new Date().getFullYear() + 1}
    className="border p-2 rounded"
    required
  />
</div>

<div className="border p-2 rounded flex flex-col gap-1 w-64">
  <label className="font-medium text-sm">Condition</label>
  <select
    name="condition"
    value={formData.condition}
    onChange={handleChange}
    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="">Select Condition</option>
    <option value="new">New</option>
    <option value="used">Used</option>
  </select>
</div>


        <div className="col-span-2">
          <label>Product Images (multiple upto 5):</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block mt-1"
            required
          />

          {/* Show selected image names and count */}
          {images.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              <strong>{images.length}</strong> image(s) selected:
            <ul className="mt-1 space-y-1">
  {images.map((file, index) => (
    <li
      key={index}
      className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded"
    >
      <span className="truncate">{file.name}</span>
      <button
        type="button"
        onClick={() => handleImageDelete(index)}
        className="text-red-600 text-sm hover:underline ml-4"
      >
        🗑️ Remove
      </button>
    </li>
  ))}
</ul>

            </div>
          )}
        </div>

        <div className="col-span-2 text-right">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Upload Product
          </button>
        </div>
      </form>
    </div>
  );
}
