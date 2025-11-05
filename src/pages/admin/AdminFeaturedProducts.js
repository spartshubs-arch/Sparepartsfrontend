import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AdminSliderManager() {
  const [sliders, setSliders] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
    const res = await axios.get("/upload/sliders?type=slider", {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
  }
});
setSliders(res.data);

    } catch (err) {
      console.error("Failed to fetch sliders", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    if (image) formData.append("image", image);
    formData.append("type", "slider");


    try {
      if (isUpdating) {
        await axios.put(`/upload/slider/${isUpdating}`, formData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
            "Content-Type": "multipart/form-data"
          }
        });
      } else {
        await axios.post("/upload/slider", formData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
            "Content-Type": "multipart/form-data"
          }
        });
      }
      resetForm();
      fetchSliders();
    } catch (err) {
      alert("❌ Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setImage(null);
    setIsUpdating(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slider?")) return;
    try {
      await axios.delete(`/upload/slider/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
        }
      });
      fetchSliders();
    } catch (err) {
      console.error("Failed to delete slider", err);
    }
  };

  const handleEdit = (slider) => {
    setTitle(slider.title);
    setSubtitle(slider.subtitle);
    setIsUpdating(slider._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Faetured Products OF Home Page</h2>

      {sliders.length >= 8 && !isUpdating && (
        <div className="text-red-600 mb-4">⚠️ Maximum 8 sliders allowed. Delete one to add new.</div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6 space-y-4 max-w-xl" encType="multipart/form-data">
        {/* 📌 Image Size Guideline */}
  <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 text-sm text-gray-700 rounded">
    <strong>📏 Image Guidelines:</strong><br />
    Recommended size: <span className="font-semibold">970 × 750 px</span> (landscape format).<br />
    Use high-quality JPG/PNG under 1MB for faster loading.Also wait when submit the file few sec.
  </div>

        <input
          type="file"
          accept="image/*"
          className="w-full border p-2 rounded"
          onChange={(e) => setImage(e.target.files[0])}
          required={!isUpdating} // required only on add
        />
        <input
          type="text"
          placeholder="Title (optional)"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subtitle (optional)"
          className="w-full border p-2 rounded"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={sliders.length >= 8 && !isUpdating}
        >
          {isUpdating ? "Update Slider" : "Add Slider"}
        </button>
        {isUpdating && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* Preview List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sliders.map(slider => (
          <div key={slider._id} className="bg-white p-4 shadow rounded relative">
           <img
  src={slider.imageUrl}  // ✅ This now uses the Cloudinary URL directly
  alt={slider.title}
  className="w-full h-64 object-cover rounded"
/>

            <div className="mt-2">
              <h3 className="text-lg font-bold">{slider.title}</h3>
              <p className="text-gray-600">{slider.subtitle}</p>
            </div>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(slider)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >Edit</button>
              <button
                onClick={() => handleDelete(slider._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
