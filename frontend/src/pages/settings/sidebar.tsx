import { NavLink } from "react-router-dom";
import { Sun, Moon, ChevronRight } from "lucide-react";
import { useTheme } from "../../hooks/useThem";
import { useAuth } from "../../context/auth-context";

export default function SettingsSidebar() {
  const { dark, toggle } = useTheme();
  const { logout } = useAuth();

  const items = [
    { label: "Edit profile", to: "edit-profile" },
    { label: "Appearance", to: "appearance" },
    { label: "Password", to: "security" },
    { label: "Account", to: "account" },
  ];

  return (
    <aside className="hidden md:flex md:flex-col md:w-60 md:sticky md:top-6 md:h-[calc(100vh-48px)] flex-col border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 z-40">
      <div className="px-4 pt-6 pb-4">
        <h2 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          Settings
        </h2>
      </div>
      <nav className="px-2 space-y-0.5 flex-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`
            }
          >
            <span>{item.label}</span>
            <ChevronRight className="w-4 h-4 opacity-40" strokeWidth={2} />
          </NavLink>
        ))}
      </nav>
      <div className="p-2 space-y-0.5">
        <button
          onClick={toggle}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {dark ? (
            <Sun className="w-5 h-5" strokeWidth={2} />
          ) : (
            <Moon className="w-5 h-5" strokeWidth={2} />
          )}
          <span>{dark ? "Light mode" : "Dark mode"}</span>
        </button>
        <button
          onClick={logout}
          className="w-full px-4 py-2.5 rounded-lg text-left text-sm font-semibold text-red-600 hover:bg-red-500/10 transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
