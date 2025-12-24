import type { ICountryProps } from "../../types";
import { EditButton, DeleteButton, ImageSection } from "../components";

export const CountryItem = ({ country, onDelete }: ICountryProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/20 dark:border-slate-700/20 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Cover */}
      <div className="relative w-full h-64 sm:h-72 md:h-64">
        {country.images?.length ? (
          <ImageSection images={country.images} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-200/30 to-teal-200/20 dark:from-slate-800 dark:to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <h3 className="absolute bottom-3 left-3 text-lg sm:text-xl font-semibold text-white drop-shadow-md">
          {country.name}
        </h3>
      </div>

      {/* Description */}
      <div className="p-3 sm:p-4 flex flex-col justify-between space-y-2 sm:space-y-3">
        <p className="text-sm sm:text-base line-clamp-2 text-zinc-700 dark:text-zinc-300">
          {country.description || "No description provided."}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-2">
          <EditButton to={`/admin/country/${country._id}`} small />
          <DeleteButton id={country._id} onClick={() => onDelete(country._id)} small />
        </div>
      </div>
    </div>
  );
};
