// import React, { useState } from 'react';
// import logo from '../../logo/sparepartslogo.jpg'
// import axios from '../../api/axios'

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: ''
//   });

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//        const res = await axios.post('/auth/signup', formData);
//         alert('Signup Successful');
//     } catch (error) {
//       alert(error.response?.data?.message || 'Signup failed');
//     }
//   };

//   const handleGoogleSignup = () => {
//     window.location.href = 'http://localhost:5000/api/auth/google';
//   };

//   const handleFacebookSignup = () => {
//     window.location.href = 'http://localhost:5000/api/auth/facebook';
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Logo" className="h-16" />
//         </div>
//         <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-1/2 px-4 py-2 border rounded-md"
//               required
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-1/2 px-4 py-2 border rounded-md"
//               required
//             />
//           </div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Create Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md"
//             required
//           />
//           <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
//             Sign Up
//           </button>
//         </form>

//         <div className="my-4 text-center text-gray-500">or sign up with</div>

//         <div className="flex gap-4">
//           <button
//             onClick={handleGoogleSignup}
//             className="w-1/2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
//           >
//             Google
//           </button>
//           <button
//             onClick={handleFacebookSignup}
//             className="w-1/2 bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900"
//           >
//             Facebook
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;







// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import logo from '../../logo/sparepartslogo.jpg';
// import axios from '../../api/axios';
// import { Link } from 'react-router-dom';


// const Signup = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: ''
//   });

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const token = queryParams.get('token');
//     const firstName = queryParams.get('firstName');
//     const lastName = queryParams.get('lastName');
//     const email = queryParams.get('email');

//     // If coming from social login, pre-fill the form (except password)
//     if (token && email) {
//       setFormData(prev => ({
//         ...prev,
//         firstName: firstName || '',
//         lastName: lastName || '',
//         email: email || ''
//       }));
//       // Optionally save token to session/local storage if needed
//       sessionStorage.setItem('socialSignupToken', token);
//     }
//   }, [location]);

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//   e.preventDefault();
//   try {
//     const token = sessionStorage.getItem('socialSignupToken');
//     const config = token
//       ? { headers: { Authorization: `Bearer ${token}` } }
//       : {};

//     const res = await axios.post('/auth/signup', formData, config);
    
//     // Save user info to sessionStorage
//     const userInfo = {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       token: res.data.token, // assuming backend returns token on signup
//     };
//     sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

//     alert('Signup Successful');
//     sessionStorage.removeItem('socialSignupToken');
//     navigate('/'); // or any protected route or homepage
//   } catch (error) {
//     alert(error.response?.data?.message || 'Signup failed');
//   }
// };


//   const handleGoogleSignup = () => {
//     window.location.href = 'http://localhost:5000/api/auth/google';
//   };

//   const handleFacebookSignup = () => {
//     window.location.href = 'http://localhost:5000/api/auth/facebook';
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
//         <div className="flex justify-center mb-6">
//           <img src={logo} alt="Logo" className="h-16" />
//         </div>
//         <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-1/2 px-4 py-2 border rounded-md"
//               required
//             />
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-1/2 px-4 py-2 border rounded-md"
//               required
//             />
//           </div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Create Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md"
//             required
//           />
//           <button type="submit" className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-blue-700">
//             Sign Up
//           </button>
//         </form>

//         <div className="my-4 text-center text-gray-500">or sign up with</div>

//         <div className="flex gap-4">
//           <button
//             onClick={handleGoogleSignup}
//             className="w-1/2 bg-orange-500 text-white py-2 rounded-md hover:bg-red-600"
//           >
//             Google
//           </button>
//           <button
//             onClick={handleFacebookSignup}
//             className="w-1/2 bg-orange-500 text-white py-2 rounded-md hover:bg-blue-900"
//           >
//             Facebook
//           </button>
//         </div>
//         <p className="text-center text-sm mt-4">
//                   Already have an account?{' '}
//                   <Link to="/loginuser" className="text-red-500 hover:underline">
//                     Click here to Login 
//                   </Link>
//                 </p>
//       </div>
      
//     </div>
//   );
// };

// export default Signup;














import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../logo/sparepartslogo.jpg';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSocialSignup, setIsSocialSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const firstName = queryParams.get('firstName');
    const lastName = queryParams.get('lastName');
    const email = queryParams.get('email');

    // If coming from social login, pre-fill the form (except password)
    if (token && email) {
      setFormData(prev => ({
        ...prev,
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || ''
      }));
      sessionStorage.setItem('socialSignupToken', token);
      setIsSocialSignup(true);
    }
  }, [location]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('socialSignupToken');

      let res;
      if (token) {
        // 🔑 Social signup → finalize with password
        res = await axios.post(
          '/auth/set-social-password',
          { password: formData.password },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Save user info
        sessionStorage.setItem(
          'userInfo',
          JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            token
          })
        );

        sessionStorage.removeItem('socialSignupToken');
      } else {
        // 🔑 Manual signup
        res = await axios.post('/auth/signup', formData);

        sessionStorage.setItem(
          'userInfo',
          JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            token: res.data.token
          })
        );
      }

      alert('Signup Successful');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleFacebookSignup = () => {
    window.location.href = 'http://localhost:5000/api/auth/facebook';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-16" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          {isSocialSignup ? 'Complete Your Signup' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded-md"
              required
              disabled={isSocialSignup} // prevent editing if coming from Google/Facebook
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border rounded-md"
              required
              disabled={isSocialSignup}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
            disabled={isSocialSignup}
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {isSocialSignup ? 'Set Password & Finish' : 'Sign Up'}
          </button>
        </form>

        {!isSocialSignup && (
          <>
            <div className="my-4 text-center text-gray-500">or sign up with</div>

            <div className="flex gap-4">
              <button
                onClick={handleGoogleSignup}
                className="w-1/2 bg-orange-500 text-white py-2 rounded-md hover:bg-red-600"
              >
                Google
              </button>
              <button
                onClick={handleFacebookSignup}
                className="w-1/2 bg-orange-500 text-white py-2 rounded-md hover:bg-blue-900"
              >
                Facebook
              </button>
            </div>
          </>
        )}

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/loginuser" className="text-red-500 hover:underline">
            Click here to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
