import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  PlusCircle,
  Globe2,
  CalendarDays,
  Coffee,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  ArrowLeft,
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

  const [open, setOpen] = useState(true);
  const [mobile, setMobile] = useState(false);

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
        className={
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition " +
          (!isInWizard
            ? "bg-indigo-600/20 text-indigo-300"
            : "hover:bg-white/5")
        }
      >
        <Home className="h-5 w-5" />
        {open && <span>My Trips</span>}
      </button>

      <div className="pt-2">
        <button
          onClick={() => {
            navigate("/trips/new/country");
            onNavigate?.();
          }}
          className={
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition " +
            (isInWizard
              ? "bg-emerald-600/20 text-emerald-300"
              : "hover:bg-white/5")
          }
        >
          <PlusCircle className="h-5 w-5" />
          {open && <span>New Trip</span>}
        </button>

        {open && isInWizard && (
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
                  className={
                    "w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition " +
                    (active
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white")
                  }
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
    <div className="min-h-screen flex">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f19] via-[#131829] to-[#0b0f19]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[26rem] w-[46rem] rounded-full blur-3xl opacity-20 bg-gradient-to-r from-indigo-600 to-purple-600" />
      </div>

      {/* SIDEBAR DESKTOP */}
      <aside
        className={
          "hidden md:flex flex-col transition-all duration-300 m-3 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl " +
          (open ? "w-72" : "w-20")
        }
      >
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Globe2 className="h-5 w-5 text-white" />
          </div>
          {open && (
            <div className="flex-1">
              <p className="font-semibold">Bardiner Trips</p>
              <p className="text-xs text-zinc-400">Dashboard</p>
            </div>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-auto h-9 w-9 rounded-xl border border-white/10 hover:bg-white/10 flex items-center justify-center"
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        <SidebarContent />
      </aside>

      {/* MOBILE DRAWER */}
      {mobile && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobile(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 p-3 bg-[#0b0f19] border-r border-white/10">
            <div className="flex items-center justify-between px-2 py-2">
              <p className="font-semibold">Bardiner Trips</p>
              <button onClick={() => setMobile(false)}>
                <X />
              </button>
            </div>
            <SidebarContent onNavigate={() => setMobile(false)} />
          </aside>
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex min-w-0">
        <div className="flex-1 m-3 rounded-3xl bg-white/5 backdrop-blur-xl overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <button
              onClick={() => setMobile(true)}
              className="md:hidden mb-4 h-9 w-9 rounded-xl border border-white/10 flex items-center justify-center"
            >
              <Menu />
            </button>

            {showBackButton && (
              <button
                onClick={() => navigate("/trips")}
                className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6"
              >
                <ArrowLeft /> Back to Dashboard
              </button>
            )}

            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
