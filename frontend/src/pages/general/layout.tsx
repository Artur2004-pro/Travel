import { Outlet } from "react-router-dom";
import Header from "./header";
import { Footer } from "./footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col text-zinc-900 dark:text-zinc-100 transition-colors duration-700">
      {/* 🌤 Gradient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[28rem] w-[48rem] rounded-full blur-3xl opacity-30 bg-gradient-to-r from-sky-400 to-teal-400 dark:from-sky-700/30 dark:to-teal-600/30 animate-pulse-slow" />
      </div>

      {/* 🌐 Navbar */}
      <Header />

      {/* 📄 Main Content */}
      <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <Outlet />
      </main>

      {/* 🔻 Footer */}
      <Footer />
    </div>
  );
}
