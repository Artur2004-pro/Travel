import React from "react";
import ActivityCard from "../steps/activity-card";
import type { ActivityGridProps } from "../trip.types";

export const ActivityGrid: React.FC<ActivityGridProps> = ({
  activities,
  selectedActivities,
  onToggle,
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 p-2 sm:p-4">
    {activities.map((a) => {
      const isSelected = selectedActivities.some((x) => x.id === a.id);

      return (
        <div
          key={a.id}
          className="relative group rounded-2xl overflow-hidden cursor-pointer border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-transform transform hover:scale-105"
          onClick={() => onToggle(a)}
        >
          <ActivityCard
            onClick={() => onToggle(a)}
            activity={a}
            selected={isSelected}
            isHotel={false}
          />

          {isSelected && (
            <div className="absolute inset-0 bg-black/40 dark:bg-white/20 flex items-center justify-center rounded-2xl">
              <span className="text-white dark:text-black text-2xl font-bold">
                ✓
              </span>
            </div>
          )}
        </div>
      );
    })}
  </div>
);

export default ActivityGrid;
