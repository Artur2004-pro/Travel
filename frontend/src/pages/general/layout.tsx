// src/pages/general/layout.tsx
import { Outlet } from "react-router-dom";
import Header from "./header";
import MobileBottomNav from "./mobile-bottom-nav";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Main */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-0 sm:px-6 py-2 sm:py-6 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
