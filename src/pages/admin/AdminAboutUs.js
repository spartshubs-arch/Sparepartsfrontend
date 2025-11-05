// import React, { useState, useEffect } from "react";
// import axios from "../../api/axios";

// export default function AdminAboutUs() {
//   const [form, setForm] = useState({
//     topIcons: [],
//     cards: [],
//     faqs: [],
//   });
//   const [cardImages, setCardImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch About Us data from backend
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("/about-us");
//       if (res.data.success && res.data.data) {
//         setForm(res.data.data);
//       }
//     } catch (err) {
//       console.error("Error fetching About Us:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle adding a new top icon
//   const addTopIcon = () => {
//     setForm({
//       ...form,
//       topIcons: [...form.topIcons, { title: "", icon: "", description: "" }],
//     });
//   };

//   // Handle adding a new card
//   const addCard = () => {
//     setForm({
//       ...form,
//       cards: [...form.cards, { title: "", description: "", imageUrl: "" }],
//     });
//     setCardImages([...cardImages, null]);
//   };

//   // Handle adding a new FAQ
//   const addFaq = () => {
//     setForm({
//       ...form,
//       faqs: [...form.faqs, { question: "", answer: "" }],
//     });
//   };

//   // Handle card image change
//   const handleImageChange = (e, index) => {
//     const files = [...cardImages];
//     files[index] = e.target.files[0];
//     setCardImages(files);
//   };

//   // Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = sessionStorage.getItem("token");
//     const fd = new FormData();
//     fd.append("topIcons", JSON.stringify(form.topIcons));
//     fd.append("cards", JSON.stringify(form.cards));
//     fd.append("faqs", JSON.stringify(form.faqs));
//     cardImages.forEach((file) => file && fd.append("cardImages", file));

//     try {
//       await axios.put("/about-us", fd, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("About Us updated successfully");
//       fetchData();
//     } catch (err) {
//       console.error("Error updating About Us:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Manage About Us</h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* --- TOP ICONS --- */}
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Top Icons</h2>
//             {form.topIcons.map((icon, i) => (
//               <div key={i} className="border p-3 mb-2">
//                 <input
//                   type="text"
//                   value={icon.title}
//                   onChange={(e) => {
//                     const updated = [...form.topIcons];
//                     updated[i].title = e.target.value;
//                     setForm({ ...form, topIcons: updated });
//                   }}
//                   placeholder="Title"
//                   className="border p-2 w-full mb-2"
//                 />
//                 <input
//                   type="text"
//                   value={icon.icon}
//                   onChange={(e) => {
//                     const updated = [...form.topIcons];
//                     updated[i].icon = e.target.value;
//                     setForm({ ...form, topIcons: updated });
//                   }}
//                   placeholder="Icon class or emoji"
//                   className="border p-2 w-full mb-2"
//                 />
//                 <textarea
//                   value={icon.description}
//                   onChange={(e) => {
//                     const updated = [...form.topIcons];
//                     updated[i].description = e.target.value;
//                     setForm({ ...form, topIcons: updated });
//                   }}
//                   placeholder="Description"
//                   className="border p-2 w-full"
//                 />
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addTopIcon}
//               className="bg-green-500 text-white px-4 py-1 rounded"
//             >
//               + Add Top Icon
//             </button>
//           </div>

//           {/* --- CARDS --- */}
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Cards</h2>
//             {form.cards.map((card, i) => (
//               <div key={i} className="border p-3 mb-2">
//                 <input
//                   type="text"
//                   value={card.title}
//                   onChange={(e) => {
//                     const updated = [...form.cards];
//                     updated[i].title = e.target.value;
//                     setForm({ ...form, cards: updated });
//                   }}
//                   placeholder="Card title"
//                   className="border p-2 w-full mb-2"
//                 />
//                 <textarea
//                   value={card.description}
//                   onChange={(e) => {
//                     const updated = [...form.cards];
//                     updated[i].description = e.target.value;
//                     setForm({ ...form, cards: updated });
//                   }}
//                   placeholder="Card description"
//                   className="border p-2 w-full mb-2"
//                 />
//                 <input
//                   type="file"
//                   onChange={(e) => handleImageChange(e, i)}
//                 />
//                 {card.imageUrl && (
//                   <img
//                     src={card.imageUrl}
//                     alt="Card"
//                     className="mt-2 w-32 h-32 object-cover border"
//                   />
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addCard}
//               className="bg-green-500 text-white px-4 py-1 rounded"
//             >
//               + Add Card
//             </button>
//           </div>

//           {/* --- FAQ --- */}
//           <div>
//             <h2 className="text-xl font-semibold mb-2">FAQs</h2>
//             {form.faqs.map((faq, i) => (
//               <div key={i} className="border p-3 mb-2">
//                 <input
//                   type="text"
//                   value={faq.question}
//                   onChange={(e) => {
//                     const updated = [...form.faqs];
//                     updated[i].question = e.target.value;
//                     setForm({ ...form, faqs: updated });
//                   }}
//                   placeholder="Question"
//                   className="border p-2 w-full mb-2"
//                 />
//                 <textarea
//                   value={faq.answer}
//                   onChange={(e) => {
//                     const updated = [...form.faqs];
//                     updated[i].answer = e.target.value;
//                     setForm({ ...form, faqs: updated });
//                   }}
//                   placeholder="Answer"
//                   className="border p-2 w-full"
//                 />
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addFaq}
//               className="bg-green-500 text-white px-4 py-1 rounded"
//             >
//               + Add FAQ
//             </button>
//           </div>

//           {/* --- SAVE BUTTON --- */}
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             type="submit"
//           >
//             Save Changes
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

export default function AdminAboutUs() {
  const [form, setForm] = useState({
    topIcons: [],
    cards: [],
    faqs: [],
  });
  const [cardImages, setCardImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch About Us data
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/about-us");
      if (res.data.success && res.data.data) {
        setForm(res.data.data);
        setCardImages(new Array(res.data.data.cards.length).fill(null));
      }
    } catch (err) {
      console.error("Error fetching About Us:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add functions
  const addTopIcon = () =>
    setForm({
      ...form,
      topIcons: [...form.topIcons, { title: "", icon: "", description: "" }],
    });

  const addCard = () => {
    setForm({
      ...form,
      cards: [...form.cards, { title: "", description: "", imageUrl: "" }],
    });
    setCardImages([...cardImages, null]);
  };

  const addFaq = () =>
    setForm({
      ...form,
      faqs: [...form.faqs, { question: "", answer: "" }],
    });

  // Delete functions
  const deleteTopIcon = (index) => {
    const updated = [...form.topIcons];
    updated.splice(index, 1);
    setForm({ ...form, topIcons: updated });
  };

  const deleteCard = (index) => {
    const updatedCards = [...form.cards];
    const updatedImages = [...cardImages];
    updatedCards.splice(index, 1);
    updatedImages.splice(index, 1);
    setForm({ ...form, cards: updatedCards });
    setCardImages(updatedImages);
  };

  const deleteFaq = (index) => {
    const updated = [...form.faqs];
    updated.splice(index, 1);
    setForm({ ...form, faqs: updated });
  };

  // Image change
  const handleImageChange = (e, index) => {
    const files = [...cardImages];
    files[index] = e.target.files[0];
    setCardImages(files);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const fd = new FormData();
    fd.append("topIcons", JSON.stringify(form.topIcons));
    fd.append("cards", JSON.stringify(form.cards));
    fd.append("faqs", JSON.stringify(form.faqs));
    cardImages.forEach((file) => file && fd.append("cardImages", file));

    try {
      await axios.put("/about-us", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("About Us updated successfully");
      fetchData();
    } catch (err) {
      console.error("Error updating About Us:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage About Us</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* --- TOP ICONS --- */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Top Icons</h2>
            {form.topIcons.map((icon, i) => (
              <div key={i} className="border p-3 mb-2 relative">
                <button
                  type="button"
                  onClick={() => deleteTopIcon(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  ✕
                </button>
                <input
                  type="text"
                  value={icon.title}
                  onChange={(e) => {
                    const updated = [...form.topIcons];
                    updated[i].title = e.target.value;
                    setForm({ ...form, topIcons: updated });
                  }}
                  placeholder="Title"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="text"
                  value={icon.icon}
                  onChange={(e) => {
                    const updated = [...form.topIcons];
                    updated[i].icon = e.target.value;
                    setForm({ ...form, topIcons: updated });
                  }}
                  placeholder="Icon class or emoji"
                  className="border p-2 w-full mb-2"
                />
                <textarea
                  value={icon.description}
                  onChange={(e) => {
                    const updated = [...form.topIcons];
                    updated[i].description = e.target.value;
                    setForm({ ...form, topIcons: updated });
                  }}
                  placeholder="Description"
                  className="border p-2 w-full"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addTopIcon}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              + Add Top Icon
            </button>
          </div>

          {/* --- CARDS --- */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Cards</h2>

            {/* Upload Guidelines */}
  <div className="text-sm text-gray-700 bg-yellow-50 border border-yellow-200 p-3 rounded mb-4">
    <strong>Image Upload Guidelines:</strong>
    <ul className="list-disc pl-5 mt-1 space-y-1">
      <li>📐 Recommended size: <b>500 × 350 px</b></li>
      <li>🖼 Allowed formats: <b>JPG, JPEG, PNG</b></li>
      <li>📦 Max file size: <b>5MB</b> (recommended) Also wait when submit is done few sec its rendering...</li>
    </ul>
  </div>
            {form.cards.map((card, i) => (
              <div key={i} className="border p-3 mb-2 relative">
                <button
                  type="button"
                  onClick={() => deleteCard(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  ✕
                </button>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => {
                    const updated = [...form.cards];
                    updated[i].title = e.target.value;
                    setForm({ ...form, cards: updated });
                  }}
                  placeholder="Card title"
                  className="border p-2 w-full mb-2"
                />
                <textarea
                  value={card.description}
                  onChange={(e) => {
                    const updated = [...form.cards];
                    updated[i].description = e.target.value;
                    setForm({ ...form, cards: updated });
                  }}
                  placeholder="Card description"
                  className="border p-2 w-full mb-2"
                />
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, i)}
                />
                {card.imageUrl && (
                  <img
                    src={card.imageUrl}
                    alt="Card"
                    className="mt-2 w-32 h-32 object-cover border"
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCard}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              + Add Card
            </button>
          </div>

          {/* --- FAQ --- */}
          <div>
            <h2 className="text-xl font-semibold mb-2">FAQs</h2>
            {form.faqs.map((faq, i) => (
              <div key={i} className="border p-3 mb-2 relative">
                <button
                  type="button"
                  onClick={() => deleteFaq(i)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  ✕
                </button>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => {
                    const updated = [...form.faqs];
                    updated[i].question = e.target.value;
                    setForm({ ...form, faqs: updated });
                  }}
                  placeholder="Question"
                  className="border p-2 w-full mb-2"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...form.faqs];
                    updated[i].answer = e.target.value;
                    setForm({ ...form, faqs: updated });
                  }}
                  placeholder="Answer"
                  className="border p-2 w-full"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addFaq}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              + Add FAQ
            </button>
          </div>

          {/* --- SAVE BUTTON --- */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}
