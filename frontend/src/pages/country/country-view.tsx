import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { ICountryView, IResponse } from "../../types";
import { Axios } from "../../lib/axios-config";
import { ImageSection } from "../components";
import { Loader, MapPin, Plus } from "lucide-react";

export const CountryView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [country, setCountry] = useState<ICountryView | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchCountry(id);
  }, [id]);

  const fetchCountry = async (countryId: string) => {
    const { data } = await Axios.get<IResponse<ICountryView>>(`country/${countryId}`);
    setCountry(data.payload);
  };

  if (!country) {
    return <Loader />;
  }

  return (
    <div className="max-w-feed mx-auto flex flex-col gap-6 pb-20 md:pb-10">
      <div className="aspect-square bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        <ImageSection images={country.images} />
      </div>

      <header className="flex items-center gap-3 px-4">
        <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300 font-semibold">
          {country.name[0]}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{country.name}</span>
          <span className="text-xs text-neutral-500 flex items-center gap-1">
            <MapPin size={12} strokeWidth={2} />
            Country
          </span>
        </div>
      </header>

      <div className="px-4 text-sm">
        <p
          className={`text-neutral-600 dark:text-neutral-400 transition-all ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {country.description}
        </p>
        {country.description.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 text-sm font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      <div className="px-4">
        <button
          onClick={() => navigate(`/trips/new/country?country=${country._id}`)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} strokeWidth={2} />
          Create trip in {country.name}
        </button>
      </div>

      {country.cities.length > 0 && (
        <div className="px-4">
          <h3 className="font-semibold text-sm mb-4">
            Cities in {country.name}
          </h3>
          <div className="flex flex-col gap-4">
            {country.cities.map((city) => (
              <div
                key={city._id}
                className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden"
              >
                <div className="aspect-video bg-neutral-100 dark:bg-neutral-900">
                  <ImageSection images={city.images} />
                </div>
                <div className="p-3">
                  <div className="font-semibold text-sm mb-1">{city.name}</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                    {city.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryView;
