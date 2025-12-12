

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
<div className="min-h-screen bg-gray-50 flex flex-col items-center 
px-0 sm:px-4 pt-36 sm:pt-28 lg:pt-32 pb-10">
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
