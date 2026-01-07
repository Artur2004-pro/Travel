// src/pages/Hotel.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import { Loader } from "../../components";
import { Star, ExternalLink, ChevronLeft, Check } from "lucide-react";

export const Hotel: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, setTripData } = useOutletContext<any>();

  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(
    tripData?.hotelId || null
  );

  useEffect(() => {
    if (!tripData?.cityId) return;
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const { data } = await Axios.get(
          `/metadata/hotels?id=${tripData.cityId}`
        );
        if (mounted) setHotels(data.payload || []);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [tripData?.cityId]);

  const next = () => {
    setTripData({ hotelId: selectedHotel });
    navigate("/trips/day-planning");
  };

  const skip = () => {
    setTripData({ hotelId: null });
    navigate("/trips/day-planning");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* HEADER */}
      <header className="sticky top-0 z-30 h-12 flex items-center px-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur">
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 active:opacity-60"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="flex-1 text-center text-sm font-semibold">
          Select hotel
        </h1>

        <button onClick={skip} className="text-sm font-medium text-zinc-500">
          Skip
        </button>
      </header>

      {/* CONTENT */}
      <main className="max-w-sm mx-auto px-0 pt-2 pb-28 space-y-6">
        {loading && <Loader />}

        {hotels.map((hotel) => {
          const active = selectedHotel === hotel.id;

          return (
            <div
              key={hotel.id}
              onClick={() => setSelectedHotel(hotel.id)}
              className="cursor-pointer"
            >
              {/* IMAGE */}
              {hotel.images?.[0] && (
                <div className="relative aspect-[4/5] bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src={hotel.images[0]}
                    className="w-full h-full object-cover"
                  />

                  {active && (
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* INFO */}
              <div className="px-4 pt-3 pb-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold">{hotel.name}</div>
                    <div className="text-xs text-zinc-500">{hotel.address}</div>
                  </div>

                  {hotel.website && (
                    <a
                      href={hotel.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-zinc-400 hover:text-zinc-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {hotel.stars > 0 && (
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </main>

      {/* BOTTOM CTA */}
      <div className="fixed bottom-0 inset-x-0 border-t border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur px-4 py-3">
        <button
          onClick={next}
          disabled={!selectedHotel}
          className="w-full h-11 rounded-md bg-sky-500 text-white font-semibold text-sm disabled:opacity-40"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Hotel;
