import { useNavigate } from "react-router-dom";
import type { Country } from "../../types";
import { ImageSection } from "../components";

type Props = {
  country: Country;
};

export default function CountryFeedCard({ country }: Props) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/country/${country._id}`)}
      className="cursor-pointer border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-neutral-950 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
    >
      <div className="aspect-square bg-neutral-100 dark:bg-neutral-900">
        <ImageSection images={country.images} />
      </div>
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold">{country.name}</h3>
        {country.description && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-0.5">
            {country.description}
          </p>
        )}
      </div>
    </article>
  );
}
