export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200/50 dark:border-slate-800/50 backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* 🌍 Brand */}
          <div className="col-span-2 space-y-3">
            <a
              href="/"
              className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-teal-400 shadow-md">
                <img src="/logo1.png" alt="logo" className="h-6 w-6" />
              </span>
              <span className="text-lg tracking-tight">Bardiner</span>
            </a>
            <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Discover the world, plan your next adventure, and relive your
              favorite memories — beautifully and effortlessly.
            </p>
          </div>

          {/* 🧭 Product Links */}
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Product
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {["Features", "Pricing", "Changelog"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-zinc-600 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-teal-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 🏢 Company Links */}
          <div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Company
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {["About", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-zinc-600 hover:text-sky-600 dark:text-zinc-400 dark:hover:text-teal-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 🔹 Bottom bar */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-zinc-200/50 dark:border-slate-800/50 pt-6 text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            © {new Date().getFullYear()} <strong>Bardiner</strong>. All rights
            reserved.
          </p>

          <div className="flex gap-4 mt-3 md:mt-0">
            {["Terms", "Privacy", "Cookies"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-sky-600 dark:hover:text-teal-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
