import { useEffect, useState, useMemo } from "react";
import type { ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import { Loader, MessagePopup, BackButton } from "../components";
import type { ICity, IResponse, IShowMessage } from "../../types";
import { useForm } from "react-hook-form";
// removed unused icons
import { ImageGrid } from "../components/image/image-grid";

export default function EditCity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [city, setCity] = useState<ICity | null>(null);
  const [message, setMessage] = useState<IShowMessage | null>(null);
  const [loading, setLoading] = useState(true);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [imagesChanged, setImagesChanged] = useState(false);

  const { register, handleSubmit, reset, formState } = useForm<ICity>();

  useEffect(() => {
    if (id) fetchCity();
  }, [id]);

  const fetchCity = async () => {
    try {
      const isDev = (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') || import.meta.env?.DEV;
      if (isDev) {
        const mock = { status: 'ok', message: '', payload: { _id: id || 'dev', name: 'Dev City', description: '', images: [], countryId: '', top: 0 } as ICity };
        setCity(mock.payload);
        reset(mock.payload);
        setFiles([]);
        setPreviews([]);
        setImagesChanged(false);
      } else {
        const { data } = await Axios.get<IResponse<ICity>>(`/city/${id}`);
        setCity(data.payload);
        reset(data.payload);
        setFiles([]);
        setPreviews([]);
        setImagesChanged(false);
      }
    } catch {
      setMessage({ type: "error", text: "Failed to load city" });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ICity) => {
    if (!canSave) return;
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      files.forEach((f) => formData.append("city", f));

      const isDev = (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') || import.meta.env?.DEV;
      if (!isDev) await Axios.patch(`/city/${id}`, formData);
      setMessage({ type: "success", text: "City updated" });
      setTimeout(() => navigate("/admin/city"), 800);
    } catch {
      setMessage({ type: "error", text: "Update failed" });
    }
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imgs = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...imgs]);
    setPreviews((prev) => [
      ...prev,
      ...imgs.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const deleteNew = (i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const deleteOld = async (img: string) => {
    try {
      const isDev = (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') || import.meta.env?.DEV;
      if (!isDev) await Axios.delete(`/city/${id}/photos?filename=${img}`);
      setCity((c) => (c ? { ...c, images: c.images.filter((i) => i !== img) } : c));
      setImagesChanged(true);
    } catch {
      setMessage({ type: "error", text: "Failed to delete image" });
    }
  };

  const canSave = useMemo(
    () => formState.isDirty || files.length > 0 || imagesChanged,
    [formState.isDirty, files.length, imagesChanged]
  );

  if (loading || !city) return <Loader />;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      {message && <MessagePopup {...message} />}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Edit City</h1>
        <BackButton to="/admin/city" />
      </div>

      {/* Images */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-4 space-y-3">
        <ImageGrid
          oldImages={city.images}
          newImages={previews}
          onDeleteOld={deleteOld}
          onDeleteNew={deleteNew}
          onUpload={handleUpload}
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black p-4 space-y-4"
      >
        <input
          {...register("name", { required: true })}
          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
          placeholder="City name"
        />
        <textarea
          {...register("description")}
          rows={3}
          className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700"
          placeholder="Description"
        />
        <button
          disabled={!canSave}
          className={`
            w-full rounded-xl py-2.5 text-sm font-semibold transition
            ${
              canSave
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed"
            }
          `}
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
