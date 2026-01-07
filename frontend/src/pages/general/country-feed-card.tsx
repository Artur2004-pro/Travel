import { useNavigate } from "react-router-dom";
import type { Country } from "../../types";
import { ImageSection } from "../components";

type Props = {
  country: Country;
};

export default function CountryFeedCard({ country }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/admin/country/${country._id}`)}
      className="
        cursor-pointer
        rounded-2xl
        overflow-hidden
        bg-white dark:bg-zinc-950
        border border-zinc-200/70 dark:border-zinc-800
        transition
        active:scale-[0.98]
        hover:shadow-lg
      "
    >
      {/* Image */}
      <div className="aspect-square bg-zinc-100 dark:bg-zinc-900">
        <ImageSection images={country.images} />
      </div>

      {/* Content */}
      <div className="px-4 py-3 space-y-1">
        <h3 className="text-sm font-semibold tracking-tight">{country.name}</h3>

        {country.description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
            {country.description}
          </p>
        )}
      </div>
    </div>
  );
}
