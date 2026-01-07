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
    setTimeout(() => setMessage(null), 2500);
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
      showMessage("error", "Maximum 5 images allowed");
      return;
    }
    setFiles((p) => [...p, ...imgs]);
    setPreviews((p) => [...p, ...imgs.map(URL.createObjectURL)]);
  };

  const handleDelete = (i: number) => {
    setFiles((p) => p.filter((_, x) => x !== i));
    setPreviews((p) => p.filter((_, x) => x !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim()) {
      return showMessage("error", "Country name is required");
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

      showMessage("success", "Country added");
      setTimeout(() => navigate("/admin/country"), 800);
    } catch {
      showMessage("error", "Failed to add country");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[720px]">
      {message && <MessagePopup {...message} />}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold">Add country</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Create a new destination
          </p>
        </div>
        <BackButton to="/admin/country" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="
          space-y-5
          rounded-xl
          border border-zinc-200 dark:border-zinc-800
          bg-white dark:bg-black
          p-5
        "
      >
        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Country name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Italy"
            className="
              w-full
              rounded-lg
              border border-zinc-300 dark:border-zinc-700
              bg-transparent
              px-3 py-2
              text-sm
              outline-none
              focus:border-black dark:focus:border-white
            "
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Short description for travelers"
            className="
              w-full
              rounded-lg
              border border-zinc-300 dark:border-zinc-700
              bg-transparent
              px-3 py-2
              text-sm
              resize-none
              outline-none
              focus:border-black dark:focus:border-white
            "
          />
        </div>

        {/* Images */}
        <UploadImages
          label="Images"
          previews={previews}
          onAdd={handleUpload}
          onDelete={handleDelete}
        />

        {/* Submit */}
        <button
          disabled={loading}
          className="
            w-full
            rounded-lg
            bg-black dark:bg-white
            py-2.5
            text-sm font-medium
            text-white dark:text-black
            transition
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {loading ? "Saving..." : "Add country"}
        </button>
      </form>
    </div>
  );
};

export default AddCountry;
