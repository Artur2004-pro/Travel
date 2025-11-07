import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import { BackButton, UploadImages, MessagePopup } from "../components";
import type { INewCity, IShowMessage } from "../../types";

export const AddCity = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewCity>({
    defaultValues: {
      name: "",
      countryName: "",
      description: "",
    },
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState<IShowMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [limited, setLimited] = useState(false);

  // ✅ helper popup
  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 2000);
  };

  // ✅ handle file upload (max 5)
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (files.length >= 5) {
      showMessage("error", "You can upload up to 5 images.");
    }
    if (!e.target.files) return;
    const imgs = Array.from(e.target.files);
    if (files.length + imgs.length > 5) {
      showMessage("error", "You can upload up to 5 images.");
      return;
    }
    setFiles([...files, ...imgs]);
    setPreviews([...previews, ...imgs.map((f) => URL.createObjectURL(f))]);
    if (files.length + imgs.length == 5) setLimited(true);
  };

  const handleDelete = (index: number) => {
    const newFiles = files.filter((_, i) => index !== i);
    setFiles(newFiles);
    setPreviews(previews.filter((_, i) => index !== i));
    if (newFiles.length < 5) setLimited(false);
  };

  // ✅ form submit
  const onSubmit = async (data: INewCity) => {
    if (files.length === 0) {
      showMessage("error", "Please upload at least one image.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("countryName", data.countryName);
      if (data.description) formData.append("description", data.description);
      files.forEach((file) => formData.append("city", file));

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
    <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
          Add New City <span className="text-xl">🏙️</span>
        </h1>
        <BackButton to="/admin/city" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* City Name */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              City Name
            </label>
            <input
              {...register("name", { required: "City name is required" })}
              placeholder="Enter city name..."
              className={`w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none border transition ${
                errors.name
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Country Name */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Country Name
            </label>
            <input
              {...register("countryName", {
                required: "Country name is required",
              })}
              placeholder="Enter country name..."
              className={`w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none border transition ${
                errors.countryName
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              }`}
            />
            {errors.countryName && (
              <p className="text-red-400 text-xs mt-1">
                {errors.countryName.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-300 text-sm mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Write a short description..."
            rows={4}
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 outline-none border border-white/10 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-none"
          />
        </div>

        {/* Upload */}
        <UploadImages
          disable={limited}
          label="City Images"
          previews={previews}
          onAdd={handleUpload}
          onDelete={handleDelete}
        />

        {/* Submit */}
        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium transition-all shadow-md ${
            loading
              ? "bg-emerald-800/40 text-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:brightness-110 text-white"
          }`}
        >
          {loading ? "Saving..." : "Add City"}
        </button>
      </form>

      {message && <MessagePopup {...message} />}
    </div>
  );
};
