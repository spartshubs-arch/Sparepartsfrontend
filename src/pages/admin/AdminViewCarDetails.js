// // src/pages/AdminViewCarDetails.jsx

// import React, { useEffect, useState } from 'react';
// import axios from '../../api/axios'; // Adjust if needed

// const AdminViewCarDetails = () => {
//   const [cars, setCars] = useState([]);
//   const [message, setMessage] = useState('');

//   const fetchCars = async () => {
//     try {
//       const res = await axios.get('/cardetails/all');
//       setCars(res.data.cars);
//     } catch (err) {
//       console.error('Failed to fetch cars:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this car?')) return;

//     try {
//       const res = await axios.delete(`/cardetails/delete/${id}`);
//       setMessage(res.data.message);
//       fetchCars(); // Refresh list
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Error deleting car');
//     }
//   };

//   useEffect(() => {
//     fetchCars();
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto mt-10 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">🚗 All Car Details</h2>

//       {message && (
//         <div className="mb-4 text-green-600 font-semibold">{message}</div>
//       )}

//       {cars.length === 0 ? (
//         <p>No car records found.</p>
//       ) : (
//         <table className="w-full table-auto border border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border px-4 py-2">Make</th>
//               <th className="border px-4 py-2">Model</th>
//               <th className="border px-4 py-2">Year</th>
//               <th className="border px-4 py-2">Variant</th>
//               <th className="border px-4 py-2">Body Type</th>
//               <th className="border px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cars.map((car) => (
//               <tr key={car._id}>
//                 <td className="border px-4 py-2">{car.make}</td>
//                 <td className="border px-4 py-2">{car.model}</td>
//                 <td className="border px-4 py-2">{car.year}</td>
//                 <td className="border px-4 py-2">{car.variant}</td>
//                 <td className="border px-4 py-2">{car.bodyType}</td>
//                 <td className="border px-4 py-2">
//                   <button
//                     onClick={() => handleDelete(car._id)}
//                     className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminViewCarDetails;











// src/pages/AdminViewCarDetails.jsx

import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { FaCarSide } from 'react-icons/fa'; // ✅ Car icon

const AdminViewCarDetails = () => {
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState('');

  const fetchCars = async () => {
    try {
      const res = await axios.get('/cardetails/all');
      setCars(res.data.cars);
    } catch (err) {
      console.error('Failed to fetch cars:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      const res = await axios.delete(`/cardetails/delete/${id}`);
      setMessage(res.data.message);
      fetchCars();
    } catch (err) {
      console.error(err);
      setMessage('❌ Error deleting car');
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto mt-12 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <FaCarSide className="text-3xl text-blue-600" />
        <h2 className="text-3xl font-semibold text-gray-800">All Car Details</h2>
      </div>

      {message && (
        <div className="mb-4 text-green-600 font-semibold bg-green-50 px-4 py-2 rounded border border-green-200">
          {message}
        </div>
      )}

      {cars.length === 0 ? (
        <p className="text-gray-500 text-center">🚫 No car records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-blue-50 border-b border-blue-200">
              <tr>
                <th className="px-5 py-3 font-semibold text-blue-900">Make</th>
                <th className="px-5 py-3 font-semibold text-blue-900">Model</th>
                <th className="px-5 py-3 font-semibold text-blue-900">Year</th>
                <th className="px-5 py-3 font-semibold text-blue-900">Variant</th>
                <th className="px-5 py-3 font-semibold text-blue-900">Body Type</th>
                <th className="px-5 py-3 font-semibold text-blue-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={car._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-5 py-3 text-gray-700">{car.make}</td>
                  <td className="px-5 py-3 text-gray-700">{car.model}</td>
                  <td className="px-5 py-3 text-gray-700">{car.year}</td>
                  <td className="px-5 py-3 text-gray-700">{car.variant}</td>
                  <td className="px-5 py-3 text-gray-700">{car.bodyType}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminViewCarDetails;
