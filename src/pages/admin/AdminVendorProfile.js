import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function AdminVendorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await axios.get(`/admin/vendor/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
          },
        });
        setVendor(res.data);
      } catch (err) {
        console.error("Failed to load vendor profile", err);
      }
    };
    fetchVendor();
  }, [id]);

  if (!vendor) return <div className="p-6">Loading profile...</div>;

  // ✅ Helper: check if file is image or document
  const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  const isPDF = (url) => /\.pdf$/i.test(url);

  // ✅ Helper: render file preview
  const renderFile = (fileUrl, label) => {
    if (!fileUrl) return null;

    return (
      <div className="flex flex-col items-center">
        <p className="font-medium mb-2">{label}</p>

        {isImage(fileUrl) ? (
          <img
            src={fileUrl}
            alt={label}
            className="w-40 h-40 object-cover rounded shadow cursor-pointer hover:scale-105 transition"
            onClick={() => setSelectedFile(fileUrl)}
          />
        ) : isPDF(fileUrl) ? (
          <div
            onClick={() => window.open(fileUrl, "_blank")}
            className="w-40 h-40 flex flex-col items-center justify-center bg-gray-200 rounded shadow cursor-pointer hover:bg-gray-300 transition"
          >
            <span className="text-4xl">📄</span>
            <span className="text-sm mt-2">Open PDF</span>
          </div>
        ) : (
          <div
            onClick={() => window.open(fileUrl, "_blank")}
            className="w-40 h-40 flex flex-col items-center justify-center bg-gray-200 rounded shadow cursor-pointer hover:bg-gray-300 transition"
          >
            <span className="text-4xl">📁</span>
            <span className="text-sm mt-2">View File</span>
          </div>
        )}

        {/* ✅ Download button */}
        <a
          href={fileUrl}
          download
          className="mt-2 text-blue-600 text-sm hover:underline"
        >
          ⬇ Download
        </a>
      </div>
    );
  };

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Vendor Profile</h2>

      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {vendor.firstName} {vendor.lastName}
        </p>
        <p>
          <strong>Trade Name:</strong> {vendor.tradeName}
        </p>
        <p>
          <strong>License Number:</strong> {vendor.licenseNumber}
        </p>
        <p>
          <strong>TRN Number:</strong> {vendor.trnNumber}
        </p>
        <p>
          <strong>Business Type:</strong> {vendor.businessType}
        </p>
        <p>
          <strong>Vendor ID:</strong> {vendor.idNumber}
        </p>
        <p>
          <strong>Contact:</strong> {vendor.contact}
        </p>
        <p>
          <strong>Address:</strong> {vendor.address}, {vendor.city},{" "}
          {vendor.area}
        </p>
      </div>

      {/* ✅ File Thumbnails / Previews */}
      <div className="flex flex-wrap gap-6 mt-6">
        {renderFile(vendor.idCardImage, "ID Card")}
        {renderFile(vendor.licenseImage, "License")}
        {renderFile(vendor.passportImage, "Passport")}
      </div>

      {/* ✅ Fullscreen Image Viewer */}
      {selectedFile && isImage(selectedFile) && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setSelectedFile(null)}
            >
              ✖
            </button>
            <img
              src={selectedFile}
              alt="Preview"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
