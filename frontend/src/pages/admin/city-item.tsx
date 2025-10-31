import { useState } from "react";
import type { ICityProps } from "../../types";
import { useOutletContext } from "react-router-dom";
import type { IOutletContext } from "../../types";
import { DeleteButton, EditButton, EmptyState } from "../components/";
import { Axios } from "../../lib/axios-config";

export const CityItem: React.FC<ICityProps> = ({ city }) => {
  const { account } = useOutletContext<IOutletContext>();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!account || account.role !== "admin" || !city) return null;

  const activeImage = "http://localhost:9999/" + city.images[activeIndex];
  if (!account || account.role !== "admin")
    return (
      <EmptyState
        title="⛔ Access Denied"
        subtitle="Only admins can access this page"
      />
    );
  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }
    try {
      await Axios.delete(`city/${id}`);
    } catch (error) {
      return;
    }
  };
  return (
    <div className="max-w-sm w-full bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* 🖼️ Image section */}
      <div className="relative group">
        <img
          src={activeImage}
          alt={city.name}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* 🔘 Hover dots overlay */}
        <div className="absolute z-10 bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {city.images.map((img, i) => (
            <div
              key={img}
              onClick={() => setActiveIndex(i)}
              className={`w-3.5 h-3.5 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                i === activeIndex
                  ? "bg-indigo-600 border-indigo-600 scale-110"
                  : "bg-white/70 border-white/80 hover:bg-indigo-400"
              }`}
            ></div>
          ))}
        </div>

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      </div>

      {/* 🧾 Text and controls */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-gray-800">{city.name}</h3>

        {city.images.length === 0 && (
          <p className="text-sm text-gray-400 italic">No images available</p>
        )}
        <EditButton id={city._id} />
        <DeleteButton id={city._id} onClick={handleDelete} />
      </div>
    </div>
  );
};
