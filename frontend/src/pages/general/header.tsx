// src/pages/general/header.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { Search, Settings } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-black/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <NavLink to="/" className="font-bold text-lg">
          Bardiner
        </NavLink>

        <nav className="flex gap-6 text-sm">
          <NavLink to="/" className="hover:text-black dark:hover:text-white">
            Explore
          </NavLink>
          <NavLink
            to="/trips"
            className="hover:text-black dark:hover:text-white"
          >
            Trips
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 cursor-pointer" />
          <Settings
            onClick={() => navigate("/settings")}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}
