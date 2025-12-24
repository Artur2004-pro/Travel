import React from "react";
import ActivityCard from "../steps/activity-card";
import type { ActivityGridProps } from "../trip.types";

export const ActivityGrid: React.FC<ActivityGridProps> = ({
  activities,
  selectedActivities,
  onToggle,
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 p-2 sm:p-4">
    {activities.map((a) => (
      <div
        key={a.id}
        className={`relative group rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105`}
        onClick={() => onToggle(a)}
      >
        <ActivityCard
          onClick={() => onToggle(a)}
          activity={a}
          selected={selectedActivities.some((x) => x.id === a.id)}
          isHotel={false}
        />
        {selectedActivities.some((x) => x.id === a.id) && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="text-white text-xl font-bold">✓</span>
          </div>
        )}
      </div>
    ))}
  </div>
);
