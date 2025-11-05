// // components/CarSidebar.js
// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { ChevronRight } from "lucide-react"; // Optional icon

// export default function CarSidebar({ onModelSelect }) {
//   const [carData, setCarData] = useState([]);
//   const [activeMake, setActiveMake] = useState(null);

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const res = await axios.get("/cardetails/all");
//         setCarData(res.data.cars);
//       } catch (error) {
//         console.error("Failed to fetch car details:", error);
//       }
//     };

//     fetchCarDetails();
//   }, []);

//   const groupedCars = carData.reduce((acc, car) => {
//     if (!acc[car.make]) {
//       acc[car.make] = new Set();
//     }
//     acc[car.make].add(car.model);
//     return acc;
//   }, {});

//   return (
//     <div className="w-full md:w-64 bg-white shadow-lg border-r border-orange-600 h-full overflow-y-auto rounded-md">
//       <h3 className="text-xl font-bold text-orange-600 p-4 border-b border-orange-300">CATEGORIES</h3>
//       <ul className="divide-y divide-orange-100">
//         {Object.keys(groupedCars).map((make) => (
//           <li
//             key={make}
//             onMouseEnter={() => setActiveMake(make)}
//             onMouseLeave={() => setActiveMake(null)}
//             className="hover:bg-orange-50 cursor-pointer transition-all"
//           >
//             <div className="flex items-center justify-between p-4 text-black font-semibold text-base bg-orange-100">
//               <span>{make}</span>
//               <ChevronRight className="w-4 h-4 text-orange-500" />
//             </div>

//             {activeMake === make && (
//               <div className="bg-white px-6 pb-3 pt-2">
//                 {[...groupedCars[make]].map((model) => (
//                   <div
//                     key={model}
//                     onClick={() => onModelSelect(make, model)}
//                     className="py-2 text-sm text-gray-700 border-b hover:bg-orange-100 hover:text-orange-600 cursor-pointer"
//                   >
//                     {model}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import { ChevronRight } from "lucide-react";

// export default function CarSidebar({ onModelSelect }) {
//   const [carData, setCarData] = useState([]);
//   const [activeMake, setActiveMake] = useState(null);

//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const res = await axios.get("/cardetails/all");
//         setCarData(res.data.cars);
//       } catch (error) {
//         console.error("Failed to fetch car details:", error);
//       }
//     };

//     fetchCarDetails();
//   }, []);

//   const groupedCars = carData.reduce((acc, car) => {
//     if (!acc[car.make]) acc[car.make] = new Set();
//     acc[car.make].add(car.model);
//     return acc;
//   }, {});

//   return (
//    <div className="w-full md:w-60 lg:w-64 xl:w-72 bg-white shadow-lg border border-orange-500 rounded-lg overflow-y-auto max-h-[90vh] ">

//     {/* Sticky Heading */}
//     <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
//       <h3 className="text-lg font-semibold text-gray-800 px-4 py-3">
//         Select Car Make
//       </h3>
//     </div>

//     {/* Car Make List */}
//     <ul className="divide-y divide-gray-100">
//       {Object.keys(groupedCars).map((make) => (
//         <li
//           key={make}
//           onMouseEnter={() => setActiveMake(make)}
//           onMouseLeave={() => setActiveMake(null)}
//           className="relative"
//         >
//           {/* Make Row */}
//           <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
//             <span className="text-sm text-gray-900 font-medium">{make}</span>
//             <ChevronRight className="w-4 h-4 text-gray-400" />
//           </div>

//           {/* Show Models under Make */}
//           {activeMake === make && (
//             <div className="bg-gray-50 px-4 py-3 space-y-2 border-t border-gray-100 shadow-inner rounded-b-md">
//               <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
//                 Models
//               </div>
//               {[...groupedCars[make]].map((model) => (
//                 <div
//                   key={model}
//                   onClick={() => onModelSelect(make, model)}
//                   className="text-sm text-gray-700 hover:text-gray-900 hover:bg-white px-3 py-2 rounded cursor-pointer border border-gray-100"
//                 >
//                   {model}
//                 </div>
//               ))}
//             </div>
//           )}
//         </li>
//       ))}
//     </ul>
//   </div>
//   );
// }




import { useEffect, useState } from "react";
import axios from "../api/axios";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function CarSidebar({ onModelSelect }) {
  const [carData, setCarData] = useState([]);
  const [activeMake, setActiveMake] = useState(null);
  const [openMobile, setOpenMobile] = useState(false); // mobile toggle

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await axios.get("/cardetails/all");
        setCarData(res.data.cars);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      }
    };
    fetchCarDetails();
  }, []);

  const groupedCars = carData.reduce((acc, car) => {
    if (!acc[car.make]) acc[car.make] = new Set();
    acc[car.make].add(car.model);
    return acc;
  }, {});

  return (
<div className="w-full md:w-48 lg:w-56 xl:w-60 bg-white shadow-lg border border-orange-500 rounded-lg overflow-y-auto max-h-[90vh]">

      {/* Heading for desktop + mobile */}
      <div 
        className="sticky top-0 z-10 bg-white border-b border-gray-200 flex justify-between items-center px-4 py-3 md:block"
      >
        <h3 className="text-lg font-semibold text-gray-800">Select Car Make</h3>
        {/* Only show toggle on small screens */}
        <button 
          className="md:hidden text-orange-500"
          onClick={() => setOpenMobile(!openMobile)}
        >
          {openMobile ? <ChevronDown /> : <ChevronRight />}
        </button>
      </div>

      {/* List: hidden on mobile unless toggled */}
      <ul 
        className={`
          divide-y divide-gray-100
          ${openMobile ? "block" : "hidden"}
          md:block
        `}
      >
        {Object.keys(groupedCars).map((make) => (
          <li
            key={make}
            onMouseEnter={() => setActiveMake(make)}
            onMouseLeave={() => setActiveMake(null)}
            className="relative"
          >
            <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <span className="text-sm text-gray-900 font-medium">{make}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            {activeMake === make && (
              <div className="bg-gray-50 px-4 py-3 space-y-2 border-t border-gray-100 shadow-inner rounded-b-md">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Models
                </div>
                {[...groupedCars[make]].map((model) => (
                  <div
                    key={model}
                    onClick={() => onModelSelect(make, model)}
                    className="text-sm text-gray-700 hover:text-gray-900 hover:bg-white px-3 py-2 rounded cursor-pointer border border-gray-100"
                  >
                    {model}
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
