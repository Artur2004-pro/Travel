import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import type { Country, IResponse } from "../../types";
import { ImageSection } from "../components";
import { MapPin, Heart, MessageCircle, Bookmark } from "lucide-react";

export const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    Axios.get<IResponse<Country[]>>("country").then(({ data }) => {
      setCountries(data.payload.slice(0, 6));
    });
  }, []);

  return (
    <div className="mx-auto w-full max-w-[470px] flex flex-col gap-6">
      {countries.map((country) => (
        <article
          key={country._id}
          className="
            border border-zinc-200 dark:border-zinc-800
            bg-white dark:bg-black
            rounded-lg overflow-hidden
          "
        >
          {/* Header */}
          <header className="flex items-center gap-3 px-4 py-3">
            <div
              className="
                w-9 h-9 rounded-full
                bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400
                flex items-center justify-center
                text-white text-sm font-semibold
              "
            >
              {country.name[0]}
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">{country.name}</span>
              <span className="text-xs text-zinc-500 flex items-center gap-1">
                <MapPin size={12} />
                Country
              </span>
            </div>
          </header>

          {/* Image */}
          <div className="aspect-square bg-zinc-100 dark:bg-zinc-900">
            <ImageSection images={country.images} />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-4 pt-3">
            <div className="flex items-center gap-4">
              <button
                className="hover:text-zinc-500 transition-colors"
                aria-label="Like"
              >
                <Heart className="w-6 h-6" strokeWidth={2} />
              </button>

              <button
                className="hover:text-zinc-500 transition-colors"
                aria-label="Comment"
              >
                <MessageCircle className="w-6 h-6" strokeWidth={2} />
              </button>
            </div>

            <button
              className="hover:text-zinc-500 transition-colors"
              aria-label="Save"
            >
              <Bookmark className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>

          {/* Meta */}
          <div className="px-4 pt-2 text-sm">
            <span className="font-semibold mr-1">{country.name}</span>
            <span className="text-zinc-700 dark:text-zinc-300 line-clamp-2">
              {country.description}
            </span>
          </div>

          {/* Action */}
          <div className="px-4 pt-1 pb-3">
            <button
              className="
                text-sm font-semibold text-zinc-500
                hover:text-black dark:hover:text-white
                transition-colors
              "
            >
              View details
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Home;
