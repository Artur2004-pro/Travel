interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  icon,
}) => (
  <div className="flex flex-col items-center justify-center py-20 text-zinc-500 dark:text-zinc-400 text-center animate-fade-in">
    <p className="text-2xl font-semibold">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </p>
    {subtitle && (
      <p className="text-sm mt-1 text-zinc-400 dark:text-zinc-500">
        {subtitle}
      </p>
    )}
  </div>
);
