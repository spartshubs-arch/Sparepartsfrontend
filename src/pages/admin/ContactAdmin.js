import React, { useEffect, useState } from "react";
import axios from "../../api/axios"; // or use fetch; adjust baseURL accordingly

export default function ContactAdmin() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    title: "",
    description: "",
    address: "",
    phones: [],
    emails: [],
    socials: [],
    formDescription: "",
    mapEmbedUrl: "",
  });

  const [bannerFile, setBannerFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/contact");
        if (res.data?.data) setData(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleArrayChange = (key, index, value) => {
    const arr = [...(data[key] || [])];
    arr[index] = value;
    setData(prev => ({ ...prev, [key]: arr }));
  };
  const addArrayItem = (key) => setData(prev => ({ ...prev, [key]: [...(prev[key]||[]), ""] }));
  const removeArrayItem = (key, idx) => setData(prev => ({ ...prev, [key]: prev[key].filter((_,i)=>i!==idx) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", data.title || "");
      fd.append("description", data.description || "");
      fd.append("address", data.address || "");
      fd.append("formDescription", data.formDescription || "");
      fd.append("mapEmbedUrl", data.mapEmbedUrl || "");
      fd.append("phones", JSON.stringify(data.phones || []));
      fd.append("emails", JSON.stringify(data.emails || []));
      fd.append("socials", JSON.stringify(data.socials || []));

      if (bannerFile) fd.append("bannerImage", bannerFile);
      if (bgFile) fd.append("contactInfoBackground", bgFile);

      const res = await axios.post("/contact", fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Saved successfully");
      if (res.data?.data) setData(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Error saving");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contact Page — Admin</h2>
      {/* Upload Guidelines */}
<div className="text-sm text-gray-700 bg-yellow-50 border border-yellow-200 p-3 rounded mb-4">
  <strong>Upload Guidelines:</strong>
  <ul className="list-disc pl-5 mt-1 space-y-1">
    <li>📐 Banner Image size: <b>500 × 350 px</b> (Rendered approx. 293 × 192 px) Also wait when sumit form few sec.</li>
    <li>🖼 Allowed image formats: <b>JPG, JPEG, PNG</b></li>
  </ul>
</div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-semibold">Title</label>
          <input value={data.title||""} onChange={e=>setData({...data,title:e.target.value})} className="border p-2 w-full rounded" />
        </div>

        <div>
          <label className="block font-semibold">Banner Image (current preview)</label>
          {data.bannerImage && <img src={data.bannerImage} alt="banner" className="w-full max-h-48 object-cover mb-2 rounded" />}
          <input type="file" accept="image/*,video/*" onChange={e=>setBannerFile(e.target.files[0])} />
        </div>

        <div>
          <label className="block font-semibold">Contact Info Background (current)</label>
          {data.contactInfoBackground && <img src={data.contactInfoBackground} alt="bg" className="w-full max-h-48 object-cover mb-2 rounded" />}
          <input type="file" accept="image/*,video/*" onChange={e=>setBgFile(e.target.files[0])} />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea value={data.description||""} onChange={e=>setData({...data,description:e.target.value})} className="border p-2 w-full rounded" />
        </div>

        <div>
          <label className="block font-semibold">Address</label>
          <input value={data.address||""} onChange={e=>setData({...data,address:e.target.value})} className="border p-2 w-full rounded" />
        </div>

        <div>
          <label className="block font-semibold">Phones</label>
          {(data.phones||[]).map((p,idx)=>(
            <div key={idx} className="flex gap-2 items-center mb-2">
              <input value={p} onChange={e=>handleArrayChange('phones', idx, e.target.value)} className="border p-2 rounded flex-1" />
              <button type="button" onClick={()=>removeArrayItem('phones', idx)} className="text-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={()=>addArrayItem('phones')} className="text-blue-600">+ Add Phone</button>
        </div>

        <div>
          <label className="block font-semibold">Emails</label>
          {(data.emails||[]).map((p,idx)=>(
            <div key={idx} className="flex gap-2 items-center mb-2">
              <input value={p} onChange={e=>handleArrayChange('emails', idx, e.target.value)} className="border p-2 rounded flex-1" />
              <button type="button" onClick={()=>removeArrayItem('emails', idx)} className="text-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={()=>addArrayItem('emails')} className="text-blue-600">+ Add Email</button>
        </div>

        <div>
          <label className="block font-semibold">Socials (JSON objects)</label>
          {(data.socials||[]).map((s,idx)=>(
            <div key={idx} className="grid grid-cols-3 gap-2 mb-2">
              <input placeholder="name" value={s.name||''} onChange={e=>{ const arr=[...data.socials]; arr[idx].name=e.target.value; setData({...data,socials:arr}) }} className="border p-2 rounded" />
              <input placeholder="icon" value={s.icon||''} onChange={e=>{ const arr=[...data.socials]; arr[idx].icon=e.target.value; setData({...data,socials:arr}) }} className="border p-2 rounded" />
              <input placeholder="link" value={s.link||''} onChange={e=>{ const arr=[...data.socials]; arr[idx].link=e.target.value; setData({...data,socials:arr}) }} className="border p-2 rounded" />
              <button type="button" onClick={()=>removeArrayItem('socials', idx)} className="text-red-600 col-span-3">Remove</button>
            </div>
          ))}
          <button type="button" onClick={()=>setData({...data,socials:[...(data.socials||[]),{name:'',icon:'',link:''}]})} className="text-blue-600">+ Add Social</button>
        </div>

        <div>
          <label className="block font-semibold">Form Description</label>
          <textarea value={data.formDescription||""} onChange={e=>setData({...data,formDescription:e.target.value})} className="border p-2 w-full rounded" />
        </div>

        <div>
          <label className="block font-semibold">Map Embed URL</label>
          <input value={data.mapEmbedUrl||""} onChange={e=>setData({...data,mapEmbedUrl:e.target.value})} className="border p-2 w-full rounded" />
          <p className="text-sm text-gray-500 mt-1">Paste the full Google Maps embed URL (src value) here.</p>
        </div>

        <div className="flex justify-end gap-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
