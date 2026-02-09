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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <div className="text-center space-y-2 px-4">
          <div className="text-4xl">⛔</div>
          <h2 className="text-lg font-semibold">Access denied</h2>
          <p className="text-sm text-neutral-500">
            You do not have permission to view this page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <aside className="hidden md:flex flex-col w-[244px] h-screen border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0">
        <div className="px-4 py-6 flex-shrink-0">
          <NavLink to="/" className="text-lg font-semibold tracking-tight">
            Bardiner Admin
          </NavLink>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`
              }
            >
              {Icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <LogOut className="w-4 h-4" strokeWidth={2} />
            Sign out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 p-4">
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-lg">Bardiner Admin</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <nav className="space-y-0.5">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${
                      isActive ? "font-semibold" : "text-neutral-600 dark:text-neutral-400"
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
              className="mt-6 w-full flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm"
            >
              <LogOut className="w-4 h-4" strokeWidth={2} />
              Sign out
            </button>
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div className="md:hidden h-14 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-800">
          <button
            onClick={() => setMobileOpen(true)}
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
          <span className="font-semibold">Bardiner</span>
          <div className="w-9" />
        </div>

        <div className="flex-1 flex items-center w-full justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-5xl">
            <Outlet context={account} />
          </div>
        </div>
      </div>
    </div>
  );
}
