// src/pages/trip/steps/day-planning/components/CitySelector.tsx
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
    <label className="text-xl font-semibold text-zinc-300 mb-4 block">
      Քաղաք
    </label>
    <select
      value={selectedCityId || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-8 py-6 text-lg rounded-2xl bg-zinc-800/90 border border-zinc-700 focus:ring-4 focus:ring-indigo-500 transition-all"
    >
      <option value="">Ընտրել քաղաք...</option>
      {cities.map((c) => (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      ))}
    </select>
  </div>
);