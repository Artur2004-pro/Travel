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
    <div className="relative w-full">
      {/* DAY CHIPS */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-2 py-3">
        {tripDays.map((d, i) => {
          const active = i === selectedIndex;

          return (
            <button
              key={d.day}
              onClick={() => setSelectedIndex(i)}
              className={`shrink-0 px-5 h-12 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center ${
                active
                  ? `bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg scale-105`
                  : `bg-white/10 dark:bg-zinc-800/30 text-zinc-400 dark:text-zinc-400 hover:bg-white/20 dark:hover:bg-zinc-700/40`
              }`}
            >
              Day {d.day}
            </button>
          );
        })}
      </div>

      {/* PROGRESS INDICATOR */}
      <div className="px-2">
        <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300"
            style={{
              width: `${((selectedIndex + 1) / tripDays.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DaySelector;
