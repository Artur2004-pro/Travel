// src/pages/general/mobile-bottom-nav.tsx
import { NavLink } from "react-router-dom";
import { Home, Search, PlusSquare, Map, User } from "lucide-react";

type Props = {
  onCreateClick?: () => void;
};

const items = [
  { to: "/", icon: Home },
  { to: "/trips", icon: Map },
  { to: "create", icon: PlusSquare }, // <-- this is now special
  { to: "/explore", icon: Search },
  { to: "/settings", icon: User },
];

export default function MobileBottomNav({ onCreateClick }: Props) {
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
            to={to === "create" ? "#" : to} // no actual route
            onClick={(e) => {
              if (to === "create" && onCreateClick) {
                e.preventDefault();
                onCreateClick();
              }
            }}
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
