import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get("/contact/messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
  if (!window.confirm("Are you sure you want to delete this message?")) return;
  try {
    const token = sessionStorage.getItem("token");
    await axios.delete(`/contact/messages/${id}`, {  // <-- fixed path
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
  } catch (err) {
    console.error("Error deleting message:", err);
  }
};

  useEffect(() => {
    fetchMessages();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading messages...</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📩 Contact Messages</h1>

      {messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Subject</th>
                <th className="px-4 py-2 border">Message</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr
                  key={msg._id}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 border">{msg.name}</td>
                  <td className="px-4 py-2 border">{msg.email}</td>
                  <td className="px-4 py-2 border">{msg.phone}</td>
                  <td className="px-4 py-2 border">{msg.subject}</td>
                  <td className="px-4 py-2 border">{msg.message}</td>
                  <td className="px-4 py-2 border">{new Date(msg.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
