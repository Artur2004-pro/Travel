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
    <div className="flex justify-center items-start py-2 px-0 min-h-[80vh] bg-transparent">
      <div className="w-full max-w-2xl bg-transparent rounded-[2rem] shadow-[0_0_40px_-10px_rgba(16,185,129,0.25)] p-10 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.25)]">
            Edit City ✏️
          </h1>
          <BackButton to="/admin/city" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">
              City Name
            </label>
            <input
              {...register("name", { required: "City name is required" })}
              placeholder="City name"
              className="w-full p-3.5 rounded-xl bg-white/80 dark:bg-[#0f1624]/70 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none shadow-inner transition"
            />
            {formState.errors.name && (
              <p className="text-sm text-red-500 mt-1">
                {formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-zinc-700 dark:text-zinc-300 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              placeholder="City description..."
              rows={4}
              className="w-full p-3.5 rounded-xl bg-white/80 dark:bg-[#0f1624]/70 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none shadow-inner transition"
            />
          </div>

          <ImageCarousel
            isAdmin
            images={city.images}
            onDeleteImage={handleDeleteOldImage}
          />

          <UploadImages
            label="Upload New Images"
            previews={previews}
            onAdd={handleUpload}
            onDelete={handleDeleteNew}
          />

          <button
            disabled={!canSave}
            className={`w-full py-3.5 rounded-xl font-semibold tracking-wide transition-all duration-300 ${
              !canSave
                ? "bg-zinc-300/70 dark:bg-zinc-800/60 text-zinc-500 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-500 hover:shadow-[0_0_30px_rgba(45,212,191,0.35)] text-white"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {message && (
          <div className="mt-6">
            <MessagePopup type={message.type} text={message.text} />
          </div>
        )}
      </div>
    </div>
  );
};
