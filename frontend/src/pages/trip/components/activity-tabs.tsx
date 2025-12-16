// src/pages/trip/steps/day-planning/components/ActivityTabs.tsx
import React from "react";

interface ActivityTabsProps {
  activeTab: "day" | "night" | "cafe";
  onTabChange: (tab: "day" | "night" | "cafe") => void;
  counts: { day: number; night: number; cafe: number };
}

export const ActivityTabs: React.FC<ActivityTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs = [
    { key: "day" as const, label: "Ցերեկային" },
    { key: "night" as const, label: "Գիշերային" },
    { key: "cafe" as const, label: "Ռեստորաններ" },
  ];

  return (
    <div className="flex justify-center gap-8 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`relative px-12 py-6 rounded-2xl font-bold text-xl transition-all
            ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl"
                : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700"
            }
          `}
        >
          {tab.label}
          {counts[tab.key] > 0 && (
            <span className="absolute -top-3 -right-3 bg-emerald-500 text-white text-sm rounded-full w-8 h-8 flex items-center justify-center font-bold">
              {counts[tab.key]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
