import type { ICityProps } from "../../types";
import { EditButton, DeleteButton, ImageSection } from "../components";

export const CityItem = ({ city, onDelete }: ICityProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/20 dark:border-slate-700/20 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image Section */}
      <div className="relative w-full h-64 sm:h-80 md:h-64">
        {city.images?.length ? (
          <ImageSection images={city.images} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-200/30 to-teal-200/20 dark:from-slate-800 dark:to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <h3 className="absolute bottom-3 left-3 text-lg sm:text-xl font-semibold text-white drop-shadow-md">
          {city.name}
        </h3>
      </div>

      {/* Description */}
      <div className="p-3 sm:p-4 flex flex-col justify-between space-y-2 sm:space-y-3">
        <p className="text-sm sm:text-base line-clamp-2 text-zinc-700 dark:text-zinc-300">
          {city.description || "No description provided."}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-2">
          <EditButton to={`/admin/city/edit/${city._id}`} small />
          <DeleteButton
            id={city._id}
            onClick={() => onDelete(city._id)}
            small
          />
        </div>
      </div>
    </div>
  );
};
