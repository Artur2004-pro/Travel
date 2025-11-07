import type { ICountryProps } from "../../types";
import { EditButton, DeleteButton, ImageSection } from "../components";

export const CountryItem = ({ country, onDelete }: ICountryProps) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Cover */}
      <div className="relative">
        {country.images?.length ? (
          <ImageSection images={country.images} />
        ) : (
          <div className="h-44 bg-gradient-to-br from-sky-200/40 to-teal-200/30 dark:from-slate-800 dark:to-slate-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <h3 className="absolute bottom-3 left-4 text-xl font-semibold text-white drop-shadow-md">
          {country.name}
        </h3>
      </div>

      {/* Description */}
      <div className="p-4 space-y-3">
        <p className="text-sm line-clamp-2 text-zinc-600 dark:text-zinc-400">
          {country.description || "No description provided."}
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-3">
          <EditButton to={`/admin/country/${country._id}`} />
          <DeleteButton
            id={country._id}
            onClick={() => onDelete(country._id)}
          />
        </div>
      </div>
    </div>
  );
};
