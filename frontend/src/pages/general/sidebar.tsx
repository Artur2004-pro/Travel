import { NavLink } from "react-router-dom";
import { Home, Search, PlusSquare, Map, User } from "lucide-react";
import { useAuth } from "../../context/auth-context";

const baseItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/trips", label: "Trips", icon: Map },
  { to: "/trips/new", label: "Create", icon: PlusSquare },
  { to: "/explore", label: "Explore", icon: Search },
  { to: "/settings", label: "Profile", icon: User },
];

export default function Sidebar() {
  const { isAuthenticated } = useAuth();
  const items = isAuthenticated
    ? baseItems
    : [...baseItems, { to: "/login", label: "Login", icon: User }];

  return (
    <aside className="z-50 hidden md:flex flex-col w-[240px] h-screen border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black sticky top-0">
      {/* Header */}
      <div className="px-6 py-6 flex-shrink-0">
        <NavLink
          to="/"
          className="text-5xl font-semibold tracking-tight font-tangerine"
        >
          Bardiner
        </NavLink>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg
           ${
             isActive
               ? "font-semibold text-black dark:text-white"
               : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
           }`
            }
          >
            <Icon className="w-6 h-6" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
