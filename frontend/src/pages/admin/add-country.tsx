import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import { BackButton, UploadImages, MessagePopup } from "../components";
import type { ICountry, IShowMessage } from "../../types";

export const AddCountry = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<ICountry>>({
    name: "",
    description: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<IShowMessage | null>(null);

  const showMessage = (type: "error" | "success", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imgs = Array.from(e.target.files);
    if (files.length + imgs.length > 5) {
      showMessage("error", "Maximum 5 images allowed.");
      return;
    }
    setFiles((prev) => [...prev, ...imgs]);
    setPreviews((prev) => [
      ...prev,
      ...imgs.map((i) => URL.createObjectURL(i)),
    ]);
  };

  const handleDelete = (i: number) => {
    setFiles(files.filter((_, x) => x !== i));
    setPreviews(previews.filter((_, x) => x !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim())
      return showMessage("error", "Country name is required");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name || "");
      formData.append("description", form.description || "");
      files.forEach((f) => formData.append("country", f));

      await Axios.post("/country", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showMessage("success", "Country added successfully!");
      setTimeout(() => navigate("/admin/country"), 1000);
    } catch {
      showMessage("error", "Failed to add country.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl glass backdrop-blur-md border border-white/10 shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-teal-400 flex items-center gap-2">
          Add New Country 🌍
        </h1>
        <BackButton to="/admin/country" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Country Name */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Country Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter country name..."
            className="w-full p-3 rounded-2xl bg-white/10 dark:bg-slate-800/30 text-white placeholder-gray-400 outline-none border border-white/20 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a short description..."
            rows={4}
            className="w-full p-3 rounded-2xl bg-white/10 dark:bg-slate-800/30 text-white placeholder-gray-400 outline-none border border-white/20 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition resize-none"
          />
        </div>

        {/* Upload Images */}
        <UploadImages
          label="Country Images"
          previews={previews}
          onAdd={handleUpload}
          onDelete={handleDelete}
        />

        {/* Submit */}
        <button
          disabled={loading}
          className={`w-full py-3 rounded-2xl font-medium transition-all shadow-md ${
            loading
              ? "bg-gray-600/50 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 via-purple-400 to-teal-400 hover:brightness-110 text-white"
          }`}
        >
          {loading ? "Saving..." : "Add Country"}
        </button>
      </form>

      {message && <MessagePopup {...message} />}
    </div>
  );
};

export default AddCountry;
