// src/pages/trip/steps/day-planning/components/HotelSection.tsx
import React from "react";
import ActivityCard from "../steps/activity-card";
import type { HotelSectionProps } from "../trip.types";

export const HotelSection: React.FC<HotelSectionProps> = ({
  hotels,
  selectedHotel,
  hotelSearch,
  minStars,
  onHotelSearch,
  onMinStarsChange,
  onHotelSelect,
  loading,
}) => {
  const filteredHotels = hotels
    .filter(
      (h) =>
        h.name?.toLowerCase().includes(hotelSearch.toLowerCase()) &&
        (h.stars || 0) >= minStars
    )
    .sort((a, b) => (b.stars || 0) - (a.stars || 0));

  if (loading) return null;

  return (
    <div className="space-y-10">
      <h2 className="text-4xl font-bold text-center">Հյուրանոց</h2>

      {!selectedHotel ? (
        <>
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-6 justify-center">
            <input
              type="text"
              placeholder="Որոնել հյուրանոց..."
              value={hotelSearch}
              onChange={(e) => onHotelSearch(e.target.value)}
              className="px-6 py-4 rounded-2xl bg-zinc-800/80 border border-zinc-700 focus:ring-4 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-3">
              <span className="text-zinc-400">Մին. աստղեր:</span>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={minStars}
                onChange={(e) => onMinStarsChange(Number(e.target.value))}
                className="w-32 accent-indigo-500"
              />
              <span className="text-xl w-12 text-center">
                {minStars || "-"}
              </span>
            </div>
          </div>

          {filteredHotels.length === 0 ? (
            <p className="text-center text-zinc-500 py-10">
              Հյուրանոցներ չեն գտնվել
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHotels.map((hotel) => (
                <ActivityCard
                  key={hotel.id}
                  activity={hotel}
                  selected={false}
                  onClick={() => onHotelSelect(hotel.id)}
                  isHotel={true}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="max-w-2xl mx-auto space-y-8">
          <ActivityCard
            activity={selectedHotel}
            selected={true}
            onClick={() => {}}
            disabled
            isHotel={true}
          />
          <div className="text-center">
            <button
              onClick={() => onHotelSelect(null)}
              className="px-10 py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 transition text-lg"
            >
              Փոխել հյուրանոցը
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
