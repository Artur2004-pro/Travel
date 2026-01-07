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
    <section className="space-y-6 animate-fade-in">
      {/* TITLE */}
      {title && (
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-zinc-100">
          {title}
        </h3>
      )}

      {/* SEARCH */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search activities"
          className="
            w-full pl-12 pr-4 py-3
            rounded-2xl
            bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700
            text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            shadow-sm hover:shadow-md
            transition-all
          "
        />
      </div>

      {/* LIST / GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredActivities.map((activity) => {
          const selected = selectedActivities.some((x) => x.id === activity.id);
          return (
            <div
              key={activity.id}
              className={`transition-transform duration-200 ease-in-out ${
                selected
                  ? "border-2 border-indigo-500 dark:border-indigo-400 rounded-xl"
                  : "hover:scale-105"
              }`}
            >
              <ActivityCard
                activity={activity}
                selected={selected}
                onClick={() => onToggle(activity)}
                disabled={loading}
              />
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {filteredActivities.length === 0 && (
        <div className="py-10 text-center text-zinc-500 dark:text-zinc-400">
          No activities found
        </div>
      )}
    </section>
  );
};

export default ActivityList;
