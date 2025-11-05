// import React from "react";
// import banner from  '../../assets/bannerhome.jpg'
// export default function ContactPage() {
//   return (
//     <div className="w-full">
//       {/* Top Banner */}
//       <div
//         className="relative bg-cover bg-center h-[300px] flex items-center justify-center text-white"
//        style={{ backgroundImage: `url(${banner})` }}
//       >
//         <div className="text-center">
//           <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
//           <p className="text-sm text-orange-500">
//             <span className="text-white">Home</span> / Contact
//           </p>
//         </div>
//       </div>

//       {/* Contact Info & Form */}
//       <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Left: Contact Info Box with Image and Overlay */}
//         <div
//           className="relative bg-black rounded shadow overflow-hidden"
//           style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
//         >
//           <div className="bg-black bg-opacity-80 p-6 text-white h-full">
//             <h2 className="text-xl font-bold mb-4">Contact Detail</h2>
//             <p className="text-sm mb-4">
//               Lorem elit ornare diam nulla rhoncus curae. Faucibus senectus sapien maximus a molestie.
//             </p>

//             <div className="mb-4">
//               <h4 className="font-bold">Our Office</h4>
//               <p className="text-sm">Jl. Cempaka Wangi No 22<br />Jakarta – Indonesia</p>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-bold">Phone</h4>
//               <p className="text-sm">+622120022012<br />+622120022021</p>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-bold">Email</h4>
//               <p className="text-sm">hello@yourdomain.tld<br />support@yourdomain.tld</p>
//             </div>

//             <div className="mt-6">
//               <h4 className="font-bold mb-2">Follow our social media :</h4>
//               <div className="flex gap-3">
//                 <a href="https://www.facebook.com/abdullah.malik.848102" className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white text-sm font-bold">f</a>
//                 <a href="https://www.instagram.com/abdullah_malik_.03/?hl=en" className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white text-sm font-bold">i</a>
//                 <a href="https://x.com/malik_abduallah" className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white text-sm font-bold">t</a>
              
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right: Contact Form */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-xl font-bold mb-2">Message us, we will be in touch shortly</h2>
//           <p className="text-sm text-gray-600 mb-6">
//             Trincidunt accumsan nunc netus volutpat pretium cubilia. Tristique ridiculus erat et neque pharetra urna metus amet parturient porta.
//           </p>

//           <form className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input type="text" placeholder="Name" className="border px-4 py-2 rounded w-full" />
//               <input type="text" placeholder="Phone" className="border px-4 py-2 rounded w-full" />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input type="email" placeholder="Email" className="border px-4 py-2 rounded w-full" />
//               <input type="text" placeholder="Subject" className="border px-4 py-2 rounded w-full" />
//             </div>
//             <textarea placeholder="Message" rows="5" className="border px-4 py-2 rounded w-full"></textarea>
//             <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold">
//               <i className="fas fa-paper-plane mr-2"></i> Send Message
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Bottom: Embedded Google Map */}
//       <div className="w-full h-[400px]">
//         <iframe
//           title="Map"
//           className="w-full h-full border-0"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.699346596895!2d73.08771967401225!3d33.56118704350278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfecd312097875%3A0x4057399822bc2d29!2sJoyland!5e0!3m2!1sen!2s!4v1753741063493!5m2!1sen!2s" 
//           allowFullScreen=""
//           loading="lazy"
//         ></iframe>
//       </div>
//     </div>
//   );
// }








// import React, { useEffect, useState } from "react";
// import axios from "../../api/axios"; 
// export default function ContactPage() {
//   const [contactData, setContactData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // form state
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//   axios.get('/contact')
//     .then((res) => {
//       // Axios gives JSON directly in res.data
//       const payload = res.data;
//       // Support multiple shapes from backend
//       const data = payload?.data ?? payload?.contactInfo ?? payload;
//       setContactData(data);
//     })
//     .catch((err) => {
//       console.error("Error fetching contact page data:", err);
//     })
//     .finally(() => setLoading(false));
// }, []);


//   if (loading) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center text-gray-500">
//         Loading Contact Page...
//       </div>
//     );
//   }

//   // In case admin hasn't set anything yet, provide safe defaults
//   const cd = contactData ?? {};
//   const bannerImage = cd.bannerImage ?? "";
//   const contactInfoBackground = cd.contactInfoBackground ?? "";
//   const description = cd.description ?? "";
//   const address = cd.address ?? "";
//   const phones = Array.isArray(cd.phones) ? cd.phones : (cd.phones ? [cd.phones] : []);
//   const emails = Array.isArray(cd.emails) ? cd.emails : (cd.emails ? [cd.emails] : []);
//   const socials = Array.isArray(cd.socials) ? cd.socials : [];
//   const formDescription = cd.formDescription ?? "";
//   const mapEmbedUrl = cd.mapEmbedUrl ?? "";

//   // handle contact form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((s) => ({ ...s, [name]: value }));
//   };

//   // submit message to backend endpoint
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // basic validation
//     if (!form.name || !form.email || !form.message) {
//       alert("Please fill Name, Email and Message.");
//       return;
//     }

//  setSubmitting(true);
// try {
//   // Use axios.post instead of axios.get with method override
//   const res = await axios.post("/contact/message", form, {
//     headers: { "Content-Type": "application/json" }
//   });

//   const json = res.data; // No res.json() in Axios
//   if (json?.success) {
//     alert("Message sent. We'll be in touch shortly.");
//     setForm({ name: "", phone: "", email: "", subject: "", message: "" });
//   } else {
//     console.error("Server error:", json);
//     alert("Failed to send message. Please try again later.");
//   }
// } catch (err) {
//   console.error("Submit error:", err);
//   alert("Error sending message. Check console for details.");
// } finally {
//   setSubmitting(false);
// }

//   };

//   return (
//     <div className="w-full">
//       {/* Top Banner */}
//       <div
//         className="relative bg-cover bg-center h-[300px] flex items-center justify-center text-white"
//         style={{ backgroundImage: `url(${bannerImage})` }}
//       >
//         <div className="text-center">
//           <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
//           <p className="text-sm text-orange-500">
//             <span className="text-white">Home</span> / Contact
//           </p>
//         </div>
//       </div>

//       {/* Contact Info & Form */}
//       <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Left: Contact Info */}
//         <div
//           className="relative bg-black rounded shadow overflow-hidden"
//           style={{
//             backgroundImage: `url(${contactInfoBackground})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="bg-black bg-opacity-80 p-6 text-white h-full">
//             <h2 className="text-xl font-bold mb-4">Contact Detail</h2>
//             <p className="text-sm mb-4">{description}</p>

//             <div className="mb-4">
//               <h4 className="font-bold">Our Office</h4>
//               <p className="text-sm">{address}</p>
//             </div>

//             <div className="mb-4">
//               <h4 className="font-bold">Phone</h4>
//               {phones.length > 0 ? (
//                 phones.map((phone, idx) => (
//                   <p key={idx} className="text-sm">
//                     {phone}
//                   </p>
//                 ))
//               ) : (
//                 <p className="text-sm">Not available</p>
//               )}
//             </div>

//             <div className="mb-4">
//               <h4 className="font-bold">Email</h4>
//               {emails.length > 0 ? (
//                 emails.map((email, idx) => (
//                   <p key={idx} className="text-sm">
//                     {email}
//                   </p>
//                 ))
//               ) : (
//                 <p className="text-sm">Not available</p>
//               )}
//             </div>

//             <div className="mt-6">
//               <h4 className="font-bold mb-2">Follow our social media :</h4>
//               <div className="flex gap-3">
//                 {socials.length > 0 ? (
//                   socials.map((social, idx) => (
//                     <a
//                       key={idx}
//                       href={social.link || "#"}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white text-sm font-bold"
//                     >
//                       {/* admin provides icon text (e.g., 'f', 'i', 't') or emoji */}
//                       {social.icon || social.name?.charAt(0)?.toUpperCase() || "S"}
//                     </a>
//                   ))
//                 ) : (
//                   <>
//                     <div className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white text-sm font-bold">f</div>
//                     <div className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white text-sm font-bold">i</div>
//                     <div className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white text-sm font-bold">t</div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right: Contact Form */}
//         <div className="bg-white p-6 rounded shadow">
//           <h2 className="text-xl font-bold mb-2">Message us, we will be in touch shortly</h2>
//           <p className="text-sm text-gray-600 mb-6">{formDescription}</p>

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Name"
//                 className="border px-4 py-2 rounded w-full"
//               />
//               <input
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Phone"
//                 className="border px-4 py-2 rounded w-full"
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 type="email"
//                 placeholder="Email"
//                 className="border px-4 py-2 rounded w-full"
//               />
//               <input
//                 name="subject"
//                 value={form.subject}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Subject"
//                 className="border px-4 py-2 rounded w-full"
//               />
//             </div>
//             <textarea
//               name="message"
//               value={form.message}
//               onChange={handleChange}
//               placeholder="Message"
//               rows="5"
//               className="border px-4 py-2 rounded w-full"
//             ></textarea>

//             <button
//               type="submit"
//               disabled={submitting}
//               className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}
//             >
//               <i className="fas fa-paper-plane mr-2"></i>
//               {submitting ? "Sending..." : "Send Message"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Bottom: Google Map */}
//       <div className="w-full h-[400px]">
//         {/* use dangerouslySetInnerHTML if you want the full iframe HTML from admin,
//             but here we use the raw src so admin should provide the embed src URL */
//         }
//         {mapEmbedUrl ? (
//           <iframe
//             title="Map"
//             className="w-full h-full border-0"
//             src={mapEmbedUrl}
//             allowFullScreen=""
//             loading="lazy"
//           ></iframe>
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">Map not available</div>
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import axios from "../../api/axios"; 

export default function ContactPage() {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get('/contact')
      .then((res) => {
        const payload = res.data;
        const data = payload?.data ?? payload?.contactInfo ?? payload;
        setContactData(data);
      })
      .catch((err) => {
        console.error("Error fetching contact page data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-gray-500">
        Loading Contact Page...
      </div>
    );
  }

  const cd = contactData ?? {};
  const bannerImage = cd.bannerImage ?? "";
  const contactInfoBackground = cd.contactInfoBackground ?? "";
  const description = cd.description ?? "";
  const address = cd.address ?? "";
  const phones = Array.isArray(cd.phones) ? cd.phones : (cd.phones ? [cd.phones] : []);
  const emails = Array.isArray(cd.emails) ? cd.emails : (cd.emails ? [cd.emails] : []);
  const socials = Array.isArray(cd.socials) ? cd.socials : [];
  const formDescription = cd.formDescription ?? "";
  const mapEmbedUrl = cd.mapEmbedUrl ?? "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill Name, Email and Message.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post("/contact/message", form, {
        headers: { "Content-Type": "application/json" }
      });
      const json = res.data;
      if (json?.success) {
        alert("Message sent. We'll be in touch shortly.");
        setForm({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        console.error("Server error:", json);
        alert("Failed to send message. Please try again later.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error sending message. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Top Banner */}
      <div
        className="relative bg-cover bg-center h-[300px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Get In Touch</h1>
          <p className="text-sm text-orange-500">
            <span className="text-white">Home</span> / Contact
          </p>
        </div>
      </div>

      {/* Contact Info & Form */}
      {/* ✅ Updated container (now px-0 on mobile to prevent left gap) */}
      <div className="container mx-auto px-0 sm:px-4 md:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Contact Info */}
        <div
          className="relative bg-black rounded shadow overflow-hidden"
          style={{
            backgroundImage: `url(${contactInfoBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black bg-opacity-80 p-6 text-white h-full">
            <h2 className="text-xl font-bold mb-4">Contact Detail</h2>
            <p className="text-sm mb-4">{description}</p>

            <div className="mb-4">
              <h4 className="font-bold">Our Office</h4>
              <p className="text-sm">{address}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-bold">Phone</h4>
              {phones.length > 0 ? (
                phones.map((phone, idx) => (
                  <p key={idx} className="text-sm">
                    {phone}
                  </p>
                ))
              ) : (
                <p className="text-sm">Not available</p>
              )}
            </div>

            <div className="mb-4">
              <h4 className="font-bold">Email</h4>
              {emails.length > 0 ? (
                emails.map((email, idx) => (
                  <p key={idx} className="text-sm">
                    {email}
                  </p>
                ))
              ) : (
                <p className="text-sm">Not available</p>
              )}
            </div>

            <div className="mt-6">
              <h4 className="font-bold mb-2">Follow our social media :</h4>
              <div className="flex gap-3">
                {socials.length > 0 ? (
                  socials.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white text-sm font-bold"
                    >
                      {social.icon || social.name?.charAt(0)?.toUpperCase() || "S"}
                    </a>
                  ))
                ) : (
                  <>
                    <div className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white text-sm font-bold">f</div>
                    <div className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white text-sm font-bold">i</div>
                    <div className="w-8 h-8 flex items-center justify-center bg-orange-600 rounded text-white text-sm font-bold">t</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Message us, we will be in touch shortly</h2>
          <p className="text-sm text-gray-600 mb-6">{formDescription}</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Name"
                className="border px-4 py-2 rounded w-full"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="text"
                placeholder="Phone"
                className="border px-4 py-2 rounded w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="border px-4 py-2 rounded w-full"
              />
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                type="text"
                placeholder="Subject"
                className="border px-4 py-2 rounded w-full"
              />
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              rows="5"
              className="border px-4 py-2 rounded w-full"
            ></textarea>

            <button
              type="submit"
              disabled={submitting}
              className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold ${submitting ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom: Google Map */}
      <div className="w-full h-[400px]">
        {mapEmbedUrl ? (
          <iframe
            title="Map"
            className="w-full h-full border-0"
            src={mapEmbedUrl}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">Map not available</div>
        )}
      </div>
    </div>
  );
}
