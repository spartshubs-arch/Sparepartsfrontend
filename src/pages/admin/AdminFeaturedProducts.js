
import { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";

export default function AdminSliderManager() {
  const [sliders, setSliders] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fileRef = useRef(null);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await axios.get("/upload/sliders?type=slider", {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("adminToken")}` },
      });
      setSliders(res.data);
    } catch (err) {
      console.error("Failed to fetch sliders", err);
      alert("❌ Failed to fetch sliders: " + (err.response?.data?.message || err.message));
    }
  };

  const uploadToCloudinarySigned = async (file) => {
    const sigRes = await axios.get("/upload/cloudinary-signature?folder=home_slider", {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("adminToken")}` },
    });

    const { timestamp, signature, apiKey, cloudName, folder } = sigRes.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);

    const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

    const res = await axios.post(cloudUrl, formData, {
      onUploadProgress: (evt) => {
        const percent = Math.round((evt.loaded * 100) / evt.total);
        setProgress(percent);
      },
    });

    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // when adding: must select image
    if (!isUpdating && !imageFile) {
      alert("❌ Please select an image.");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      // Upload only if new image selected
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadToCloudinarySigned(imageFile);
      }

      const payload = {
        type: "slider",
        title,
        subtitle,
        ...(imageUrl ? { imageUrl } : {}), // only include if uploaded
      };

      if (isUpdating) {
        await axios.put(`/upload/slider/${isUpdating}`, payload, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("adminToken")}` },
        });
      } else {
        await axios.post("/upload/slider", payload, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("adminToken")}` },
        });
      }

      resetForm();
      fetchSliders();
    } catch (err) {
      console.error(err);
      alert("❌ Error: " + (err.response?.data?.message || err.message || "Something went wrong"));
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setImageFile(null);
    setIsUpdating(null);
    setProgress(0);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slider?")) return;
    try {
      await axios.delete(`/upload/slider/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("adminToken")}` },
      });
      fetchSliders();
    } catch (err) {
      console.error("Failed to delete slider", err);
      alert("❌ Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (slider) => {
    setTitle(slider.title || "");
    setSubtitle(slider.subtitle || "");
    setIsUpdating(slider._id);
    setImageFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Featured Products Of Home Page</h2>

      {sliders.length >= 8 && !isUpdating && (
        <div className="text-red-600 mb-4">
          ⚠️ Maximum 8 sliders allowed. Delete one to add new.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6 space-y-4 max-w-xl">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 text-sm text-gray-700 rounded">
          <strong>📏 Image Guidelines:</strong><br />
          Recommended size: <span className="font-semibold">970 × 750 px</span>.<br />
          JPG/PNG under 1MB for faster loading.
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="w-full border p-2 rounded"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={uploading || (sliders.length >= 8 && !isUpdating)}
        >
          {uploading ? "Uploading..." : isUpdating ? "Update Slider" : "Add Slider"}
        </button>

        {uploading && (
          <div className="text-sm mt-2">
            Uploading: {progress}%
            <div className="w-full bg-gray-200 rounded h-2 mt-2">
              <div className="bg-blue-600 h-2 rounded" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sliders.map((slider) => (
          <div key={slider._id} className="bg-white p-4 shadow rounded relative">
            <img
              src={slider.imageUrl}
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
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(slider._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
