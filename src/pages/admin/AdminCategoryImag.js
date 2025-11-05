import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AdminCategoryBanner() {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("/upload/sliders?type=category", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
        }
      });
      setBanners(res.data);
    } catch (err) {
      console.error("Failed to fetch category banners", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("type", "category");
    formData.append("title", title);
    formData.append("subtitle", subtitle);

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
      fetchBanners();
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
    if (!window.confirm("Delete this category banner?")) return;
    try {
      await axios.delete(`/upload/slider/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
        }
      });
      fetchBanners();
    } catch (err) {
      console.error("Failed to delete banner", err);
    }
  };

  const handleEdit = (banner) => {
    setTitle(banner.title);
    setSubtitle(banner.subtitle);
    setIsUpdating(banner._id);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Category Banners</h2>

      {banners.length >= 10 && !isUpdating && (
        <div className="text-red-600 mb-4">⚠️ Maximum 10 category banners allowed. Delete one to add new.</div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6 space-y-4 max-w-xl" encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          className="w-full border p-2 rounded"
          onChange={(e) => setImage(e.target.files[0])}
          required={!isUpdating}
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
          disabled={banners.length >= 10 && !isUpdating}
        >
          {isUpdating ? "Update Banner" : "Add Category Banner"}
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

      {/* Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map(banner => (
          <div key={banner._id} className="bg-white p-4 shadow rounded relative">
            <img
              src={`http://localhost:5000${banner.imageUrl}`}
              alt="Category Banner"
              className="w-full h-64 object-cover rounded"
            />
            <div className="mt-2">
              <h3 className="text-lg font-bold">{banner.title}</h3>
              <p className="text-gray-600">{banner.subtitle}</p>
            </div>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(banner)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >Edit</button>
              <button
                onClick={() => handleDelete(banner._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
