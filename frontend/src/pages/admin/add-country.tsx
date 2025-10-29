import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Axios } from "../../lib/axios-config";
import type { INewCountry, IOutletContext } from "../../types";
import {
  AdminCard,
  UploadImages,
  MessagePopup,
  BackButton,
  EmptyState,
} from "../components";

export const AddCountry = () => {
  const { account } = useOutletContext<IOutletContext>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INewCountry>();

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const urls = images.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [images]);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (images.length >= 5) {
        showMessage("error", "⚠️ You can upload up to 5 images only.");
        return;
      }
      setImages((prev) => [...prev, e.target.files![0]]);
    }
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  const submit = async (data: INewCountry) => {
    if (images.length === 0)
      return showMessage("error", "Please add at least one image.");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    images.forEach((img) => formData.append("country", img));

    try {
      await Axios.post("country/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showMessage("success", "✅ Country added successfully!");
      reset();
      setImages([]);
    } catch {
      showMessage("error", "❌ Error adding country.");
    }
  };

  if (!account || account.role !== "admin")
    return (
      <EmptyState
        title="⛔ Access Denied"
        subtitle="Only admins can access this page"
      />
    );

  return (
    <div className="relative min-h-screen bg-gray-50 py-12 px-6">
      {message && <MessagePopup {...message} />}

      <AdminCard title="🌍 Add New Country">
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
          <UploadImages
            label="Country Images"
            images={images}
            previews={previews}
            onAdd={handleAddImage}
            onDelete={handleRemove}
          />

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Country Name
            </label>
            <input
              {...register("name", { required: "Please enter country name" })}
              type="text"
              placeholder="e.g. Armenia"
              className={`w-full border ${
                errors.name ? "border-red-400" : "border-gray-300"
              } rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-200`}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Please enter description",
              })}
              rows={4}
              placeholder="Describe the country..."
              className={`w-full border ${
                errors.description ? "border-red-400" : "border-gray-300"
              } rounded-xl p-3 text-gray-800 resize-none focus:ring-2 focus:ring-indigo-200`}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            💾 Save Country
          </button>
        </form>
      </AdminCard>

      <BackButton />
    </div>
  );
};
