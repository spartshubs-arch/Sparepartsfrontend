import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const AdminHelpCenter = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requestCallback: "",
    contactUs: "",
    quickTip: "",
  });

  useEffect(() => {
    // Load existing content
    const fetchContent = async () => {
      try {
        const res = await axios.get("/helpcenter");
        if (res.data) setFormData(res.data);
      } catch (err) {
        console.error("Error loading help center:", err);
      }
    };
    fetchContent();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/helpcenter/update", formData);
      alert("✅ Help Center updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update Help Center");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Admin: Manage Help Center</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          <textarea
            name="requestCallback"
            placeholder="Request Callback Instructions"
            value={formData.requestCallback}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          <textarea
            name="contactUs"
            placeholder="Contact Us Info"
            value={formData.contactUs}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          <textarea
            name="quickTip"
            placeholder="Quick Tip"
            value={formData.quickTip}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminHelpCenter;
