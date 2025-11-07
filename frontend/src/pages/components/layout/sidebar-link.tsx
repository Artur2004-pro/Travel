import type { ISidebarProps } from "../../../types";
import { useLocation, NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function SidebarLink({ item, onClick }: ISidebarProps) {
  const location = useLocation();
  const isActive =
    location.pathname === item.to ||
    (item.to.endsWith("/") && location.pathname === item.to.slice(0, -1));

  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      end
      className={({ isActive: routeActive }) =>
        [
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all select-none border border-transparent",
          routeActive || isActive
            ? "bg-gradient-to-r from-emerald-500/15 to-emerald-400/10 border-emerald-400/20 text-emerald-400"
            : "text-zinc-400 hover:text-white hover:bg-white/5",
        ].join(" ")
      }
    >
      <span className="shrink-0">{item.icon}</span>
      <span className="truncate">{item.label}</span>
      <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-50 transition-opacity" />
    </NavLink>
  );
}
