// src/pages/Hotel.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Axios } from "../../../lib/axios-config";
import { Loader } from "../../components";
import { Star } from "lucide-react";

export const Hotel: React.FC = () => {
  const navigate = useNavigate();
  const { tripData, setTripData } = useOutletContext<{
    tripData: any;
    setTripData(d: Partial<any>): void;
    setCompleted(p: Partial<any>): void;
  }>();

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
        if (!mounted) return;
        setHotels(data.payload || []);
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [tripData?.cityId]);

  const saveHotel = () => {
    setTripData({ hotelId: selectedHotel });
    navigate("/trips/day-planning");
  };

  const skipHotel = () => {
    setTripData({ hotelId: null });
    navigate("/trips/day-planning");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white tracking-wide">
          Select Hotel (optional)
        </h1>
        <button
          onClick={skipHotel}
          className="px-4 py-2 rounded-xl 
            bg-white/[0.04] 
            border border-white/10 
            hover:bg-white/[0.08] 
            transition"
        >
          Skip
        </button>
      </div>

      {loading && <Loader />}

      <div className="grid md:grid-cols-2 gap-5">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => setSelectedHotel(hotel.id)}
            className={`
              rounded-3xl overflow-hidden cursor-pointer p-4 transition 
              border backdrop-blur-xl
              ${
                selectedHotel === hotel.id
                  ? "border-indigo-500 bg-indigo-600/10 shadow-lg shadow-indigo-900/40"
                  : "border-white/10 bg-white/[0.02] hover:border-indigo-400 hover:bg-indigo-600/5"
              }
            `}
          >
            {hotel.images?.[0] && (
              <img
                src={hotel.images[0]}
                className="w-full h-40 object-cover rounded-2xl mb-3"
              />
            )}

            <div className="font-medium text-lg text-white">{hotel.name}</div>
            <div className="text-sm text-zinc-400">{hotel.address}</div>

            <div className="flex items-center mt-2">
              {Array.from({ length: hotel.stars || 0 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                />
              ))}
            </div>

            {hotel.website && (
              <a
                href={hotel.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 text-sm mt-2 inline-block hover:underline"
              >
                Visit website
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={saveHotel}
          className="px-6 py-2 rounded-xl 
            bg-gradient-to-r from-indigo-600 to-purple-600 
            text-white shadow-lg shadow-indigo-900/40
            hover:opacity-90 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Hotel;
