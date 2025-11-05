// import React, { useState } from 'react';
// import { Plus, Minus } from 'lucide-react';
// import pic from '../../assets/bannerhome.jpg';

// const faqs = [
//   {
//     question: "Fast Free Delivery",
//     answer:
//       "Nam liber tempor cum soluta nobis eleifend option. Congue nihil imperdiet doming id quod mazim placerat facer possim assum...",
//   },
//   {
//     question: "More Than 30 Years In The Business",
//     answer: "We have over 30 years of experience delivering excellence and innovation in our industry.",
//   },
//   {
//     question: "100% Organic Foods",
//     answer: "All our products are certified organic and ethically sourced for your health and the planet.",
//   },
//   {
//     question: "Best Shopping Strategies",
//     answer: "We ensure customer satisfaction by offering top-tier service and seamless shopping experiences.",
//   },
// ];

// const AboutUs = () => {
//   const [openIndex, setOpenIndex] = useState(0);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="px-4 md:px-16 py-10 bg-white">
//       {/* Top Icons Section */}
//       <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-6 mb-12">
//         {[
//           { title: "Creative Design", icon: "🎨" },
//           { title: "100% Money Back Guarantee", icon: "💰" },
//           { title: "Online Support 24/7", icon: "📞" },
//         ].map((item, i) => (
//           <div key={i}>
//             <div className="text-4xl mb-2">{item.icon}</div>
//             <h3 className="text-lg font-semibold">{item.title}</h3>
//             <p className="text-gray-600 text-sm mt-2">
//               Erat metus sodales eget dolor consectetur, porta ut purus at et alias, nulla ornare velit amet
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Three Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//         <div className="bg-white shadow-md p-4">
//           <img src={pic} alt="What We Do" className="mb-4" />
//           <h4 className="font-bold text-lg mb-2">What Do We Do?</h4>
//           <p className="text-gray-600 text-sm">
//             Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...
//           </p>
//         </div>
//         <div className="bg-white shadow-md p-4">
//           <img src={pic} alt="Our Mission" className="mb-4" />
//           <h4 className="font-bold text-lg mb-2">Our Mission</h4>
//           <p className="text-gray-600 text-sm">
//             Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...
//           </p>
//         </div>
//         <div className="bg-white shadow-md p-4">
//           <img src={pic} alt="History" className="mb-4" />
//           <h4 className="font-bold text-lg mb-2">History Of Us</h4>
//           <p className="text-gray-600 text-sm">
//             Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...
//           </p>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-xl font-bold mb-4 border-b pb-2">What Can We Do For You?</h2>
//           <div className="space-y-3">
//             {faqs.map((item, index) => (
//               <div key={index} className="border rounded">
//                 <button
//                   onClick={() => toggleFAQ(index)}
//                   className="w-full flex justify-between items-center px-4 py-3 bg-red-600 text-white font-semibold"
//                 >
//                   {item.question}
//                   {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
//                 </button>
//                 {openIndex === index && (
//                   <div className="px-4 py-3 text-sm text-gray-700 bg-gray-50">{item.answer}</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Empty second column (leave for testimonials if needed later) */}
//         <div></div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;






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
    <div className="px-4 md:px-16 py-10 bg-gray-50">
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
