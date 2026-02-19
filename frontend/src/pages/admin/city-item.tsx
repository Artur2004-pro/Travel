import type { ICityProps } from "../../types";
import { EditButton, DeleteButton, ImageSection } from "../components";
// removed unused MoreHorizontal import

export const CityItem = ({ city, onDelete }: ICityProps) => {
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
        {city.images?.length ? (
          <ImageSection images={city.images} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sky-200/30 to-teal-200/20 dark:from-zinc-800 dark:to-zinc-900" />
        )}

        {/* Overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/60
            via-black/10
            to-transparent
            opacity-90
          "
        />

        {/* Title */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
            {city.name}
          </h3>
        </div>

        {/* Actions (hover / mobile always visible) */}
        <div
          className="
            absolute top-2 right-2
            flex items-center gap-1
            opacity-100 sm:opacity-0
            sm:group-hover:opacity-100
            transition
          "
        >
          <EditButton to={`/admin/city/edit/${city._id}`} small />
          <DeleteButton
            id={city._id}
            onClick={() => onDelete(city._id)}
            small
          />
        </div>
      </div>

      {/* Meta */}
      <div className="px-4 py-3 space-y-1">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {city.description || "No description provided."}
        </p>
      </div>
    </article>
  );
};
