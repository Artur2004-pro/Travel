// src/pages/general/layout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import MobileBottomNav from "./mobile-bottom-nav";
import CreateBottomSheet from "../components/create-bottom-sheet";
import { PlusSquare } from "lucide-react";

export default function Layout() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* MAIN SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE (everything else) */}
      <div className="flex-1 flex flex-col">
        {/* Desktop top bar with + button */}
        <div className="hidden md:flex items-center justify-end p-4 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
          >
            <PlusSquare className="w-5 h-5" />
            Create
          </button>
        </div>

        <div className="flex-1 flex">
          <Outlet />
        </div>
      </div>

      {/* Mobile bottom nav */}
      <MobileBottomNav />

      {/* Create Bottom Sheet */}
      <CreateBottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  );
}
