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

  const fetchCountry = async (id: string) => {
    const { data } = await Axios.get<IResponse<ICountryView>>(`country/${id}`);
    setCountry(data.payload);
  };

  if (!country) {
    return <Loader />;
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6 pb-10">
      {/* Image */}
      <div className="aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm">
        <ImageSection images={country.images} />
      </div>

      {/* Header */}
      <div className="px-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 flex items-center justify-center text-white font-semibold text-lg shadow">
          {country.name[0]}
        </div>

        <div className="flex flex-col">
          <span className="font-semibold text-base leading-tight">
            {country.name}
          </span>
          <span className="text-xs text-zinc-500 flex items-center gap-1">
            <MapPin size={12} />
            Country
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 text-sm">
        <p
          className={`text-zinc-700 dark:text-zinc-300 transition-all ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {country.description}
        </p>

        {country.description.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 text-sm font-semibold text-zinc-500 hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Create Trip */}
      <div className="px-4">
        <button
          onClick={() => navigate(`/trips/new/country?country=${country._id}`)}
          className="w-full flex items-center justify-center gap-2 py-3
                     rounded-xl font-semibold text-white
                     bg-gradient-to-r from-pink-500 to-orange-400
                     hover:opacity-90 transition shadow"
        >
          <Plus size={18} />
          Create trip in {country.name}
        </button>
      </div>

      {/* Cities */}
      {country.cities.length > 0 && (
        <div className="px-4">
          <h3 className="font-semibold text-sm mb-4">
            Cities in {country.name}
          </h3>

          <div className="flex flex-col gap-5">
            {country.cities.map((city) => (
              <div
                key={city._id}
                className="border border-zinc-200 dark:border-zinc-800
                           rounded-xl overflow-hidden
                           hover:shadow-sm transition"
              >
                <div className="aspect-video bg-zinc-100 dark:bg-zinc-900">
                  <ImageSection images={city.images} />
                </div>

                <div className="p-3">
                  <div className="font-semibold text-sm mb-1">{city.name}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
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
