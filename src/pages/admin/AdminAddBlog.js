// import React, { useState, useEffect } from 'react';
// import axios from '../../api/axios';
// import { FaTrash, FaPlus } from 'react-icons/fa';

// export default function AdminBlogManager() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);
//   const [blogs, setBlogs] = useState([]);

//   // Fetch blogs
//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get('/blogs');
//       setBlogs(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Add blog
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', content);
//     formData.append('image', image);

//     try {
//       await axios.post('/blogs', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert('✅ Blog added successfully!');
//       setTitle('');
//       setContent('');
//       setImage(null);
//       fetchBlogs();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete blog
//   const handleDelete = async (id) => {
//     if (!window.confirm('❌ Are you sure you want to delete this blog?')) return;
//     try {
//       await axios.delete(`/blogs/${id}`);
//       alert('🗑 Blog deleted successfully!');
//       fetchBlogs();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
//       <h2 className="text-2xl font-bold mb-6">📝 Manage Blogs</h2>

//       {/* Add Blog Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
//       >
//         <input
//           type="text"
//           placeholder="Blog Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//           className="w-full p-3 border rounded focus:ring focus:ring-orange-300"
//         />
//         <textarea
//           placeholder="Blog Content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           required
//           rows="5"
//           className="w-full p-3 border rounded focus:ring focus:ring-orange-300"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           required
//           className="block w-full text-sm text-gray-500
//                      file:mr-4 file:py-2 file:px-4
//                      file:rounded-full file:border-0
//                      file:text-sm file:font-semibold
//                      file:bg-orange-50 file:text-orange-700
//                      hover:file:bg-orange-100"
//         />
//         <button
//           type="submit"
//           className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow"
//         >
//           <FaPlus /> Add Blog
//         </button>
//       </form>

//       {/* Blog List */}
//       <h3 className="text-xl font-semibold mb-4">📚 All Blogs</h3>
//       {blogs.length === 0 ? (
//         <p className="text-gray-500">No blogs found.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {blogs.map((blog) => (
//             <div
//               key={blog._id}
//               className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
//             >
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4 flex flex-col flex-grow">
//                 <h4 className="font-bold text-lg mb-2">{blog.title}</h4>
//                 <p className="text-gray-600 text-sm flex-grow">{blog.content}</p>
//                 <button
//                   onClick={() => handleDelete(blog._id)}
//                   className="mt-4 flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
//                 >
//                   <FaTrash /> Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import axios from '../../api/axios';
import { FaTrash, FaPlus } from 'react-icons/fa';

export default function AdminBlogManager() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
      await axios.post('/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ Blog added successfully!');
      setTitle('');
      setContent('');
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm('❌ Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`/blogs/${id}`);
      alert('🗑 Blog deleted successfully!');
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold mb-6">📝 Manage Blogs</h2>

      {/* Add Blog Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 space-y-4"
      >

        
  {/* Image size guideline */}
  <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-3 rounded-md text-sm">
    📏 <strong>Image Guidelines:</strong> Please upload images with a size of 
    <strong> 153×192 rendered pixels size</strong> for best quality. Maximum file size: 500x360 rendered size
    <strong> 2MB</strong>. Accepted formats: JPG, PNG.   Also wait few sec when submit done. rendering....
  </div>

        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-3 border rounded focus:ring focus:ring-orange-300"
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="5"
          className="w-full p-3 border rounded focus:ring focus:ring-orange-300"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-orange-50 file:text-orange-700
                     hover:file:bg-orange-100"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow"
        >
          <FaPlus /> Add Blog
        </button>
      </form>

      {/* Blog List */}
      <h3 className="text-xl font-semibold mb-4">📚 All Blogs</h3>
      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="font-bold text-lg mb-2">{blog.title}</h4>
                <p className="text-gray-600 text-sm flex-grow">
                  {blog.content.length > 100
                    ? blog.content.slice(0, 100) + '...'
                    : blog.content}
                </p>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="mt-4 flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
