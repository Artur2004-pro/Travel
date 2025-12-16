// src/pages/trip/steps/country.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import type { ICountry, IResponse, ITripItem } from "../../../types";
import { useDebounce } from "../../../hooks/useDebounce";
import { ImageCarousel } from "../../components";
import { Globe2 } from "lucide-react"; // Added icon for empty state

export const Country: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, setTripData, setCompleted } = useOutletContext<{
    tripData: any;
    setTripData(d: Partial<any>): void;
    setCompleted(p: Partial<ITripItem>): void;
  }>();

  const [q, setQ] = useState("");
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(q, 700);

  useEffect(() => {
    if (!debounced.trim()) return setCountries([]);

    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const { data } = await Axios.get<IResponse<ICountry[]>>(
          `/country?name=${encodeURIComponent(debounced)}`
        );
        if (!mounted) return;
        setCountries(data.payload || []);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [debounced]);

  const selectCountry = (id: string) => {
    setTripData({ countryId: id });
    setCompleted({ country: true });
    navigate("/trips/new/planning");
  };

  return (
    <div className="max-w-6xl mx-auto py-14 px-4 space-y-10 flex flex-col min-h-[calc(100vh-200px)]">
      {" "}
      {/* Added flex and min-h to stretch content */}
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        Choose Your Destination
      </h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search country..."
        className="
          w-full px-6 py-4 rounded-3xl
          bg-white/[0.04] border border-white/10
          text-white placeholder-zinc-500
          focus:ring-2 focus:ring-indigo-500 focus:border-transparent
          backdrop-blur-xl shadow-lg shadow-black/20
          transition
        "
      />
      {loading && (
        <div className="text-center text-zinc-400 mt-4 animate-pulse">
          Loading...
        </div>
      )}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-6 flex-grow">
        {" "}
        {/* Added flex-grow to expand grid */}
        {countries.map((c) => (
          <div
            key={c._id}
            className="
              group relative cursor-pointer overflow-hidden rounded-3xl
              bg-white/[0.04] border border-white/10 shadow-lg shadow-black/30
              hover:shadow-2xl hover:bg-white/[0.07]
              backdrop-blur-xl transition duration-300
            "
          >
            {c.images.length > 0 && <ImageCarousel images={c.images} />}

            <div className="p-6 space-y-3">
              <div className="text-xl font-semibold text-white">{c.name}</div>

              {c.description && (
                <div className="text-sm text-zinc-400 line-clamp-3">
                  {c.description}
                </div>
              )}

              <button
                onClick={() => selectCountry(c._id)}
                className="
                  mt-4 w-full py-3 rounded-xl
                  bg-gradient-to-r from-indigo-600 to-purple-600
                  text-white font-semibold
                  shadow-md shadow-indigo-900/40
                  hover:opacity-90 transition
                "
              >
                Create Trip
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State - Added to fill space and look nice */}
      {!loading && countries.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-grow space-y-6">
          {" "}
          {/* Centered empty state */}
          <Globe2 className="w-24 h-24 text-indigo-400 opacity-50" />
          <p className="text-2xl text-zinc-400 text-center">
            {q.trim()
              ? "No countries found for your search."
              : "Start typing a country name to search."}
          </p>
          {!q.trim() && (
            <p className="text-zinc-500 text-center max-w-md">
              Explore the world! Enter a country like "France" or "Japan" to
              begin your adventure.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Country;
