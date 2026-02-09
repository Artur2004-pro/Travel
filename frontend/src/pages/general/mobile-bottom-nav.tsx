import { NavLink } from "react-router-dom";
import { Home, Search, PlusCircle, Map, User } from "lucide-react";

type Props = {
  onCreateClick?: () => void;
};

const items = [
  { to: "/", icon: Home },
  { to: "/explore", icon: Search },
  { to: "create", icon: PlusCircle },
  { to: "/trips", icon: Map },
  { to: "/profile", icon: User },
];

export default function MobileBottomNav({ onCreateClick }: Props) {
  return (
    <nav
      className="
        fixed bottom-0 inset-x-0 z-50 md:hidden
        border-t border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-950
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <div className="flex items-center justify-around h-14">
        {items.map(({ to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to === "create" ? "#" : to}
            end={to === "/"}
            onClick={(e) => {
              if (to === "create" && onCreateClick) {
                e.preventDefault();
                onCreateClick();
              }
            }}
            className={({ isActive }) =>
              `flex items-center justify-center flex-1 h-full transition-colors
              ${isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400"}`
            }
          >
            {({ isActive }) => (
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 1.5} />
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
