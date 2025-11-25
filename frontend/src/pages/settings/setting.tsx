import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import type { IAccount, IResponse } from "../../types";
import { Axios } from "../../lib/axios-config";
import { EmptyState, SidebarLink } from "../components";

export function Settings() {
  const [open, setOpen] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [account, setAccount] = useState<IAccount | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    handleGetAccount();
  }, []);
  const toggleSidebar = () => setOpen((v) => !v);

  const navItems: any[] = [
    {
      label: "update password",
      to: "update-password",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      label: "update username",
      to: "update-username",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
  ];
  const signOut = () => {
    localStorage.removeItem("Authorization");
    navigate("/");
  };
  const handleGetAccount = async () => {
    try {
      const { data } = await Axios.get<IResponse<IAccount>>("account/");
      setAccount(data.payload);
    } catch (error) {
      setAccount(null);
    }
  };
  if (!account || account.role != "admin") {
    return (
      <EmptyState title="Cannot access" icon="❌" subtitle="You not admin" />
    );
  }
  return (
    <div className="min-h-screen flex">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[26rem] w-[46rem] rounded-full blur-3xl opacity-25 bg-gradient-to-r from-sky-400 to-teal-400 dark:from-sky-700/40 dark:to-teal-600/40 animate-pulse-slow" />
      </div>

      {/* SIDEBAR (desktop) */}
      <aside
        className={[
          "hidden md:flex flex-col transition-all duration-300",
          open ? "w-72" : "w-20",
          "m-3 rounded-3xl glass border border-zinc-200/50 dark:border-slate-800/50",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-4 py-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl shadow-md">
            <img src="/logo1.png" alt="Bardiner" className="h-6 w-6" />
          </span>
          {open && (
            <div className="flex-1">
              <p className="text-base font-semibold tracking-tight">
                Bardiner Account
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Dashboard
              </p>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-slate-700 hover:bg-zinc-100/70 dark:hover:bg-slate-800/60"
          >
            {open ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-2 px-3 flex-1 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarLink key={item.label} item={item} />
          ))}
        </nav>

        {/* Footer actions */}
        <div className="p-3 border-t border-zinc-200/40 dark:border-slate-800/40">
          <button
            onClick={signOut}
            className="w-full btn-surface justify-center gap-2"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
            {open && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      {/* MOBILE SIDEBAR (drawer) */}
      {mobile && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobile(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 p-3 glass rounded-r-3xl border-r z-50">
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 shadow-md">
                  <img src="/logo1.png" alt="Bardiner" className="h-6 w-6" />
                </span>
                <p className="text-base font-semibold">Bardiner Admin</p>
              </div>
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-slate-700 hover:bg-zinc-100/70 dark:hover:bg-slate-800/60"
                onClick={() => setMobile(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-2 space-y-1">
              {navItems.map((item) => (
                <SidebarLink
                  key={item.label}
                  item={item}
                  onClick={() => setMobile(false)}
                />
              ))}
            </nav>

            <div className="mt-4 border-t border-zinc-200/40 dark:border-slate-800/40 pt-3">
              <button
                onClick={signOut}
                className="w-full btn-surface justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex min-w-0 bg-inherit">
        <div className="flex-1 m-3 rounded-3xl glass overflow-hidden">
          {/* Top bar */}
          {/* Mobile toggle */}
          <button
            onClick={() => setMobile(true)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-slate-700 hover:bg-zinc-100/70 dark:hover:bg-slate-800/60"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          {/* </div> */}

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet context={account} />
          </div>
        </div>
      </div>
    </div>
  );
}
