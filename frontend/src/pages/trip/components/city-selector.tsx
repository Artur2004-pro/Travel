import React from "react";

interface CitySelectorProps {
  cities: { _id: string; name: string }[];
  selectedCityId: string | null;
  onChange: (cityId: string) => void;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  cities,
  selectedCityId,
  onChange,
}) => (
  <div className="max-w-md mx-auto">
    <label className="text-base sm:text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-2 block">
      Քաղաք
    </label>
    <div className="relative">
      <select
        value={selectedCityId || ""}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm hover:shadow-md transition-all cursor-pointer"
      >
        <option value="">Ընտրել քաղաք...</option>
        {cities.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Arrow icon */}
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
        ▼
      </span>
    </div>
  </div>
);
