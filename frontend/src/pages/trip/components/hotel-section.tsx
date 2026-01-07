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
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-md">
        Հյուրանոց
      </h2>

      {!selectedHotel ? (
        <>
          {/* Search & Filter */}
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <input
              type="text"
              placeholder="Որոնել հյուրանոց..."
              value={hotelSearch}
              onChange={(e) => onHotelSearch(e.target.value)}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm hover:shadow-md transition-all"
            />
            <div className="flex items-center gap-3">
              <span className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
                Մին. աստղեր:
              </span>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={minStars}
                onChange={(e) => onMinStarsChange(Number(e.target.value))}
                className="w-24 sm:w-32 accent-indigo-500"
              />
              <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-lg w-8 text-center">
                {minStars || "-"}
              </span>
            </div>
          </div>

          {/* Hotel Grid */}
          {filteredHotels.length === 0 ? (
            <p className="text-center text-zinc-500 dark:text-zinc-400 py-10">
              Հյուրանոցներ չեն գտնվել
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 p-2 sm:p-4">
              {filteredHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="transition-transform transform hover:scale-105"
                >
                  <ActivityCard
                    activity={hotel}
                    selected={false}
                    onClick={() => onHotelSelect(hotel.id)}
                    isHotel
                  />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        // Selected Hotel View
        <div className="max-w-2xl mx-auto space-y-6">
          <ActivityCard
            activity={selectedHotel}
            selected
            onClick={() => {}}
            disabled
            isHotel
          />
          <div className="text-center">
            <button
              onClick={() => onHotelSelect(null)}
              className="px-8 sm:px-10 py-3 sm:py-4 rounded-2xl bg-zinc-800 dark:bg-zinc-700 hover:bg-zinc-700 dark:hover:bg-zinc-600 border border-zinc-600 dark:border-zinc-500 transition text-lg sm:text-xl font-semibold text-white"
            >
              Փոխել հյուրանոցը
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
