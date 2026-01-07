// src/pages/general/mobile-bottom-nav.tsx
import { NavLink } from "react-router-dom";
import { Home, Search, PlusSquare, Map, User } from "lucide-react";

const items = [
  { to: "/", icon: Home },
  { to: "/trips", icon: Map },
  { to: "/trips/new", icon: PlusSquare },
  { to: "/explore", icon: Search },
  { to: "/settings", icon: User },
];

export default function MobileBottomNav() {
  return (
    <nav
      className="
        fixed bottom-0 inset-x-0 z-50 md:hidden
        border-t border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-black
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <div className="flex items-center justify-around h-[56px]">
        {items.map(({ to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `
              flex items-center justify-center flex-1 h-full
              transition-colors duration-150
              ${
                isActive
                  ? "text-black dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400"
              }
            `
            }
          >
            {({ isActive }) => (
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.6 : 2} />
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
