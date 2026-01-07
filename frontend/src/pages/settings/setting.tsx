import { Outlet, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Wrench, Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useThem";
import { useAuth } from "../../context/auth-context";

export default function Settings() {
  const { logout, isAuthenticated } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/login");
  }
  const navItems = [
    {
      label: "Update password",
      to: "update-password",
      icon: Wrench,
    },
    {
      label: "Update username",
      to: "update-username",
      icon: Wrench,
    },
  ];

  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 flex items-center h-14 border-b border-zinc-200 dark:border-zinc-800 px-4 bg-white dark:bg-black">
        <button onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-sm font-semibold">Settings</h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="mx-auto w-full max-w-[470px] px-0 md:px-4 py-4">
        {/* Section */}
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800 border-t border-b border-zinc-200 dark:border-zinc-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.to)}
                className="
                  w-full flex items-center gap-4
                  px-4 py-4 text-left
                  hover:bg-zinc-50 dark:hover:bg-zinc-900
                  transition
                "
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-sm">{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            );
          })}

          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="
              w-full flex items-center gap-4
              px-4 py-4
              hover:bg-zinc-50 dark:hover:bg-zinc-900
              transition
            "
          >
            {dark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-sky-500" />
            )}
            <span className="flex-1 text-sm">
              {dark ? "Light mode" : "Dark mode"}
            </span>
          </button>
        </div>

        {/* Sign out */}
        <button
          onClick={signOut}
          className="
            w-full text-center py-4 text-sm font-semibold
            text-red-600
            hover:bg-red-500/10
            transition
          "
        >
          Sign out
        </button>

        {/* Child routes */}
        <Outlet />
      </div>
    </div>
  );
}
