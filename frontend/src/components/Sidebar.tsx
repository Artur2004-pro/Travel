import React from "react";

type NavItem = { key: string; label: string; icon?: React.ReactNode };

const items: NavItem[] = [
  { key: "profile", label: "Profile" },
  { key: "edit", label: "Edit Profile" },
  { key: "account", label: "Account Settings" },
  { key: "security", label: "Security" },
  { key: "notifications", label: "Notifications" },
  { key: "appearance", label: "Appearance" },
  { key: "logout", label: "Logout" },
];

export default function Sidebar({
  active = "profile",
  onNavigate,
}: {
  active?: string;
  onNavigate?: (key: string) => void;
}) {
  return (
    <aside className="w-60 hidden lg:flex flex-col sticky top-6 h-[calc(100vh-48px)]">
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur rounded-xl shadow-sm p-4 flex flex-col gap-2">
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Account</div>
        <nav className="mt-2 flex flex-col gap-1">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => onNavigate?.(it.key)}
              className={`text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                active === it.key
                  ? "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <span className="text-sm">{it.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">Bardiner • Settings</div>
    </aside>
  );
}
