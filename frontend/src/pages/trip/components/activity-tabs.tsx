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
    <div className="flex justify-center gap-3 sm:gap-6 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`
            relative flex items-center justify-center
            px-5 sm:px-8 py-2 sm:py-3 rounded-2xl
            font-semibold text-sm sm:text-base
            transition-all duration-200
            ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }
          `}
        >
          {tab.label}
          {counts[tab.key] > 0 && (
            <span className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-emerald-500 text-white text-xs sm:text-sm rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold shadow-md">
              {counts[tab.key]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
