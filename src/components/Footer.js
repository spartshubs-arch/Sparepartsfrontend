



// import React, { useEffect, useState } from "react";
// import axios from "../api/axios"; 
// import logo from '../../src/logo/sparepartslogo.jpg';
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaTwitter,        
//   FaLinkedinIn,
//   FaYoutube,
//   FaSnapchatGhost,
//   FaWhatsapp,
//   FaPinterestP,
//   FaGithub,
//   FaRedditAlien,
//   FaTelegramPlane,
//   FaDiscord,
//   FaMoneyCheckAlt,
// } from "react-icons/fa";
// import {
//   FaTiktok,
//   FaXTwitter,
// } from "react-icons/fa6";

// import { Link } from "react-router-dom";

// const iconMap = {
//   facebook: FaFacebookF,
//   instagram: FaInstagram,
//   twitter: FaTwitter,
//   x: FaXTwitter,
//   youtube: FaYoutube,
//   linkedin: FaLinkedinIn,
//   snapchat: FaSnapchatGhost,
//   whatsapp: FaWhatsapp,
//   pinterest: FaPinterestP,
//   tiktok: FaTiktok,
//   redditalien: FaRedditAlien,
//   github: FaGithub,
//   discord: FaDiscord,
//   telegram: FaTelegramPlane,
// };

// const Footer = () => {
//   const [footer, setFooter] = useState(null);

//   useEffect(() => {
//     const fetchFooter = async () => {
//       try {
//         const res = await axios.get("/footer"); 
//         setFooter(res.data);
//       } catch (err) {
//         console.error("Error fetching footer:", err);
//       }
//     };
//     fetchFooter();
//   }, []);

//   if (!footer) {
//     return (
//       <footer className="bg-[#435b7e] text-white pt-10 px-6">
//         <div className="text-center text-gray-300">Loading footer...</div>
//       </footer>
//     );
//   }

//   return (
//     <footer className="bg-[#435b7e] text-white pt-10 px-6">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Top Row */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          
//           {/* Social Icons (Admin controlled) */}
//           <div className="flex gap-5">
//             {footer.socialLinks?.map((social, idx) => {
//               const Icon = iconMap[social.platform?.toLowerCase()];
//               return Icon ? (
//                 <a
//                   key={idx}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Icon className="hover:text-orange-500 cursor-pointer text-xl" />
//                 </a>
//               ) : null;
//             })}
//           </div>

//           {/* Subscribe Box (Fixed) */}
//           <div className="flex gap-2 w-full md:w-auto justify-center">
//             <input
//               type="email"
//               placeholder="Enter your email..."
//               className="p-2 rounded-md text-black flex-1 sm:w-64"
//             />
//             <button
//               className="bg-orange-500 text-white px-3 py-1.5 rounded-md hover:bg-orange-600 text-sm sm:text-base"
//             >
//               Subscribe
//             </button>
//           </div>
//         </div>

//         {/* Main Footer Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10 items-start">
          
//           {/* About (Admin controlled) */}
//           <div className="flex flex-col items-center md:items-start space-y-3">
//             <img src={logo} alt="Logo" className="w-44 mb-2" />

//             <h3 className="text-xl font-bold mt-1">{footer.about?.title}</h3>
//             <p className="text-sm leading-relaxed text-center md:text-left">
//               {footer.about?.description}
//             </p>

//             {footer.about?.cashOnDelivery && (
//               <div className="flex items-center gap-2 mt-3">
//                 <FaMoneyCheckAlt  size={24} />
//                 <span className="text-sm">Cash on Delivery</span>
//               </div>
//             )}
//           </div>

//           {/* Customer Service (Fixed links) */}
//           <div className="text-center md:text-left">
//             <h4 className="text-lg font-semibold mb-3">Customer Service</h4>
//             <ul className="text-sm space-y-2">
//               <li><Link to="/order">My Orders</Link></li>
//               <li><Link to="/helpcenter">Help Center</Link></li>
//               <li><Link to="/order">Track My Order</Link></li>
//               <li><Link to="/contact">Store Location</Link></li>
//             </ul>
//           </div>

//           {/* Pages (Fixed links) */}
//           <div className="text-center md:text-left">
//             <h4 className="text-lg font-semibold mb-3">Pages</h4>
//             <ul className="text-sm space-y-2">
//               <li><Link to="/about">About Us</Link></li>
//               <li><Link to="/shop">Shop</Link></li>
//               <li><Link to="/blog">Blog</Link></li>
//               <li><Link to="/helpcenter">Guides</Link></li>
//               <li><Link to="/faq">FAQ's</Link></li>
//               <li><Link to="/contact">Contact Us</Link></li>
//             </ul>
//           </div>

//           {/* Contact Info (Admin controlled) */}
//           <div className="text-center md:text-left">
//             <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
//             <ul className="text-sm space-y-2 text-gray-200">
//               {footer.contact?.address && <li>📍 {footer.contact.address}</li>}
//               {footer.contact?.email && <li>📧 {footer.contact.email}</li>}
//               {footer.contact?.phone && <li>📞 {footer.contact.phone}</li>}
//               {footer.contact?.workingHours && <li>🕒 {footer.contact.workingHours}</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
//           © {new Date().getFullYear()} {footer.about?.title || "Website"}. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import logo from "../../src/logo/sparepartslogo.jpg";
import {
  FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn,
  FaYoutube, FaSnapchatGhost, FaWhatsapp, FaPinterestP,
  FaGithub, FaRedditAlien, FaTelegramPlane, FaDiscord,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const iconMap = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaTwitter,
  x: FaXTwitter,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  snapchat: FaSnapchatGhost,
  whatsapp: FaWhatsapp,
  pinterest: FaPinterestP,
  tiktok: FaTiktok,
  redditalien: FaRedditAlien,
  github: FaGithub,
  discord: FaDiscord,
  telegram: FaTelegramPlane,
};

const Footer = () => {
  const [footer, setFooter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await axios.get("/footer");
        setFooter(res.data);
      } catch (err) {
        console.error("Error fetching footer:", err);
      }
    };
    fetchFooter();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!footer) {
    return (
      <footer className="bg-gradient-to-r from-gray-700 to-gray-900 text-white pt-10 px-6">
        <div className="text-center text-gray-300">Loading footer...</div>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-700 text-white pt-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Social Icons */}
          <div className="flex gap-5">
            {footer.socialLinks?.map((social, idx) => {
              const Icon = iconMap[social.platform?.toLowerCase()];
              return Icon ? (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="hover:text-orange-400 transition-colors duration-200 cursor-pointer text-xl" />
                </a>
              ) : null;
            })}
          </div>

          {/* Subscribe Box */}
          <div className="flex gap-2 w-full md:w-auto justify-center">
            <input
              type="email"
              placeholder="Enter your email..."
              className="p-2 rounded-md text-black flex-1 sm:w-64 focus:ring-2 focus:ring-orange-500 outline-none"
            />
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10 items-start">
          {/* About */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <img src={logo} alt="Logo" className="w-32 mb-2" />

            <h3 className="text-xl font-bold mt-1">{footer.about?.title}</h3>
            <p className="text-sm leading-relaxed text-center md:text-left text-gray-300">
              {footer.about?.description}
            </p>

            {footer.about?.cashOnDelivery && (
              <div className="flex items-center gap-2 mt-3">
                <FaMoneyCheckAlt size={20} />
                <span className="text-sm">Cash on Delivery</span>
              </div>
            )}
          </div>

          {/* Customer Service */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-3">Customer Service</h4>
            <ul className="text-sm space-y-2 font-semibold">
              <li><button onClick={() => handleNavigate("/order")}>My Orders</button></li>
              <li><button onClick={() => handleNavigate("/helpcenter")}>Help Center</button></li>
              <li><button onClick={() => handleNavigate("/order")}>Track My Order</button></li>
              <li><button onClick={() => handleNavigate("/contact")}>Store Location</button></li>
            </ul>
          </div>

          {/* Pages */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold  mb-3">Pages</h4>
            <ul className="text-sm space-y-2 font-semibold">
              <li><button onClick={() => handleNavigate("/about")}>About Us</button></li>
              <li><button onClick={() => handleNavigate("/shop")}>Shop</button></li>
              <li><button onClick={() => handleNavigate("/blog")}>Blog</button></li>
              <li><button onClick={() => handleNavigate("/helpcenter")}>Guides</button></li>
              <li><button onClick={() => handleNavigate("/faq")}>FAQ's</button></li>
              <li><button onClick={() => handleNavigate("/contact")}>Contact Us</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-bold mb-3">Contact Us</h4>
            <ul className="text-sm space-y-2 text-gray-300 font-semibold">
              {footer.contact?.address && <li>📍 {footer.contact.address}</li>}
              {footer.contact?.email && <li>📧 {footer.contact.email}</li>}
              {footer.contact?.phone && <li>📞 {footer.contact.phone}</li>}
              {footer.contact?.workingHours && <li>🕒 {footer.contact.workingHours}</li>}
            </ul>
          </div>
        </div>

        {/* People Also Search For */}
        {footer.peopleAlsoSearchFor?.length > 0 && (
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3 text-center md:text-left">
              People Also Search For
            </h4>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {footer.peopleAlsoSearchFor.map((item, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm text-gray-300 hover:bg-orange-500 hover:text-white cursor-pointer transition-all"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {footer.about?.title || "Website"}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
