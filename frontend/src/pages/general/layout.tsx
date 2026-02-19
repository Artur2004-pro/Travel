import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import MobileBottomNav from "./mobile-bottom-nav";
import CreateBottomSheet from "../components/create-bottom-sheet";

export default function Layout() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Sidebar onSheetOpen={() => setSheetOpen(true)} />

      <div className="flex-1 flex md:ml-[72px] xl:ml-[244px] min-h-screen">
        <main className="flex-1 flex justify-center min-w-0">
          <Outlet />
        </main>
        <aside className="hidden xl:block w-[320px] flex-shrink-0" />
      </div>

      <MobileBottomNav onCreateClick={() => setSheetOpen(true)} />

      <CreateBottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  );
}
