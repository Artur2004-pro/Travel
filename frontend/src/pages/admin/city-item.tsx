import React from "react";
import type { ICityProps } from "../../types";
import { useOutletContext } from "react-router-dom";
import type { IOutletContext } from "../../types";
import {
  DeleteButton,
  EditButton,
  EmptyState,
  ImageSection,
} from "../components/";
import { Axios } from "../../lib/axios-config";

export const CityItem: React.FC<ICityProps> = ({ city }) => {
  const { account } = useOutletContext<IOutletContext>();

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
        <ImageSection images={city.images} />
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
