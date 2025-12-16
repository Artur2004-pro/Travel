import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, MapPin, Search, Settings } from "lucide-react";

const navItems = [
  { label: "Explore", to: "/explore" },
  { label: "Destinations", to: "/destinations" },
  { label: "Trips", to: "/trips" },
  { label: "About", to: "/about" },
  { label: "Sign In", to: "/login" },
  { label: "Get Started", to: "/signup" },
  { label: <Settings />, to: "/settings" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 backdrop-blur-xl border-b 
        "bg-white/60 border-zinc-200/60 shadow-[0_0_10px_rgba(0,0,0,0.05)]
        dark:bg-slate-950/60 dark:border-slate-800/60 dard:shadow-[0_0_20px_rgba(0,0,0,0.4)]
      `}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 🌍 Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 font-bold text-zinc-900 dark:text-zinc-100 hover:opacity-90 transition"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl shadow-md">
              <img src="/logo1.png" alt="Bardiner" className="h-6 w-6" />
            </span>
            <span className="text-lg tracking-tight">Bardiner</span>
          </NavLink>

          {/* 💻 Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r from-sky-500 to-teal-400 after:transition-all ${
                    isActive
                      ? "text-sky-500 dark:text-teal-400 after:w-full"
                      : "text-zinc-700/90 dark:text-zinc-300 hover:text-sky-500 dark:hover:text-teal-300 hover:after:w-full"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* 🔎 Search + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search places"
                className={`pl-9 pr-9 h-9 rounded-xl border transition focus:outline-none focus:ring-2 text-sm
                  border-zinc-200 bg-white/70 text-zinc-900 focus:ring-sky-400/40
                  dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:focus:ring-teal-400/40
                `}
              />
              <button
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-lg transition
                  hover:bg-zinc-100 text-zinc-600
                    dark:hover:bg-slate-700 dark:text-slate-300
                `}
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* 📱 Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border 
                border-zinc-200 hover:bg-zinc-100 
                dark:border-slate-700 dark:hover:bg-slate-800
              `}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* 📱 Mobile dropdown */}
        {open && (
          <div
            className={`md:hidden mt-2 rounded-2xl border p-4 shadow-lg
              border-zinc-200 bg-white/95 text-zinc-900
              dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100  
            `}
          >
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "text-sky-500 dark:text-teal-400"
                      : "hover:bg-zinc-100/80 dark:hover:bg-slate-800/70"
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
