// src/pages/Hotel.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import { Loader } from "../../components";
import { Star, ExternalLink, ChevronLeft } from "lucide-react";

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
    <div className="min-h-screen bg-white dark:bg-black">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
        <div className="h-12 px-3 flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft />
          </button>
          <h1 className="flex-1 text-center text-sm font-semibold">
            Select hotel
          </h1>
          <button onClick={skip} className="text-sm text-zinc-500 font-medium">
            Skip
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-xl mx-auto px-3 py-4 space-y-4 pb-28">
        {loading && <Loader />}

        {hotels.map((hotel) => {
          const active = selectedHotel === hotel.id;

          return (
            <div
              key={hotel.id}
              onClick={() => setSelectedHotel(hotel.id)}
              className={`
                rounded-xl overflow-hidden cursor-pointer
                border transition
                ${
                  active
                    ? "border-sky-500"
                    : "border-zinc-200 dark:border-zinc-800"
                }
              `}
            >
              {/* IMAGE */}
              {hotel.images?.[0] && (
                <div className="relative">
                  <img
                    src={hotel.images[0]}
                    className="w-full h-44 object-cover"
                  />
                  {active && (
                    <div className="absolute inset-0 ring-2 ring-sky-500" />
                  )}
                </div>
              )}

              {/* INFO */}
              <div className="px-3 py-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-medium">{hotel.name}</div>
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
      </div>

      {/* MOBILE BOTTOM CTA */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/90 dark:bg-black/90 backdrop-blur border-t border-zinc-200 dark:border-zinc-800 px-4 py-3">
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
