import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import {
  Loader,
  MessagePopup,
  BackButton,
  UploadImages,
  ImageCarousel,
} from "../components";
import type { ICity, IResponse, IShowMessage } from "../../types";
import { useForm } from "react-hook-form";

export const EditCity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [city, setCity] = useState<ICity | null>(null);
  const [message, setMessage] = useState<IShowMessage | null>(null);
  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [imagesChanged, setImagesChanged] = useState(false);

  const { register, handleSubmit, reset, formState } = useForm<ICity>();

  useEffect(() => {
    if (id) fetchCity();
  }, [id]);

  const fetchCity = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get<IResponse<ICity>>(`/city/${id}`);
      setCity(data.payload);
      reset(data.payload);
      setFiles([]);
      setPreviews([]);
      setImagesChanged(false);
    } catch {
      setMessage({ type: "error", text: "Failed to load city data." });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ICity) => {
    if (!canSave) return;
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      files.forEach((f) => formData.append("city", f));
      await Axios.patch(`/city/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ type: "success", text: "City updated successfully!" });
      setFiles([]);
      setPreviews([]);
      setImagesChanged(false);
      setTimeout(() => navigate("/admin/city"), 1100);
    } catch {
      setMessage({ type: "error", text: "Update failed." });
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imgs = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...imgs]);
    setPreviews((prev) => [
      ...prev,
      ...imgs.map((i) => URL.createObjectURL(i)),
    ]);
  };
  const handleDeleteNew = (i: number) => {
    setFiles((prev) => prev.filter((_, x) => x !== i));
    setPreviews((prev) => prev.filter((_, x) => x !== i));
  };
  const handleDeleteOldImage = async (filename: string) => {
    try {
      await Axios.delete(`/city/${id}/photos?filename=${filename}`);
      if (city) {
        setCity({
          ...city,
          images: city.images.filter((img) => img !== filename),
        });
      }
      setImagesChanged(true);
    } catch {
      setMessage({ type: "error", text: "Failed to delete image." });
    }
  };

  const canSave = useMemo(() => {
    return formState.isDirty || files.length > 0 || imagesChanged;
  }, [formState.isDirty, files.length, imagesChanged]);

  if (loading || !city) return <Loader />;

  return (
    <div className="flex flex-col items-center py-4 px-2 min-h-screen bg-gray-50 dark:bg-[#0f1624]">
      <div className="w-full max-w-xl bg-white dark:bg-[#1a1f2b] rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Edit City ✏️
          </h1>
          <BackButton to="/admin/city" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("name", { required: "City name is required" })}
            placeholder="City Name"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#0f1624]/70 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none"
          />
          {formState.errors.name && (
            <p className="text-sm text-red-500">
              {formState.errors.name.message}
            </p>
          )}

          <textarea
            {...register("description")}
            placeholder="City description..."
            rows={4}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-[#0f1624]/70 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:border-transparent outline-none"
          />

          {/* Image Carousel */}
          <ImageCarousel
            isAdmin
            images={city.images}
            onDeleteImage={handleDeleteOldImage}
            className="rounded-xl overflow-hidden"
          />

          {/* Upload */}
          <UploadImages
            label="Upload New Images"
            previews={previews}
            onAdd={handleUpload}
            onDelete={handleDeleteNew}
          />

          <button
            type="submit"
            disabled={!canSave}
            className={`w-full py-3 rounded-xl font-semibold text-white ${
              canSave
                ? "bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-500 hover:brightness-105"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </form>

        {message && <MessagePopup type={message.type} text={message.text} />}
      </div>
    </div>
  );
};

export default EditCity;
