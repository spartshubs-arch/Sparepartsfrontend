import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";


// plain text — this strips tags just for the short card preview text.
function excerptOf(html, max = 100) {
  const text = (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max) + "..." : text;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/blogs")
      .then(res => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-lg">Loading blogs...</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-4 md:px-6 lg:px-8 pt-36 sm:pt-28 lg:pt-32 pb-10">
      <h1 className="text-3xl font-bold text-center mb-2">Our Latest Blogs</h1>
      <p className="text-center text-gray-600 mb-8">
        We have <span className="font-semibold">{blogs.length}</span> blogs for you to explore!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {blogs.map(blog => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 sm:h-48 md:h-56 object-cover"
            />

            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-4 flex-grow">
                {excerptOf(blog.content)}
              </p>
              <Link
                to={`/blog/${blog._id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
