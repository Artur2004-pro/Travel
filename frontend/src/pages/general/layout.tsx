// src/pages/general/layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import MobileBottomNav from "./mobile-bottom-nav";

export default function Layout() {
  return (
    <div className="min-h-screen flex bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* MAIN SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE (everything else) */}
      <div className="flex-1 flex">
        <Outlet />
      </div>

      <MobileBottomNav />
    </div>
  );
}
