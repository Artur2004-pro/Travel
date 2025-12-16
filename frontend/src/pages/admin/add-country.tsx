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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || files.length > 5) {
      showMessage("error", "Upload images count has been 5!");
      return;
    }
    const imgs = Array.from(e.target.files);
    if (imgs.length + files.length > 5) {
      showMessage("error", "Upload images count has been 5!");
      return;
    }
    setFiles((prev) => [...prev, ...imgs]);
    setPreviews((prev) => [
      ...prev,
      ...imgs.map((i) => URL.createObjectURL(i)),
    ]);
  };
  const showMessage = (type: "error" | "success", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 2000);
  };
  const handleDelete = (i: number) => {
    setFiles(files.filter((_, x) => x !== i));
    setPreviews(previews.filter((_, x) => x !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim()) {
      showMessage("error", "Upload images count has been 5!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", form.name || "");
      formData.append("description", form.description || "");
      files.forEach((f) => formData.append("country", f));

      await Axios.post("/country", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ type: "success", text: "Country added successfully!" });
      setTimeout(() => navigate("/admin/country"), 1000);
    } catch {
      setMessage({ type: "error", text: "Failed to add country." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
          Add New Country <span className="text-xl">🌍</span>
        </h1>
        <BackButton to="/admin/country" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm mb-1">
            Country Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter country name..."
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write a short description..."
            rows={4}
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-none"
          />
        </div>

        <UploadImages
          label="Country Images"
          previews={previews}
          onAdd={handleUpload}
          onDelete={handleDelete}
        />

        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium transition-all shadow-md ${
            loading
              ? "bg-emerald-800/40 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:brightness-110 text-white"
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
