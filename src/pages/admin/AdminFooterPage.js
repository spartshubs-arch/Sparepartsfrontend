import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const AdminFooterPage = () => {
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      const res = await axios.get("/footer");
      setFooter(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (section, field, value) => {
    setFooter((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put("/footer", footer, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("adminToken")}` },
      });
      alert("✅ Footer updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating footer!");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Manage Footer</h2>

      {/* About */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <input
          type="text"
          value={footer.about.title}
          onChange={(e) => handleChange("about", "title", e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Website Title"
        />
        <textarea
          value={footer.about.description}
          onChange={(e) => handleChange("about", "description", e.target.value)}
          className="border p-2 w-full"
          placeholder="Description"
        />
      </div>

      {/* Contact */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
        {["address", "email", "phone", "workingHours"].map((field) => (
          <input
            key={field}
            type="text"
            value={footer.contact[field]}
            onChange={(e) => handleChange("contact", field, e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder={field}
          />
        ))}
      </div>

      {/* Social Links */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Social Links</h3>
        {footer.socialLinks.map((social, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              type="text"
              value={social.platform}
              onChange={(e) => {
                const updated = [...footer.socialLinks];
                updated[i].platform = e.target.value;
                setFooter({ ...footer, socialLinks: updated });
              }}
              className="border p-2 flex-1"
              placeholder="Platform (facebook)"
            />
            <input
              type="text"
              value={social.url}
              onChange={(e) => {
                const updated = [...footer.socialLinks];
                updated[i].url = e.target.value;
                setFooter({ ...footer, socialLinks: updated });
              }}
              className="border p-2 flex-1"
              placeholder="URL"
            />
          </div>
        ))}
        <button
          onClick={() =>
            setFooter({
              ...footer,
              socialLinks: [...footer.socialLinks, { platform: "", url: "" }],
            })
          }
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          + Add Social Link
        </button>
      </div>
{/* People Also Search For */}
<div className="mb-6">
  <h3 className="text-lg font-semibold mb-2">People Also Search For</h3>
  {footer.peopleAlsoSearchFor?.map((item, i) => (
    <div key={i} className="flex gap-2 mb-2">
      <input
        type="text"
        value={item}
        onChange={(e) => {
          const updated = [...footer.peopleAlsoSearchFor];
          updated[i] = e.target.value;
          setFooter({ ...footer, peopleAlsoSearchFor: updated });
        }}
        className="border p-2 flex-1"
        placeholder="Search term"
      />
      <button
        onClick={() => {
          const updated = footer.peopleAlsoSearchFor.filter((_, idx) => idx !== i);
          setFooter({ ...footer, peopleAlsoSearchFor: updated });
        }}
        className="bg-red-500 text-white px-2 rounded"
      >
        ✕
      </button>
    </div>
  ))}
  <button
    onClick={() =>
      setFooter({
        ...footer,
        peopleAlsoSearchFor: [...(footer.peopleAlsoSearchFor || []), ""],
      })
    }
    className="bg-green-500 text-white px-3 py-1 rounded"
  >
    + Add Search Item
  </button>
</div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Save Footer
      </button>
    </div>
  );
};

export default AdminFooterPage;
