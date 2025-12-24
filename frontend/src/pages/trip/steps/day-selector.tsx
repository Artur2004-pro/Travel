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
    <div className="relative">
      {/* DAY CHIPS */}
      <div
        className="
          flex gap-3 overflow-x-auto no-scrollbar
          px-2 py-3
        "
      >
        {tripDays.map((d, i) => {
          const active = i === selectedIndex;

          return (
            <button
              key={d.day}
              onClick={() => setSelectedIndex(i)}
              className={`
                shrink-0 px-4 h-9 rounded-full text-sm font-semibold
                transition-all
                ${
                  active
                    ? `
                      bg-gradient-to-r from-indigo-500 to-purple-500
                      text-white shadow-md scale-[1.05]
                    `
                    : `
                      bg-white/5 text-zinc-400
                      hover:bg-white/10
                    `
                }
              `}
            >
              Day {d.day}
            </button>
          );
        })}
      </div>

      {/* PROGRESS INDICATOR (stories style) */}
      <div className="px-2">
        <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="
              h-full
              bg-gradient-to-r from-indigo-500 to-purple-500
              transition-all duration-300
            "
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
