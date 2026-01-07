import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import type { ICountry, IResponse, ITripItem } from "../../../types";
import { useDebounce } from "../../../hooks/useDebounce";
import { ImageCarousel } from "../../components";
import { Globe2, Search } from "lucide-react";

export const Country: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { tripData, setTripData, setCompleted } = useOutletContext<{
    tripData: any;
    setTripData(d: Partial<any>): void;
    setCompleted(p: Partial<ITripItem>): void;
  }>();

  const [q, setQ] = useState("");
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(q, 700);
  const countryFromQuery = searchParams.get("country");

  /* SEARCH COUNTRIES */
  useEffect(() => {
    if (!debounced.trim()) {
      setCountries([]);
      return;
    }

    let active = true;

    (async () => {
      try {
        setLoading(true);
        const { data } = await Axios.get<IResponse<ICountry[]>>(
          `/country?name=${encodeURIComponent(debounced)}`
        );
        if (!active) return;
        setCountries(data.payload || []);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [debounced]);

  /* PRESELECT FROM QUERY */
  useEffect(() => {
    if (!countryFromQuery || tripData?.countryId) return;
    setTripData({ countryId: countryFromQuery });
    setCompleted({ country: true });
    navigate("/trips/new/planning", { replace: true });
  }, [countryFromQuery]);

  const selectCountry = (id: string) => {
    setTripData({ countryId: id });
    setCompleted({ country: true });
    navigate("/trips/new/planning");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* HEADER */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Choose destination
        </h1>
        <p className="text-zinc-500 mt-2 hidden sm:block">
          Search and select a country to start your trip
        </p>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search country"
          className="
            w-full pl-12 pr-4 py-3 rounded-2xl
            bg-white/5 dark:bg-zinc-900 border border-white/10 dark:border-zinc-700
            text-white dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            shadow-sm hover:shadow-md
            transition-all
          "
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-zinc-400 animate-pulse">
          Searching…
        </div>
      )}

      {/* RESULTS */}
      <div className="space-y-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:space-y-0">
        {countries.map((c) => (
          <div
            key={c._id}
            className="
              relative overflow-hidden rounded-3xl
              bg-white/5 dark:bg-zinc-800/20 border border-white/10 dark:border-zinc-700
              shadow-sm hover:shadow-lg
              cursor-pointer transition-all duration-300 active:scale-[0.98]
            "
          >
            {c.images.length > 0 && (
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <ImageCarousel images={c.images} />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-3xl" />

            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              <div className="text-lg font-semibold text-white dark:text-zinc-100">
                {c.name}
              </div>

              {c.description && (
                <div className="text-sm text-zinc-300 dark:text-zinc-400 line-clamp-2">
                  {c.description}
                </div>
              )}

              <button
                onClick={() => selectCountry(c._id)}
                className="
                  mt-2 w-full py-2.5 rounded-full
                  bg-gradient-to-r from-blue-500 to-blue-600
                  hover:from-blue-600 hover:to-blue-700
                  text-white text-sm font-semibold
                  active:scale-[0.97]
                  transition-all
                "
              >
                Create Trip
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {!loading && countries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Globe2 className="w-20 h-20 text-zinc-600 dark:text-zinc-500" />
          <p className="text-zinc-400 dark:text-zinc-400 text-center text-lg">
            {q.trim() ? "No countries found" : "Search for a country to begin"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Country;
