import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import type { Country, IResponse } from "../../types";
import { ImageSection } from "../components";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get<IResponse<Country[]>>("country").then(({ data }) =>
      setCountries(data.payload.slice(0, 6))
    );
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {countries.map((country) => (
        <div
          key={country._id}
          className="bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800"
        >
          {/* Header */}
          <div className="px-4 py-3 font-semibold">{country.name}</div>

          {/* Image */}
          <div
            className="aspect-square cursor-pointer"
            onClick={() => navigate(`/admin/country/${country._id}`)}
          >
            <ImageSection images={country.images} />
          </div>

          {/* Description */}
          <div className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {country.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
