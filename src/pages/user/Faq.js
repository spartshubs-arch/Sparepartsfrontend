import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    axios.get("/faqs")
      .then(res => {
        setFaqs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch FAQs", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-orange-600">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={faq._id} className="border rounded shadow-sm">
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full text-left p-4 flex justify-between items-center focus:outline-none"
            >
              <span className="font-semibold text-gray-800">{faq.question}</span>
              <span>{activeIndex === idx ? "-" : "+"}</span>
            </button>
            {activeIndex === idx && (
              <div className="p-4 border-t bg-gray-50 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
