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
        relative flex flex-col w-full max-w-sm
        bg-gradient-to-br from-white via-indigo-50 to-indigo-100
        rounded-3xl overflow-hidden border border-indigo-100/60
        shadow-[0_8px_20px_rgba(79,70,229,0.1)]
        transition-all duration-500 ease-out
        hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(79,70,229,0.25)]
      "
    >
      {/* 🌄 Image */}
      <div className="relative group w-full h-56 overflow-hidden">
        <ImageSection images={country.images} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent pointer-events-none" />
        <h3 className="absolute bottom-3 left-4 text-white text-xl font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          {country.name}
        </h3>
      </div>

      {/* 🧾 Info Section */}
      <div className="flex flex-col justify-between flex-1 p-6">
        <p className="text-gray-600 text-sm mb-4">
          Explore the beauty of{" "}
          <span className="font-medium">{country.name}</span>.
        </p>

        {/* ⚙️ Buttons */}
        <div
          className="
            flex justify-between items-center gap-3
            border-t border-indigo-100/70 pt-4
          "
        >
          <EditButton id={country._id} />
          <DeleteButton id={country._id} onClick={handleDelete} />
        </div>
      </div>

      {/* 💫 Accent Glow */}
      <div
        className="
          absolute inset-0 rounded-3xl pointer-events-none
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          bg-gradient-to-br from-indigo-300/30 via-purple-200/20 to-pink-300/30 blur-xl
        "
      />
    </div>
  );
};
