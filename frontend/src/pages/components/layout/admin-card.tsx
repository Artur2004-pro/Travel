export const AdminCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
}) => (
  <section className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-black">
    {/* Header */}
    <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
      {icon && <span className="text-zinc-500">{icon}</span>}
      <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
    </div>

    {/* Content */}
    <div className="p-4">{children}</div>
  </section>
);
