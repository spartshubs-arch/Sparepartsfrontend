import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await axios.get("/faqs");
      setFaqs(res.data);
    } catch (err) {
      console.error("Failed to fetch FAQs", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.question || !form.answer) {
      alert("Fill both fields");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`/faqs/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("/faqs", form);
      }
      setForm({ question: "", answer: "" });
      fetchFaqs();
    } catch (err) {
      console.error("Save error", err);
      alert("Error saving");
    }
  };

  const handleEdit = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditingId(faq._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    try {
      await axios.delete(`/faqs/${id}`);
      fetchFaqs();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin FAQ Control</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Question"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Answer"
          rows="4"
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
        ></textarea>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update FAQ" : "Add FAQ"}
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Question</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq._id}>
              <td className="border p-2">{faq.question}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(faq)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(faq._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
