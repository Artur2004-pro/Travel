import { NavLink } from "react-router-dom";
import { Home, Search, PlusSquare, Map, User } from "lucide-react";
import { useAuth } from "../../context/auth-context";

const baseItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/trips", label: "Trips", icon: Map },
  { to: "/trips/new", label: "Create", icon: PlusSquare },
  { to: "/explore", label: "Explore", icon: Search },
  { to: "/profile", label: "Profile", icon: User },
];

interface SidebarProp {
  onSheetOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProp> = ({ onSheetOpen }) => {
  const { account } = useAuth();
  const items = account
    ? baseItems
    : [...baseItems.filter((i) => i.to !== "/profile"), { to: "/login", label: "Login", icon: User }];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-[72px] xl:w-[244px] border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 z-40">
      <div className="flex flex-col flex-1 pt-4 pb-4 px-3 xl:px-4">
        <NavLink
          to="/"
          className="flex items-center justify-center xl:justify-start h-12 xl:pl-3 mb-2"
        >
          <span className="text-xl xl:text-2xl font-semibold tracking-tight">Bardiner</span>
        </NavLink>

        <nav className="flex-1 mt-4 space-y-1">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={label === "Create" ? () => onSheetOpen(true) : undefined}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 xl:px-4 py-2.5 rounded-lg transition-colors
                ${isActive
                  ? "font-semibold text-neutral-900 dark:text-white"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/50"
                }`
              }
            >
              <Icon className="w-6 h-6 flex-shrink-0" strokeWidth={1.5} />
              <span className="hidden xl:inline text-[15px]">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
