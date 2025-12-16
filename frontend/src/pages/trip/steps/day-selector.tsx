import React from "react";
import type { ITripDayLocal } from "../trip.types";

interface DaySelectorProps {
  tripDays: ITripDayLocal[];
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  tripDays,
  selectedIndex,
  setSelectedIndex,
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {tripDays.map((d, i) => (
        <button
          key={d.day}
          onClick={() => setSelectedIndex(i)}
          className={`
            px-5 py-2.5 rounded-2xl text-sm font-medium transition-all
            backdrop-blur-xl border
            ${
              i === selectedIndex
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-900/40"
                : "bg-white/[0.05] border-white/10 text-zinc-200 hover:bg-white/[0.1]"
            }
          `}
        >
          Day {d.day} · {d.date}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
