import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import type { Country, IResponse } from "../../types";
import { ImageSection } from "../components";
import { MapPin, Heart, MessageCircle, Bookmark } from "lucide-react";

export const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get<IResponse<Country[]>>("country").then(({ data }) => {
      setCountries(data.payload.slice(0, 6));
    });
  }, []);

  return (
    <div className="w-full max-w-feed mx-auto flex flex-col gap-0 pb-20 md:pb-8">
      {countries.map((country) => (
        <article
          key={country._id}
          className="border-b border-neutral-200 dark:border-neutral-800"
        >
          <header className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 text-sm font-semibold">
              {country.name[0]}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">{country.name}</span>
              <span className="text-xs text-neutral-500 flex items-center gap-1">
                <MapPin size={12} strokeWidth={2} />
                Country
              </span>
            </div>
          </header>

          <div
            className="aspect-square bg-neutral-100 dark:bg-neutral-900 cursor-pointer"
            onClick={() => navigate(`/country/${country._id}`)}
          >
            <ImageSection images={country.images} />
          </div>

          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-4">
              <button
                className="text-neutral-900 dark:text-white hover:opacity-70 transition-opacity"
                aria-label="Like"
              >
                <Heart className="w-6 h-6" strokeWidth={2} fill="none" />
              </button>
              <button
                className="text-neutral-900 dark:text-white hover:opacity-70 transition-opacity"
                aria-label="Comment"
              >
                <MessageCircle className="w-6 h-6" strokeWidth={2} />
              </button>
            </div>
            <button
              className="text-neutral-900 dark:text-white hover:opacity-70 transition-opacity"
              aria-label="Save"
            >
              <Bookmark className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>

          <div className="px-4 pb-3 text-sm">
            <span className="font-semibold mr-1">{country.name}</span>
            <span className="text-neutral-600 dark:text-neutral-400 line-clamp-2">
              {country.description}
            </span>
          </div>

          <div className="px-4 pb-4">
            <button
              onClick={() => navigate(`/country/${country._id}`)}
              className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
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
