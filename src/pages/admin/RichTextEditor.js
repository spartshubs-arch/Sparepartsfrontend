import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios";

const HEADING_TAGS = new Set(["H1", "H2", "H3", "H4", "H5", "H6"]);
const BLOCK_TAGS = new Set(["DIV", "P", "SECTION", "ARTICLE", "TR", "BLOCKQUOTE", "FIGURE", "FIGCAPTION", ...HEADING_TAGS]);

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function isSafeUrl(url) {
  const trimmed = (url || "").trim();
  return /^https?:\/\//i.test(trimmed) || /^mailto:/i.test(trimmed);
}

/**
 * Walks pasted HTML and rebuilds it as clean, predictable markup — one
 * output line per source block element, headings kept as headings, bold/
 * italic/underline preserved wherever they were actually applied (both via
 * semantic tags like <b> and via inline styles, which is how Word/Google
 * Docs often express formatting), links kept safe, and any image in the
 * pasted content (e.g. a photo from a copied article) carried over as-is
 * since it's already hosted somewhere and doesn't need re-uploading.
 */
function extractLines(root) {
  const lines = [];
  let current = [];

  function pushLine(tag) {
    const html = current.join("").trim();
    current = [];
    if (html !== "") lines.push({ html, tag });
  }

  function walk(node, fmt) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent || "").replace(/\u00A0/g, " ");
      if (text === "") return;
      let escaped = escapeHtml(text);
      if (fmt.bold) escaped = `<b>${escaped}</b>`;
      if (fmt.italic) escaped = `<i>${escaped}</i>`;
      if (fmt.underline) escaped = `<u>${escaped}</u>`;
      current.push(escaped);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const el = node;
    const tag = el.tagName;

    if (tag === "SCRIPT" || tag === "STYLE" || tag === "IFRAME") return;
    if (tag === "BR") { current.push("<br>"); return; }

    if (tag === "IMG") {
      const src = (el.getAttribute("src") || el.getAttribute("data-src") || "").trim();
      if (!src || !isSafeUrl(src)) return;
      const alt = escapeHtml(el.getAttribute("alt") || "");
      current.push(`<img src="${escapeHtml(src)}" alt="${alt}" />`);
      pushLine("p");
      return;
    }

    if (tag === "UL" || tag === "OL") {
      const liTag = tag === "UL" ? "li-ul" : "li-ol";
      el.querySelectorAll(":scope > li").forEach((li) => {
        Array.from(li.childNodes).forEach((child) => walk(child, fmt));
        pushLine(liTag);
      });
      return;
    }

    if (tag === "A") {
      const href = (el.getAttribute("href") || "").trim();
      const startLen = current.length;
      Array.from(el.childNodes).forEach((child) => walk(child, fmt));
      if (isSafeUrl(href)) {
        const inner = current.splice(startLen).join("");
        current.push(`<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${inner}</a>`);
      }
      return;
    }

    const isHeadingTag = HEADING_TAGS.has(tag);
    const style = el.getAttribute("style") || "";
    const styleBold = /font-weight\s*:\s*(bold|[6-9]\d\d)/i.test(style);
    const styleItalic = /font-style\s*:\s*italic/i.test(style);
    const styleUnderline = /text-decoration[^:;]*:[^;]*underline/i.test(style);
    const newFmt = {
      bold: fmt.bold || tag === "B" || tag === "STRONG" || styleBold,
      italic: fmt.italic || tag === "I" || tag === "EM" || tag === "FIGCAPTION" || styleItalic,
      underline: fmt.underline || tag === "U" || styleUnderline,
    };
    const isBlock = BLOCK_TAGS.has(tag);

    Array.from(el.childNodes).forEach((child) => walk(child, newFmt));

    if (isBlock) {
      if (isHeadingTag) {
        pushLine(tag === "H1" || tag === "H2" ? "h2" : "h3");
      } else if (tag === "BLOCKQUOTE") {
        pushLine("blockquote");
      } else {
        pushLine("p");
      }
    }
  }

  walk(root, { bold: false, italic: false, underline: false });
  pushLine("p");
  return lines;
}

function buildContent(lines) {
  const out = [];
  let listBuffer = null;

  function flushList() {
    if (!listBuffer) return;
    const wrap = listBuffer.tag === "li-ul" ? "ul" : "ol";
    out.push(`<${wrap}>${listBuffer.items.map((i) => `<li>${i}</li>`).join("")}</${wrap}>`);
    listBuffer = null;
  }

  for (const line of lines) {
    if (line.tag === "li-ul" || line.tag === "li-ol") {
      if (!listBuffer || listBuffer.tag !== line.tag) { flushList(); listBuffer = { tag: line.tag, items: [] }; }
      listBuffer.items.push(line.html);
      continue;
    }
    flushList();
    if (line.tag === "h2" || line.tag === "h3") {
      out.push(`<${line.tag}>${line.html}</${line.tag}>`);
    } else if (line.tag === "blockquote") {
      out.push(`<blockquote>${line.html}</blockquote>`);
    } else {
      out.push(`<p>${line.html}</p>`);
    }
  }
  flushList();
  return out.join("");
}

function cleanPastedHtml(html) {
  const parsed = new DOMParser().parseFromString(html, "text/html");
  const lines = extractLines(parsed.body);
  return buildContent(lines);
}

function plainTextToParagraphs(text) {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\u00A0/g, " ");
  const lines = normalized.split("\n").map((l) => l.replace(/[ \t]+/g, " ").trim());
  return lines.filter((l) => l !== "").map((l) => `<p>${escapeHtml(l)}</p>`).join("");
}

// Minimal safety pass on whatever ends up in the editor — strips anything
// that could execute code, even though the source is admin-only here.
function sanitize(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/\son\w+=["'][^"']*["']/gi, "")
    .replace(/javascript:/gi, "");
}

const TOOLS = [
  { cmd: "bold", label: "B", title: "Bold", bold: true },
  { cmd: "italic", label: "I", title: "Italic", italic: true },
  { cmd: "underline", label: "U", title: "Underline", underline: true },
  { cmd: "h2", label: "H2", title: "Heading", isBlock: true },
  { cmd: "h3", label: "H3", title: "Subheading", isBlock: true },
  { cmd: "insertUnorderedList", label: "• List", title: "Bullet List" },
  { cmd: "insertOrderedList", label: "1. List", title: "Numbered List" },
  { cmd: "link", label: "🔗", title: "Link", isLink: true },
  { cmd: "unlink", label: "⛓️‍💥", title: "Remove Link", isUnlink: true },
  { cmd: "removeFormat", label: "✕", title: "Clear Formatting" },
];

export default function RichTextEditor({ value, onChange, placeholder, folder = "blogs" }) {
  const editorRef = useRef(null);
  const savedRangeRef = useRef(null);
  const imageInputRef = useRef(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = sanitize(value);
    }
  }, []);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    const range = savedRangeRef.current;
    if (!range) return;
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const exec = (cmd, isBlock = false) => {
    if (isBlock) document.execCommand("formatBlock", false, cmd);
    else document.execCommand(cmd, false, undefined);
    editorRef.current?.focus();
    handleInput();
  };

  const handleLink = () => {
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !editorRef.current?.contains(sel.anchorNode)) {
      window.alert("First select the text you want to turn into a link.");
      return;
    }
    const url = window.prompt("Paste the link URL (must start with http:// or https://)", "https://");
    if (!url) return;
    if (!isSafeUrl(url)) {
      window.alert("That link needs to start with http:// or https://.");
      return;
    }
    document.execCommand("createLink", false, url.trim());
    editorRef.current?.querySelectorAll(`a[href="${url.trim()}"]`).forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
    editorRef.current?.focus();
    handleInput();
  };

  const handleUnlink = () => {
    restoreSelection();
    document.execCommand("unlink", false, undefined);
    editorRef.current?.focus();
    handleInput();
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const html = e.clipboardData.getData("text/html");
    const plain = e.clipboardData.getData("text/plain");
    const rebuilt = html ? cleanPastedHtml(html) : plainTextToParagraphs(plain);
    const clean = sanitize(rebuilt);
    document.execCommand("insertHTML", false, clean);
    handleInput();
  };

  // Uploads a locally-picked image straight to Cloudinary using the same
  // signed-upload flow the cover image already uses, then inserts the
  // resulting hosted URL into the content at the cursor position.
  const handleImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";

    try {
      setUploadingImage(true);
      restoreSelection();

      const sigRes = await axios.get(`/upload/cloudinary-signature?folder=${folder}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("adminToken")}` },
      });
      const { timestamp, signature, apiKey, cloudName, folder: uploadFolder } = sigRes.data;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", uploadFolder);

      const cloudUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
      const res = await axios.post(cloudUrl, formData);
      const secureUrl = res.data.secure_url;

      editorRef.current?.focus();
      restoreSelection();
      document.execCommand("insertImage", false, secureUrl);
      handleInput();
    } catch (err) {
      console.error(err);
      window.alert("Image upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 focus-within:border-orange-400 focus-within:ring-1 focus-within:ring-orange-400">
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-100 bg-gray-50 p-1.5">
        {TOOLS.map((t) => (
          <button
            key={t.cmd}
            type="button"
            title={t.title}
            onMouseDown={(e) => {
              e.preventDefault();
              if (t.isLink) return handleLink();
              if (t.isUnlink) return handleUnlink();
              exec(t.cmd, t.isBlock);
            }}
            className="min-w-[36px] rounded-md px-2 py-1 text-xs font-medium text-gray-600 transition hover:bg-white hover:text-gray-900 hover:shadow-sm"
          >
            {t.label}
          </button>
        ))}

        <div className="mx-1 h-5 w-px bg-gray-200" />

        <button
          type="button"
          title="Insert Image"
          disabled={uploadingImage}
          onMouseDown={(e) => { e.preventDefault(); saveSelection(); }}
          onClick={() => imageInputRef.current?.click()}
          className="min-w-[36px] rounded-md px-2 py-1 text-xs font-medium text-orange-600 transition hover:bg-white hover:shadow-sm disabled:opacity-50"
        >
          {uploadingImage ? "Uploading…" : "🖼 Image"}
        </button>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageFile}
          className="hidden"
        />
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={() => { handleInput(); saveSelection(); }}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        onPaste={handlePaste}
        data-placeholder={placeholder || "Write or paste blog content here..."}
        style={{ minHeight: "220px", overflow: "auto" }}
        className="block w-full px-4 py-3 text-sm text-gray-800 outline-none
          [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-1 [&_h2]:text-gray-900
          [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1 [&_h3]:text-gray-800
          [&_b]:font-bold [&_strong]:font-bold
          [&_i]:italic [&_em]:italic
          [&_a]:text-blue-600 [&_a]:underline
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2
          [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:my-3 [&_blockquote]:italic [&_blockquote]:text-gray-600
          [&_img]:my-3 [&_img]:max-w-full [&_img]:rounded-lg
          [&_li]:mb-1 [&_p]:mb-2 [&_p]:leading-relaxed
          empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
      />
    </div>
  );
}
