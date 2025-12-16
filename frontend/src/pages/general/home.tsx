import { useEffect, useState } from "react";
import { Axios } from "../../lib/axios-config";
import type { Country, IResponse } from "../../types";
import { ImageSection } from "../components";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetTopCountries();
  }, []);

  const handleGetTopCountries = async () => {
    try {
      const { data } = await Axios.get<IResponse<{ countries: Country[] }>>(
        "country"
      );
      setCountries(data.payload.countries.slice(0, 6)); // top 6
    } catch (err) {
      console.error("Failed to fetch countries");
    }
  };

  return (
    <div className="space-y-20">
      {/* 🏔️ Hero Section */}
      <section className="text-center py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-100 via-white to-teal-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[25rem] bg-gradient-to-r from-sky-400/30 to-teal-400/30 blur-3xl opacity-40 animate-pulse-slow" />

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400 mb-6 animate-fade-in">
          Explore the World with Bardiner
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
          Discover breathtaking destinations, plan your trips, and capture your
          memories — all in one place.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="mt-8 btn-primary text-base px-6 py-3 shadow-glass hover:shadow-glass-dark"
        >
          Get Started <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </section>

      {/* 🧭 Featured Countries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400">
          Top Destinations
        </h2>

        {countries.length === 0 ? (
          <p className="text-center text-zinc-500 dark:text-zinc-400">
            No destinations available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country) => (
              <div
                key={country._id}
                className="group relative overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/admin/country/${country._id}`)}
              >
                <ImageSection images={country.images} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-semibold text-white drop-shadow-md">
                    {country.name}
                  </h3>
                  <p className="text-sm text-zinc-200 line-clamp-2 max-w-xs">
                    {country.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
