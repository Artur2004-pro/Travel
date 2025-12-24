import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, ChevronLeft, LogOut } from "lucide-react";
import type { IAccount, IResponse } from "../../types";
import { Axios } from "../../lib/axios-config";
import { EmptyState, navItems, SidebarLink } from "../components";

export default function AdminLayout() {
  const [open, setOpen] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [account, setAccount] = useState<IAccount | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAccount();
  }, []);

  const toggleSidebar = () => setOpen((v) => !v);

  const signOut = () => {
    localStorage.removeItem("Authorization");
    navigate("/");
  };

  const handleGetAccount = async () => {
    try {
      const { data } = await Axios.get<IResponse<IAccount>>("account/");
      setAccount(data.payload);
    } catch {
      setAccount(null);
    }
  };

  if (!account || account.role !== "admin") {
    return (
      <EmptyState title="Cannot access" icon="❌" subtitle="You not admin" />
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-slate-900">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[46rem] h-[26rem] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-pink-400 via-purple-400 to-teal-400 animate-pulse-slow" />
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden md:flex flex-col transition-all duration-300 m-3 rounded-3xl glass border border-zinc-200/30 dark:border-slate-800/30 ${
          open ? "w-72" : "w-20"
        }`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl shadow-md bg-gradient-to-tr from-pink-400 to-teal-400">
              <img src="/logo1.png" alt="Bardiner" className="h-6 w-6" />
            </span>
            {open && (
              <div className="flex flex-col">
                <span className="font-semibold text-base text-gray-800 dark:text-gray-100">
                  Bardiner Admin
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Dashboard
                </span>
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="h-9 w-9 rounded-xl border border-zinc-200 dark:border-slate-700 hover:bg-gray-100/60 dark:hover:bg-slate-800/50 flex items-center justify-center"
          >
            {open ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="mt-4 px-3 flex-1 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <SidebarLink key={item.label} item={item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-200/20 dark:border-slate-800/20">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 btn-surface rounded-xl py-2 hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transition"
          >
            <LogOut className="h-4 w-4" />
            {open && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {mobile && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobile(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 p-4 glass rounded-r-3xl border-r border-zinc-200/20 dark:border-slate-800/20 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-400 to-teal-400 shadow-md">
                  <img src="/logo1.png" alt="Bardiner" className="h-6 w-6" />
                </span>
                <span className="font-semibold text-base text-gray-800 dark:text-gray-100">
                  Bardiner Admin
                </span>
              </div>
              <button
                onClick={() => setMobile(false)}
                aria-label="Close menu"
                className="h-9 w-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-slate-700 hover:bg-gray-100/60 dark:hover:bg-slate-800/50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <SidebarLink
                  key={item.label}
                  item={item}
                  onClick={() => setMobile(false)}
                />
              ))}
            </nav>

            <div className="mt-6 border-t border-zinc-200/20 dark:border-slate-800/20 pt-3">
              <button
                onClick={signOut}
                className="w-full flex items-center justify-center gap-2 btn-surface rounded-xl py-2 hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transition"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 md:hidden">
          <button
            onClick={() => setMobile(true)}
            className="h-9 w-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-slate-700 hover:bg-gray-100/60 dark:hover:bg-slate-800/50"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet context={account} />
        </div>
      </div>
    </div>
  );
}
