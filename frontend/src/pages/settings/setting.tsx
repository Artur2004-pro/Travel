import { Outlet, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  LogOut,
  Wrench,
  ShieldCheck,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../hooks/useThem";
import type { IAccount } from "../../types";

export default function Settings() {
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Update password",
      to: "update-password",
      icon: <Wrench className="w-5 h-5" />,
    },
    {
      label: "Update username",
      to: "update-username",
      icon: <Wrench className="w-5 h-5" />,
    },
  ];

  const signOut = () => {
    localStorage.removeItem("Authorization");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 flex items-center h-14 border-b border-zinc-200 dark:border-zinc-800 px-4">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center font-semibold">Settings</h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
        {/* Navigation */}
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="w-full flex items-center gap-4 px-4 py-4 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900 transition border-b last:border-b-0 border-zinc-200 dark:border-zinc-800"
            >
              {item.icon}
              <span className="flex-1 text-sm font-medium">{item.label}</span>
              <ChevronLeft className="w-4 h-4 rotate-180 opacity-40" />
            </button>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-full flex items-center gap-4 px-4 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
          >
            {dark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-sky-500" />
            )}
            <span className="flex-1 text-sm font-medium">
              {dark ? "Light mode" : "Dark mode"}
            </span>
          </button>
        </div>

        {/* Sign out */}
        <button
          onClick={signOut}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-red-600 bg-red-500/10 hover:bg-red-500/20 transition"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>

        {/* Child routes (Profile, UpdatePassword, etc.) */}
        <Outlet />
      </div>
    </div>
  );
}
