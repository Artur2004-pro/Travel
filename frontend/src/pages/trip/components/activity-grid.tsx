import React from "react";
import { ActivityCard } from "../steps/activity-card";
import type { ActivityGridProps } from "../trip.types";

export const ActivityGrid: React.FC<ActivityGridProps> = ({
  activities,
  selectedActivities,
  onToggle,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {activities.map((a) => (
      <ActivityCard
        key={a.id}
        activity={a}
        selected={selectedActivities.some((x) => x.id === a.id)}
        onClick={() => onToggle(a)}
        isHotel={false}
      />
    ))}
  </div>
);
