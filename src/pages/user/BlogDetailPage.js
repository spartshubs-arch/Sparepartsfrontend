import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";

// Minimal safety pass before rendering admin-authored HTML — strips
// anything that could execute code, even though this content only ever
// comes from your own admin panel.
function sanitize(html) {
  return (html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+=["'][^"']*["']/gi, "")
    .replace(/javascript:/gi, "");
}

function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// Rough reading-time estimate from the plain-text length of the HTML
// content — a small, standard editorial touch (~200 words/min).
function estimateReadTime(html) {
  const text = (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200));
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
    return (
      <div className="min-h-screen bg-gray-50 pt-36 sm:pt-28 lg:pt-32">
        <p className="text-center text-lg text-gray-500">Loading blog...</p>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center pt-36">
          <p className="text-2xl font-bold text-gray-800">Blog not found</p>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const publishedDate = formatDate(blog.createdAt);
  const readTime = estimateReadTime(blog.content);

  return (
    // Light gray page background makes the white article card read as a
    // deliberate, contained piece of content rather than text floating
    // directly on the page background with nothing framing it.
    <div className="min-h-screen bg-gray-50 pt-32 sm:pt-28 lg:pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm transition hover:border-orange-400 hover:text-orange-600 mb-6"
        >
          ← Back to Blogs
        </Link>

        {/* Article card — wider container (max-w-5xl vs the old max-w-3xl)
            plus generous internal padding is what removes the "narrow
            column stranded on a huge white page" look. The card's own
            shadow/border gives it a defined edge instead of just ending
            in empty page background. */}
        <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 sm:h-80 lg:h-[420px] object-cover"
            />
          )}

          <div className="px-5 sm:px-10 lg:px-14 py-8 sm:py-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
              {blog.title}
            </h1>

            {(publishedDate || readTime) && (
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-8 pb-6 border-b border-gray-100">
                {publishedDate && <span>{publishedDate}</span>}
                {publishedDate && readTime && <span>·</span>}
                {readTime && <span>{readTime} min read</span>}
              </div>
            )}

            {/*
              Renders the full formatted content saved from RichTextEditor —
              headings, bold, lists, links and any images all come through
              as real HTML here, not the flattened plain-text version.
              Reading width is intentionally capped via `max-w-none` +
              container padding rather than shrinking the whole page, so
              paragraphs stay comfortable to read while the card itself
              fills the wider layout properly.
            */}
            <div
              className="prose max-w-none text-gray-700 leading-relaxed text-base sm:text-lg
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-gray-900
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-gray-800
                [&_p]:mb-4
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                [&_li]:mb-1
                [&_a]:text-orange-600 [&_a]:underline
                [&_blockquote]:border-l-4 [&_blockquote]:border-orange-200 [&_blockquote]:pl-4 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
                [&_img]:my-6 [&_img]:w-full [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl [&_img]:shadow-sm"
              dangerouslySetInnerHTML={{ __html: sanitize(blog.content) }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}
