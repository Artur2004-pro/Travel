import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileDrawer from "../components/MobileDrawer";
import ProfileHeader from "../components/ProfileHeader";
import StatsBar from "../components/StatsBar";

function GalleryGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 md:grid-cols-3 sm:grid-cols-2">
      {items.map((src, i) => (
        <div key={i} className="aspect-square rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img src={src} alt={`post-${i}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

export default function ProfileUI() {
  const [drawer, setDrawer] = useState(false);
  const [active, setActive] = useState("profile");

  const gallery = Array.from({ length: 12 }).map((_, i) => `/images/sample-${(i % 6) + 1}.jpg`);

  return (
    <div className="min-h-screen px-4 py-6">
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} onNavigate={(k) => setActive(k)} />

      <div className="max-w-6xl mx-auto lg:flex lg:items-start lg:gap-6">
        <Sidebar active={active} onNavigate={(k) => setActive(k)} />

        <main className="flex-1">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <button onClick={() => setDrawer(true)} className="p-2 rounded-md bg-white/60 dark:bg-slate-900/60 shadow">
              Menu
            </button>
            <div className="text-lg font-semibold">{`@artur_travels`}</div>
          </div>

          <div className="space-y-4">
            <ProfileHeader username="artur_travels" bio="Traveler • Photographer • Coffee lover. Sharing trip guides and concise tips." editable onEdit={() => alert("Edit profile") } />

            <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
              <StatsBar posts={128} followers={5420} following={480} />
              <div className="mt-2 sm:mt-0">
                <button className="px-4 py-2 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:opacity-95">Message</button>
              </div>
            </div>

            <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur rounded-xl shadow-sm p-3">
              <div className="flex items-center gap-4">
                <button className="px-3 py-1 rounded-md bg-indigo-600 text-white">Posts</button>
                <button className="px-3 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60">Saved</button>
                <button className="px-3 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800/60">Tagged</button>
              </div>
            </div>

            <GalleryGrid items={gallery} />
          </div>
        </main>
      </div>
    </div>
  );
}
