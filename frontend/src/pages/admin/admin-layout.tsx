import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import type { IAccount, IResponse } from "../../types";
import { Axios } from "../../lib/axios-config";
import { navItems } from "../components";
import { useAuth } from "../../context/auth-context";

export default function AdminLayout() {
  const [account, setAccount] = useState<IAccount | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    try {
      const { data } = await Axios.get<IResponse<IAccount>>("account/");
      setAccount(data.payload);
    } catch {
      logout();
      navigate("/");
    }
  };

  const signOut = () => {
    logout();
    navigate("/");
  };

  if (!account || account.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center space-y-2">
          <div className="text-4xl">⛔</div>
          <h2 className="text-lg font-semibold">Access denied</h2>
          <p className="text-sm text-zinc-500">
            You do not have permission to view this page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-[240px] h-screen border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black sticky top-0">
        {/* Header / Logo */}
        <div className="px-6 py-6 flex-shrink-0">
          <NavLink to="/" className="text-xl font-semibold tracking-tight">
            Bardiner Admin
          </NavLink>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg text-sm transition ${
                  isActive
                    ? "font-semibold text-black dark:text-white"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`
              }
            >
              {Icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-lg">Bardiner</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm ${
                      isActive
                        ? "font-semibold"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`
                  }
                >
                  {Icon}
                  {label}
                </NavLink>
              ))}
            </nav>

            <button
              onClick={signOut}
              className="mt-6 w-full flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </aside>
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <div className="md:hidden h-14 flex items-center justify-between px-4 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setMobileOpen(true)}
            className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <Menu size={20} />
          </button>
          <span className="font-semibold">Bardiner</span>
          <div className="w-9" />
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center w-full justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="w-screen max-w-5xl">
            <Outlet context={account} />
          </div>
        </div>
      </div>
    </div>
  );
}
