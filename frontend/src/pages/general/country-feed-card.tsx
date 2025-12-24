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
      className="cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-md transition"
    >
      {/* Image (1:1 Instagram ratio) */}
      <div className="aspect-square bg-zinc-100 dark:bg-zinc-800">
        <ImageSection images={country.images} />
      </div>

      {/* Content */}
      <div className="p-4 space-y-1">
        <h3 className="text-sm font-semibold leading-tight">{country.name}</h3>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
          {country.description}
        </p>
      </div>
    </div>
  );
}
