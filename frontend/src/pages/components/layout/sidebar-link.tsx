import type { ISidebarProps } from "../../../types";
import { NavLink } from "react-router-dom";

export function SidebarLink({ item, onClick }: ISidebarProps) {
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      end
      className={({ isActive }) =>
        [
          "flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition",
          isActive
            ? "text-black dark:text-white font-semibold"
            : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white",
        ].join(" ")
      }
    >
      <span className="text-lg">{item.icon}</span>
      <span className="truncate">{item.label}</span>
    </NavLink>
  );
}
