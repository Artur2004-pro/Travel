import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Axios } from "../../lib/axios-config";
import type { INewCity, ICity, IOutletContext, IResponse } from "../../types";
import {
  AdminCard,
  UploadImages,
  MessagePopup,
  BackButton,
  EmptyState,
} from "../components";

export const AddCity = () => {
  const { countryId } = useParams();
  const { account } = useOutletContext<IOutletContext>();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<INewCity>();

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  useEffect(() => {
    const urls = images.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [images]);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files);
      if (images.length + files.length > 5) {
        return showMessage("error", "⚠️ Max 5 images");
      }
      setImages((prev) => [...prev, ...files]);
    }
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = async (data: INewCity) => {
    if (!countryId) return showMessage("error", "Missing country ID");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    images.forEach((img) => formData.append("city", img));

    try {
      const { data: res } = await Axios.post<IResponse<{ city: ICity }>>(
        `city/${countryId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      showMessage("success", "✅ City added successfully!");
      reset();
      setImages([]);
      navigate(`/admin/country/${countryId}/city/${res.payload.city._id}`);
    } catch {
      showMessage("error", "❌ Failed to add city.");
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
      <AdminCard title="🏙️ Add New City">
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
          <UploadImages
            label="City Images"
            images={images}
            previews={previews}
            onAdd={handleAddImage}
            onDelete={handleRemove}
          />
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              City Name
            </label>
            <input
              {...register("name", { required: "Please enter city name" })}
              type="text"
              className={`w-full border ${
                errors.name ? "border-red-400" : "border-gray-300"
              } rounded-xl p-3 text-gray-800 focus:ring-2 focus:ring-indigo-200`}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Please enter description",
              })}
              rows={4}
              className={`w-full border ${
                errors.description ? "border-red-400" : "border-gray-300"
              } rounded-xl p-3 text-gray-800 resize-none focus:ring-2 focus:ring-indigo-200`}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            💾 Save City
          </button>
        </form>
      </AdminCard>
      <BackButton />
    </div>
  );
};
