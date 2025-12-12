import React, { useEffect, useState } from "react";
import { Plus, Minus } from "lucide-react";
import axios from "../../api/axios";

export default function AboutUs() {
  const [data, setData] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  useEffect(() => {
    axios.get("/about-us").then((res) => setData(res.data.data));
  }, []);

  if (!data) return <p className="text-center py-10">Loading...</p>;

  return (
<div className="px-4 md:px-16 pt-36 sm:pt-28 lg:pt-32 pb-16 bg-gray-50">
      {/* Top Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-center">
        {data.topIcons.map((item, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="text-4xl mb-2">{item.icon}</div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {data.cards.map((card, i) => (
          <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
            <img src={card.imageUrl} alt={card.title} className="rounded mb-4 w-full h-48 object-cover" />
            <h4 className="font-bold text-lg mb-2">{card.title}</h4>
            <p className="text-gray-600 text-sm">{card.description}</p>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4 border-b pb-2 text-center">What Can We Do For You?</h2>
        <div className="space-y-3">
          {data.faqs.map((faq, index) => (
            <div key={index} className="border rounded overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 bg-red-600 text-white font-semibold"
              >
                {faq.question}
                {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 text-sm text-gray-700 bg-gray-50">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
