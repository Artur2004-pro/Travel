export const AdminCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: string;
  children: React.ReactNode;
}) => (
  <div className="panel relative overflow-hidden">
    {/* Decorative gradient glow */}
    <div className="absolute inset-0 -z-10 opacity-30 blur-3xl bg-gradient-to-br from-sky-400/30 via-teal-400/30 to-emerald-400/30 animate-pulse-slow" />
    <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 flex items-center justify-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-400">
      {icon && <span>{icon}</span>}
      {title}
    </h2>
    <div className="glass p-6 shadow-md hover:shadow-lg transition-all duration-300">
      {children}
    </div>
  </div>
);
