import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import { MessagePopup } from "../components";
import type { INewCity, IShowMessage } from "../../types";

export const AddCity = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewCity>({
    defaultValues: { name: "", countryName: "", description: "" },
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState<IShowMessage | null>(null);
  const [loading, setLoading] = useState(false);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 2000);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imgs = Array.from(e.target.files);
    setFiles([...files, ...imgs]);
    setPreviews([...previews, ...imgs.map((f) => URL.createObjectURL(f))]);
  };

  const handleDelete = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: INewCity) => {
    if (files.length === 0) {
      showMessage("error", "Upload at least one image.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("countryName", data.countryName);
      formData.append("description", data.description || "");
      files.forEach((f) => formData.append("city", f));
      await Axios.post("/city", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showMessage("success", "City added successfully!");
      reset();
      setFiles([]);
      setPreviews([]);
      setTimeout(() => navigate("/admin/city"), 1000);
    } catch {
      showMessage("error", "Failed to add city.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-white/5 dark:bg-gray-900/40 backdrop-blur-lg border border-gray-200/20 shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold text-white text-center mb-6">
        Add New City
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name", { required: true })}
          placeholder="City Name"
          className="w-full p-3 rounded-xl bg-white/10 dark:bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition hover:bg-white/20 dark:hover:bg-gray-800/50"
        />
        {errors.name && (
          <p className="text-red-400 text-sm">City is required</p>
        )}

        <input
          {...register("countryName", { required: true })}
          placeholder="Country Name"
          className="w-full p-3 rounded-xl bg-white/10 dark:bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition hover:bg-white/20 dark:hover:bg-gray-800/50"
        />
        {errors.countryName && (
          <p className="text-red-400 text-sm">Country is required</p>
        )}

        <textarea
          {...register("description")}
          placeholder="Description"
          rows={3}
          className="w-full p-3 rounded-xl bg-white/10 dark:bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none transition resize-none hover:bg-white/20 dark:hover:bg-gray-800/50"
        />

        {/* Image Upload Grid */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Upload Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="w-full text-sm text-white file:bg-emerald-500 file:text-white file:rounded-full file:px-4 file:py-1 file:cursor-pointer file:hover:brightness-110 transition"
          />

          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {previews.map((src, i) => (
                <div key={i} className="relative">
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete(i)}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 shadow-sm hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Add City"}
        </button>
      </form>

      {message && <MessagePopup {...message} />}
    </div>
  );
};

export default AddCity;
