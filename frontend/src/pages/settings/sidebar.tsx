import { NavLink } from "react-router-dom";
import { Sun, Moon, ChevronRight } from "lucide-react";
import { useTheme } from "../../hooks/useThem";
import { useAuth } from "../../context/auth-context";

export default function SettingsSidebar() {
  const { dark, toggle } = useTheme();
  const { logout } = useAuth();

  const items = [
    { label: "Edit profile", to: "edit-profile" },
    { label: "Privacy", to: "privacy" },
    { label: "Update password", to: "security" },
    { label: "Update username", to: "account" },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 border-r border-zinc-200 dark:border-zinc-800">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center justify-between px-4 py-4 text-sm rounded-md ${
              isActive
                ? "bg-zinc-100 dark:bg-zinc-900 font-semibold"
                : "hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
            }`
          }
        >
          <span>{item.label}</span>
          <ChevronRight className="w-4 h-4 opacity-40" />
        </NavLink>
      ))}

      <button
        onClick={toggle}
        className="flex items-center gap-2 px-4 py-4 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
      >
        {dark ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-sky-500" />
        )}
        <span>{dark ? "Light mode" : "Dark mode"}</span>
      </button>

      <button
        onClick={logout}
        className="mt-auto px-4 py-4 text-left text-sm font-semibold text-red-600 hover:bg-red-500/10 transition"
      >
        Sign out
      </button>
    </div>
  );
}
