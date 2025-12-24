import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Globe2,
  CalendarDays,
  Coffee,
  CheckCircle2,
  Menu,
  X,
  ArrowLeft,
  Users,
} from "lucide-react";

const wizardSteps = [
  { key: "country", label: "Country", icon: Globe2, to: "country" },
  { key: "planning", label: "Trip Info", icon: CalendarDays, to: "planning" },
  {
    key: "day-planning",
    label: "Day Planning",
    icon: Coffee,
    to: "day-planning",
  },
  { key: "finish", label: "Finish", icon: CheckCircle2, to: "finish" },
];

export default function TripDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isInWizard = location.pathname.startsWith("/trips/new");
  const currentWizardStep = isInWizard
    ? location.pathname.split("/").pop()
    : null;
  const showBackButton =
    isInWizard || location.pathname.match(/\/trips\/(edit|\d+)$/);

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="mt-2 px-3 flex-1 space-y-1 overflow-y-auto">
      <button
        onClick={() => {
          navigate("/trips");
          onNavigate?.();
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
          !isInWizard ? "bg-indigo-600/20 text-indigo-300" : "hover:bg-white/5"
        }`}
      >
        <Home className="h-5 w-5" />
        {sidebarOpen && <span>My Trips</span>}
      </button>

      <div className="pt-2">
        <button
          onClick={() => {
            navigate("/trips/new/country");
            onNavigate?.();
          }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
            isInWizard
              ? "bg-emerald-600/20 text-emerald-300"
              : "hover:bg-white/5"
          }`}
        >
          <PlusCircle className="h-5 w-5" />
          {sidebarOpen && <span>New Trip</span>}
        </button>

        {sidebarOpen && isInWizard && (
          <div className="mt-2 ml-6 space-y-1">
            {wizardSteps.map((s) => {
              const Icon = s.icon;
              const active = currentWizardStep === s.to;
              return (
                <button
                  key={s.key}
                  onClick={() => {
                    navigate(`/trips/new/${s.to}`);
                    onNavigate?.();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Background Gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f19] via-[#131829] to-[#0b0f19]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[26rem] w-[46rem] rounded-full blur-3xl opacity-20 bg-gradient-to-r from-indigo-600 to-purple-600" />
      </div>

      {/* Sidebar Desktop */}
      <aside
        className={`hidden md:flex flex-col transition-all duration-300 m-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ${
          sidebarOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Globe2 className="h-5 w-5 text-white" />
          </div>
          {sidebarOpen && (
            <div className="flex-1">
              <p className="font-semibold">Bardiner Trips</p>
              <p className="text-xs text-zinc-400">Dashboard</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto h-9 w-9 rounded-xl border border-white/10 hover:bg-white/10 flex items-center justify-center"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {isMobile && mobileDrawer && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileDrawer(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 p-3 bg-[#0b0f19] border-r border-white/10">
            <div className="flex items-center justify-between px-2 py-2">
              <p className="font-semibold">Bardiner Trips</p>
              <button onClick={() => setMobileDrawer(false)}>
                <X />
              </button>
            </div>
            <SidebarContent onNavigate={() => setMobileDrawer(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <div className="flex justify-between items-center p-4 bg-white/5 dark:bg-[#0b0f19]/70 backdrop-blur-lg rounded-2xl shadow-md m-3">
          <div className="text-xl font-bold text-white">Bardiner</div>
          <div className="flex gap-4 items-center">
            <button onClick={() => navigate("/trips/new/country")}>
              <PlusCircle className="h-6 w-6 text-white" />
            </button>
            {isMobile && (
              <button onClick={() => setMobileDrawer(true)}>
                <Menu className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Back button */}
        {showBackButton && (
          <div className="px-4 mt-2 md:mt-4">
            <button
              onClick={() => navigate("/trips")}
              className="flex items-center gap-2 text-zinc-400 hover:text-white"
            >
              <ArrowLeft /> Back to Dashboard
            </button>
          </div>
        )}

        {/* Outlet (Feed / Wizard) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 md:p-6">
          <Outlet />
        </div>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 flex justify-around bg-white/5 dark:bg-[#0b0f19]/70 backdrop-blur-lg p-2 rounded-t-3xl shadow-lg md:hidden">
            <Home className="h-6 w-6 text-white" />
            <PlusCircle className="h-6 w-6 text-white" />
            <CalendarDays className="h-6 w-6 text-white" />
            <Globe2 className="h-6 w-6 text-white" />
            <Users className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
