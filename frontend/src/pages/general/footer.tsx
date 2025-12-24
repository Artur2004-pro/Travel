export function Footer() {
  return (
    <footer className="hidden md:block border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-zinc-500">
          {["About", "Blog", "Careers", "Help", "API", "Privacy", "Terms"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition"
              >
                {item}
              </a>
            )
          )}
        </div>

        <div className="mt-4 text-center text-xs text-zinc-400">
          © {new Date().getFullYear()} Bardiner
        </div>
      </div>
    </footer>
  );
}
