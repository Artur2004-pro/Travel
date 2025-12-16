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
    <section className="space-y-6">
      {title && (
        <h3 className="font-semibold text-2xl text-white tracking-wide">
          {title}
        </h3>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search activities..."
          className="
            w-full pl-12 pr-4 py-4 text-lg
            rounded-2xl
            bg-zinc-900/60 border border-zinc-700
            text-white placeholder-zinc-500
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition-all
          "
        />
      </div>

      {/* Cards */}
      <div
        className="
          grid gap-6
          sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        "
      >
        {filteredActivities.map((a) => (
          <ActivityCard
            key={a.id}
            activity={a}
            selected={selectedActivities.some((x) => x.id === a.id)}
            onToggle={() => onToggle(a)}
            disabled={loading}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <p className="text-zinc-500 text-center py-8 text-lg">
          No activities match your search.
        </p>
      )}
    </section>
  );
};

export default ActivityList;
