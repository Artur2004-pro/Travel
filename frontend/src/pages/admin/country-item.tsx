import type { ICountryProps } from "../../types";
import { Axios } from "../../lib/axios-config";
import { ImageSection, DeleteButton, EditButton } from "../components";

export const CountryItem: React.FC<ICountryProps> = ({ country, onDelete }) => {
  const handleDelete = async (id: string) => {
    if (!confirm(`🗑️ Delete "${country.name}"?`)) return;
    try {
      await Axios.delete(`country/${id}`);
      onDelete(id);
    } catch (err) {
      console.error("❌ Error deleting country:", err);
    }
  };

  return (
    <div
      className="
        group relative flex flex-col
        w-full max-w-[460px] min-h-[460px]
        bg-white/30 backdrop-blur-2xl
        border border-white/40 shadow-[0_8px_25px_rgba(0,0,0,0.05)]
        rounded-3xl overflow-hidden
        hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(79,70,229,0.15)]
        transition-all duration-300
      "
    >
      {/* 🌄 Image */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
        <ImageSection images={country.images} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
        <h3 className="absolute bottom-4 left-4 text-white font-semibold text-lg drop-shadow-lg tracking-wide">
          {country.name}
        </h3>
      </div>

      {/* 📜 Description */}
      <div className="flex flex-col justify-between flex-1 p-6">
        <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-3">
          {country.description || "No description provided."}
        </p>

        {/* ⚙️ Buttons */}
        <div
          className="
            flex justify-between items-center
            border-t border-white/30 pt-5 mt-auto
          "
        >
          <EditButton id={country._id} />
          <DeleteButton id={country._id} onClick={handleDelete} />
        </div>
      </div>

      {/* Accent Glow */}
      <div
        className="
          absolute inset-0 rounded-3xl pointer-events-none
          opacity-0 group-hover:opacity-100
          transition-all duration-500
          bg-gradient-to-br from-indigo-300/20 via-transparent to-purple-300/20
        "
      />
    </div>
  );
};
