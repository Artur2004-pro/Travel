import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Axios } from "../../lib/axios-config";
import type { IOutletContext, ICountry, IResponse } from "../../types";
import {
  AdminCard,
  UploadImages,
  MessagePopup,
  Loader,
  BackButton,
  EmptyState,
} from "../components";

export const EditCountry = () => {
  const { id } = useParams();
  const { account } = useOutletContext<IOutletContext>();
  const navigate = useNavigate();

  const [country, setCountry] = useState<ICountry | null>(null);
  const [loading, setLoading] = useState(true);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ICountry>({ defaultValues: { name: "", description: "" } });

  useEffect(() => {
    const init = async () => {
      if (!id || !account) return;
      if (account.role !== "admin") return navigate("/home", { replace: true });
      await fetchCountry(id);
    };
    init();
  }, [id, account]);

  const fetchCountry = async (id: string) => {
    try {
      const { data } = await Axios.get<IResponse<{ country: ICountry }>>(
        `country/${id}`
      );
      setCountry(data.payload.country);
      reset({
        name: data.payload.country.name,
        description: data.payload.country.description,
      });
    } catch {
      showMessage("error", "❌ Failed to fetch country data.");
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

  const handleDeleteOldImage = async (img: string, index: number) => {
    try {
      await Axios.delete(`country/${id}/photos/?filename=${img}`);
      setCountry((prev) =>
        prev
          ? { ...prev, images: prev.images.filter((_, i) => i !== index) }
          : prev
      );
      showMessage("success", "🗑️ Image deleted successfully.");
    } catch {
      showMessage("error", "❌ Failed to delete image.");
    }
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i != index));
  };

  const submit = async (data: ICountry) => {
    if (newImages.length === 0)
      return showMessage("error", "⚠️ Add at least one image before saving.");

    const formData = new FormData();
    newImages.forEach((file) => formData.append("country", file));
    formData.append("name", data.name);
    formData.append("description", data.description);

    try {
      await Axios.patch(`country/${id}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showMessage("success", "✅ Photos updated successfully!");
      setNewImages([]);
      fetchCountry(id!);
      setPreviews([]);
    } catch {
      showMessage("error", "❌ Error updating photos.");
    }
  };

  if (loading) return <Loader />;
  if (!country) return <EmptyState title="Country not found 😔" />;

  return (
    <div className="relative min-h-screen bg-gray-50 py-12 px-6">
      {message && <MessagePopup {...message} />}

      <AdminCard title="✏️ Edit Country">
        {/* 🧩 Text Update Form */}
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-6 mb-10"
        >
          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Country Name
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
              {country.images.map((img, index) => (
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

            {/* <button
            type="button"
            onClick={handlePhotosUpdate}
            className="mt-6 bg-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            💾 Save Photo Changes
          </button> */}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "💾 Save Changes"}
          </button>
        </form>

        {/* 🖼 Manage Photos */}

        {/* 🌆 Manage Cities */}
        <div className="border-t border-gray-200 mt-10 pt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => navigate(`/admin/country/${id}/city-add`)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:scale-[1.03] shadow-md transition"
          >
            ➕ Add City
          </button>
          <button
            onClick={() => navigate(`/admin/country/${id}/city`)}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:scale-[1.03] shadow-md transition"
          >
            🏙 View Cities
          </button>
        </div>
      </AdminCard>

      <BackButton />
    </div>
  );
};
