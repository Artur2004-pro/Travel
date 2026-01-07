import type { ICountryProps } from "../../types";
import { EditButton, DeleteButton, ImageSection } from "../components";

export const CountryItem = ({ country, onDelete }: ICountryProps) => {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-black
        transition
        hover:shadow-lg
      "
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {country.images?.length ? (
          <ImageSection images={country.images} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-200/30 to-teal-200/20 dark:from-zinc-800 dark:to-zinc-900" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Title */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
            {country.name}
          </h3>
        </div>

        {/* Actions */}
        <div
          className="
            absolute top-2 right-2
            flex gap-1
            opacity-100 sm:opacity-0
            sm:group-hover:opacity-100
            transition
          "
        >
          <EditButton to={`/admin/country/${country._id}`} small />
          <DeleteButton
            id={country._id}
            onClick={() => onDelete(country._id)}
            small
          />
        </div>
      </div>

      {/* Meta */}
      <div className="px-4 py-3">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {country.description || "No description provided."}
        </p>
      </div>
    </article>
  );
};
