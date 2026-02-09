import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../lib/axios-config";
import type { Country, ICity, IResponse } from "../../types";
import { ImageSection } from "../components";
import { MapPin } from "lucide-react";

type Tab = "countries" | "cities";

export default function Explore() {
  const [tab, setTab] = useState<Tab>("countries");
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const [countriesRes, citiesRes] = await Promise.all([
          Axios.get<IResponse<Country[]>>("country"),
          Axios.get<IResponse<ICity[]>>("city/top"),
        ]);
        setCountries(countriesRes.data.payload?.slice(0, 12) || []);
        setCities(citiesRes.data.payload?.slice(0, 12) || []);
      } catch {
        setCountries([]);
        setCities([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="w-full max-w-feed mx-auto flex flex-col pb-20 md:pb-8">
      <div className="sticky top-0 z-10 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex">
          <button
            onClick={() => setTab("countries")}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              tab === "countries"
                ? "text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            Countries
          </button>
          <button
            onClick={() => setTab("cities")}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              tab === "cities"
                ? "text-neutral-900 dark:text-white border-b-2 border-neutral-900 dark:border-white"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            Cities
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 rounded-full border-2 border-neutral-300 dark:border-neutral-700 border-t-neutral-900 dark:border-t-white animate-spin" />
        </div>
      ) : tab === "countries" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800">
          {countries.length === 0 ? (
            <div className="col-span-full py-24 text-center text-sm text-neutral-500">
              No countries yet
            </div>
          ) : (
            countries.map((country) => (
              <button
                key={country._id}
                onClick={() => navigate(`/country/${country._id}`)}
                className="bg-white dark:bg-neutral-950 text-left"
              >
                <div className="aspect-square bg-neutral-100 dark:bg-neutral-900">
                  <ImageSection images={country.images} />
                </div>
                <div className="p-2">
                  <p className="text-sm font-semibold truncate">{country.name}</p>
                  <p className="text-xs text-neutral-500 flex items-center gap-1">
                    <MapPin size={10} strokeWidth={2} /> Country
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800">
          {cities.length === 0 ? (
            <div className="col-span-full py-24 text-center text-sm text-neutral-500">
              No cities yet
            </div>
          ) : (
            cities.map((city) => (
              <button
                key={city._id}
                onClick={() => navigate(`/country/${city.countryId || ""}`)}
                className="bg-white dark:bg-neutral-950 text-left"
              >
                <div className="aspect-square bg-neutral-100 dark:bg-neutral-900">
                  <ImageSection images={city.images} />
                </div>
                <div className="p-2">
                  <p className="text-sm font-semibold truncate">{city.name}</p>
                  <p className="text-xs text-neutral-500 line-clamp-2">{city.description}</p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
