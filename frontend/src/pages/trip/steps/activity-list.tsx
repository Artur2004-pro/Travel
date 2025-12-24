// src/pages/ActivityList.tsx
import React, { useState } from "react";
import type { IActivity } from "../../../types";
import ActivityCard from "./activity-card";
import { Search } from "lucide-react";

interface ActivityListProps {
  title: string;
  activities: IActivity[];
  selectedActivities: IActivity[];
  onToggle: (activity: IActivity) => void;
  loading: boolean;
}

const ActivityList: React.FC<ActivityListProps> = ({
  title,
  activities,
  selectedActivities,
  onToggle,
  loading,
}) => {
  const [search, setSearch] = useState("");

  const filteredActivities = activities.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-5 animate-fade-in">
      {/* TITLE */}
      {title && <h3 className="text-2xl font-semibold text-white">{title}</h3>}

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search activities"
          className="
            w-full pl-12 pr-4 py-3
            rounded-full
            bg-white/5 border border-white/10
            text-white placeholder-zinc-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
            transition shadow-sm
          "
        />
      </div>

      {/* LIST / GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredActivities.map((activity) => {
          const selected = selectedActivities.some((x) => x.id === activity.id);
          return (
            <div
              key={activity.id}
              className={`transition-transform duration-200 ease-in-out hover:scale-105 ${
                selected ? "border-2 border-blue-500 rounded-xl" : ""
              }`}
            >
              <ActivityCard
                activity={activity}
                selected={selected}
                onToggle={() => onToggle(activity)}
                disabled={loading}
              />
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {filteredActivities.length === 0 && (
        <div className="py-10 text-center text-zinc-500">
          No activities found
        </div>
      )}
    </section>
  );
};

export default ActivityList;
