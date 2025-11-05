// import React, { useState, useEffect } from 'react';
// import axios from '../../api/axios';

// const AdminAddCarDetails = () => {
//   const [form, setForm] = useState({
//     make: '',
//     model: '',
//     year: '',
//     variant: '',
//     bodyType: ''
//   });
//   const [message, setMessage] = useState('');
//   const [cars, setCars] = useState([]);

//   const fetchCarDetails = async () => {
//     try {
//       const res = await axios.get('/cardetails/all');
//       setCars(res.data.cars);
//     } catch (error) {
//       console.error("Failed to load car details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCarDetails();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { make, model, year, variant, bodyType } = form;

//     if (!make || !model || !year || !variant || !bodyType) {
//       setMessage('⚠️ All fields are required');
//       return;
//     }

//     try {
//       const res = await axios.post('/cardetails/add', {
//         make,
//         model,
//         year: parseInt(year),
//         variant,
//         bodyType
//       });
//       setMessage(res.data.message);
//       setForm({ make: '', model: '', year: '', variant: '', bodyType: '' });
//       fetchCarDetails(); // refresh list
//     } catch (err) {
//       setMessage(err.response?.data?.message || '❌ Error adding car details');
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded shadow mt-10">
//       <h2 className="text-2xl font-bold mb-4">🚗 Add Car Details</h2>

//       {message && (
//         <div className="mb-4 text-blue-600 font-medium">{message}</div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {['make', 'model', 'year', 'variant', 'bodyType'].map((field) => (
//           <input
//             key={field}
//             name={field}
//             type={field === 'year' ? 'number' : 'text'}
//             placeholder={`Enter ${field}`}
//             value={form[field]}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         ))}

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
//         >
//           Add Car
//         </button>
//       </form>

//       <hr className="my-6" />

//       <h3 className="text-lg font-semibold mb-2">📋 All Cars</h3>
//       <ul className="space-y-2">
//         {cars.map((car) => (
//           <li key={car._id} className="border p-2 rounded bg-gray-100">
//             <div><strong>{car.make} {car.model}</strong> ({car.year})</div>
//             <div>Variant: {car.variant} | Body Type: {car.bodyType}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminAddCarDetails;










import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { FaCarSide } from 'react-icons/fa';

const AdminAddCarDetails = () => {
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    variant: '',
    bodyType: ''
  });
  const [message, setMessage] = useState('');
  const [cars, setCars] = useState([]);

  const fetchCarDetails = async () => {
    try {
      const res = await axios.get('/cardetails/all');
      setCars(res.data.cars);
    } catch (error) {
      console.error("Failed to load car details:", error);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { make, model, year, variant, bodyType } = form;

    if (!make || !model || !year || !variant || !bodyType) {
      setMessage('⚠️ All fields are required');
      return;
    }

    try {
      const res = await axios.post('/cardetails/add', {
        make,
        model,
        year: parseInt(year),
        variant,
        bodyType
      });
      setMessage(res.data.message);
      setForm({ make: '', model: '', year: '', variant: '', bodyType: '' });
      fetchCarDetails(); // refresh list
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Error adding car details');
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-3xl mx-auto bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <FaCarSide className="text-blue-600 text-3xl" /> Add Car Details
      </h2>

      {message && (
        <div className="mb-4 text-sm text-blue-700 font-medium bg-blue-100 px-4 py-2 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {['make', 'model', 'year', 'variant', 'bodyType'].map((field) => (
          <input
            key={field}
            name={field}
            type={field === 'year' ? 'number' : 'text'}
            placeholder={`Enter ${field}`}
            value={form[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        ))}

        <button
          type="submit"
          className="md:col-span-2 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
        >
          ➕ Add Car
        </button>
      </form>

      <h3 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
        📋 All Cars
      </h3>

      {cars.length === 0 ? (
        <p className="text-gray-500 italic">No cars added yet.</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 scroll-smooth">
          {cars.map((car) => (
            <div key={car._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
              <div className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <FaCarSide className="text-blue-500" />
                {car.make} {car.model} ({car.year})
              </div>
              <div className="text-gray-600 text-sm">
                Variant: {car.variant} | Body Type: {car.bodyType}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAddCarDetails;
