import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";

function sanitize(html) {
  return (html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+=["'][^"']*["']/gi, "")
    .replace(/javascript:/gi, "");
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setNotFound(false);

    axios.get(`/blogs/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog", err);
        setNotFound(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading blog...</p>;
  }

  if (notFound || !blog) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center pt-36">
        <p className="text-2xl font-bold text-gray-800">Blog not found</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-28 lg:pt-32 pb-16">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-orange-400 hover:text-orange-600 mb-6"
      >
        ← Back to Blogs
      </Link>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full max-h-[420px] object-cover rounded-2xl shadow-sm mb-8"
        />
      )}

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6">
        {blog.title}
      </h1>

      {/*
        Renders the full formatted content saved from RichTextEditor —
        headings, bold, lists, links and any images all come through as
        real HTML here, not the flattened plain-text version.
      */}
      <div
        className="prose max-w-none text-gray-700 leading-relaxed
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-gray-900
          [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-gray-800
          [&_p]:mb-4
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
          [&_li]:mb-1
          [&_a]:text-blue-600 [&_a]:underline
          [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
          [&_img]:my-6 [&_img]:w-full [&_img]:rounded-2xl [&_img]:shadow-sm"
        dangerouslySetInnerHTML={{ __html: sanitize(blog.content) }}
      />
    </div>
  );
}
