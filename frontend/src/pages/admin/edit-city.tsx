import { useForm } from "react-hook-form";
import type { ICity, IOutletContext, IResponse } from "../../types";
import { useEffect, useState } from "react";
import {
  UploadImages,
  AdminCard,
  MessagePopup,
  Loader,
  BackButton,
  EmptyState,
} from "../components";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { Axios } from "../../lib/axios-config";

export const EditCity = () => {
  const { cityId: id } = useParams();
  const { account } = useOutletContext<IOutletContext>();
  const navigate = useNavigate();

  const [city, setCity] = useState<ICity | null>(null);
  const [loading, setLoading] = useState(true);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICity>({ defaultValues: { name: "", description: "" } });

  useEffect(() => {
    const init = async () => {
      if (!id || !account) return;
      if (account.role !== "admin") return navigate("/home", { replace: true });
      await fetchCity(id);
    };
    init();
  }, [id, account]);

  const fetchCity = async (id: string) => {
    try {
      const { data } = await Axios.get<IResponse<ICity>>(`city/${id}`);
      setCity(data.payload);
      reset({
        name: data.payload.name,
        description: data.payload.description,
      });
    } catch {
      showMessage("error", "❌ Failed to fetch city data.");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (newImages.length + files.length > 5) {
      return showMessage("error", "⚠️ You can upload up to 5 images only.");
    }
    setNewImages((prev) => [...prev, ...files]);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...urls]);
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteOldImage = async (img: string, index: number) => {
    try {
      await Axios.delete(`city/${id}/photos/?filename=${img}`);
      setCity((prev) =>
        prev
          ? { ...prev, images: prev.images.filter((_, i) => i !== index) }
          : prev
      );
      showMessage("success", "🗑️ Image deleted successfully.");
    } catch {
      showMessage("error", "❌ Failed to delete image.");
    }
  };

  const submit = async (data: ICity) => {
    if (newImages.length === 0)
      return showMessage("error", "⚠️ Add at least one image before saving.");

    const formData = new FormData();
    newImages.forEach((img) => formData.append("city", img));
    formData.append("name", data.name);
    formData.append("description", data.description);

    try {
      await Axios.patch(`city/${id}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showMessage("success", "✅ City updated successfully!");
      setNewImages([]);
      setPreviews([]);
      fetchCity(id!);
    } catch {
      showMessage("error", "❌ Error updating city.");
    }
  };

  if (loading) return <Loader />;
  if (!city) return <EmptyState title="City not found 😔" />;

  return (
    <div className="relative min-h-screen bg-gray-50 py-12 px-6">
      {message && <MessagePopup {...message} />}

      <AdminCard title="🏙️ Edit City">
        {/* 🧩 Text Update Form */}
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-6 mb-10"
        >
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              City Name
            </label>
            <input
              {...register("name", { required: "Please enter a name" })}
              className={`w-full border ${
                errors.name ? "border-red-400" : "border-gray-300"
              } rounded-xl p-3 text-gray-800 focus:ring-2 focus:ring-indigo-200`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
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
            ></textarea>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-xl font-bold mb-5 text-gray-800 flex items-center gap-2">
              🖼 Manage Photos
            </h4>

            <div className="flex flex-wrap gap-4 mb-5">
              {city.images.map((img, index) => (
                <div
                  key={img}
                  className="relative w-28 h-28 border rounded-xl overflow-hidden"
                >
                  <img
                    src={`http://localhost:9999/${img}`}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteOldImage(img, index)}
                    className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <UploadImages
              label="Add new photos"
              images={newImages}
              previews={previews}
              onAdd={handleAddImage}
              onDelete={handleRemoveNewImage}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "💾 Save Changes"}
          </button>
        </form>
      </AdminCard>

      <BackButton />
    </div>
  );
};
