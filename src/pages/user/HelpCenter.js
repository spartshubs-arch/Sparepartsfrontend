// import React from "react";
// import { Link } from "react-router-dom";

// const HelpCenter = () => {
//   return (
//     // ✅ Here we changed px-4 to px-0 sm:px-4
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center px-0 sm:px-4 py-10">
//       <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6 sm:p-10">
//         <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-6 text-center">
//           Help Center – SparePartHub
//         </h1>

//         <p className="text-gray-700 mb-4 text-lg">
//           Welcome to the <span className="font-semibold">SparePartHub Help Center</span>.  
//           Here you can find quick guidance on how to get assistance or more information
//           while using our website.
//         </p>

//         {/* Request a Callback Section */}
//         <section className="mb-8">
//           <h2 className="text-2xl font-semibold text-orange-500 mb-3">
//             📞 Request a Callback
//           </h2>
//           <p className="text-gray-700 leading-relaxed">
//             On the <span className="font-semibold">Home Page</span> (top left side),
//             you’ll see a <span className="font-semibold">Request a Call Back</span> button.  
//             When you click on it, you can enter:
//           </p>
//           <ul className="list-disc list-inside text-gray-700 mt-2">
//             <li>Your Name</li>
//             <li>Email (the same email you used to log in or where you want to receive info)</li>
//             <li>Phone Number</li>
//             <li>Reason for your request or question</li>
//           </ul>
//           <p className="text-gray-700 mt-2">
//             After filling in the details, click <span className="font-semibold">Submit</span>  
//             and wait for our team to respond via your provided contact information.
//           </p>
//           <p className="mt-4">
//             <Link
//               to="/"
//               className="text-orange-600 font-semibold hover:underline"
//             >
//               ➡ Click here to go to the Home Page
//             </Link>
//           </p>
//         </section>

//         {/* Contact Us Section */}
//         <section className="mb-8">
//           <h2 className="text-2xl font-semibold text-orange-500 mb-3">
//             📩 Contact Us
//           </h2>
//           <p className="text-gray-700 leading-relaxed">
//             You can also reach us via our{" "}
//             <Link
//               to="/contact"
//               className="text-orange-600 font-semibold hover:underline"
//             >
//               Contact Us
//             </Link>{" "}
//             page.
//           </p>
//           <p className="text-gray-700 mt-2">
//             On that page, you’ll find a <span className="font-semibold">Message Us</span> form where you can enter:
//           </p>
//           <ul className="list-disc list-inside text-gray-700 mt-2">
//             <li>Your Name</li>
//             <li>Email</li>
//             <li>Phone Number</li>
//             <li>Subject</li>
//             <li>Your Message</li>
//           </ul>
//           <p className="text-gray-700 mt-2">
//             You’ll also see our full contact details, address, and location map
//             so you can easily find or connect with us.
//           </p>
//         </section>

//         {/* Final Note */}
//         <section>
//           <h2 className="text-2xl font-semibold text-orange-500 mb-3">
//             💡 Quick Tip
//           </h2>
//           <p className="text-gray-700">
//             Our goal is to make your spare parts shopping experience as smooth
//             as possible. If you ever face an issue or have a question, don’t
//             hesitate to use either the <span className="font-semibold">Request a Callback</span> or
//             <span className="font-semibold"> Contact Us</span> option — our team is here to help!
//           </p>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HelpCenter;



import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchHelpCenter = async () => {
      try {
        const res = await axios.get("/helpcenter");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching help center:", err);
      }
    };
    fetchHelpCenter();
  }, []);

  if (!data) {
    return <p className="text-center mt-10">Loading Help Center...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-0 sm:px-4 py-10">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-6 text-center">
          {data.title}
        </h1>

        <p className="text-gray-700 mb-4 text-lg">{data.description}</p>

        {/* Request a Callback Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">📞 Request a Callback</h2>
          <p className="text-gray-700 leading-relaxed">{data.requestCallback}</p>
          <p className="mt-4">
            <Link to="/" className="text-orange-600 font-semibold hover:underline">
              ➡ Click here to go to the Home Page
            </Link>
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">📩 Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">{data.contactUs}</p>
          <p className="mt-4">
            <Link to="/contact" className="text-orange-600 font-semibold hover:underline">
              Go to Contact Us Page
            </Link>
          </p>
        </section>

        {/* Final Note */}
        <section>
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">💡 Quick Tip</h2>
          <p className="text-gray-700">{data.quickTip}</p>
        </section>
      </div>
    </div>
  );
};

export default HelpCenter;
