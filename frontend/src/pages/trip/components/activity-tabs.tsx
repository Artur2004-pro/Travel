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
    <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`relative px-6 sm:px-12 py-3 sm:py-6 rounded-2xl font-bold text-sm sm:text-xl transition-all duration-300 transform hover:scale-105
            ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl"
                : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700"
            }
          `}
        >
          {tab.label}
          {counts[tab.key] > 0 && (
            <span className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-emerald-500 text-white text-xs sm:text-sm rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-bold shadow-md">
              {counts[tab.key]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
