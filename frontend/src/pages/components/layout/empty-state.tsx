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
  <div className="flex flex-col items-center justify-center py-16 text-center text-zinc-500 dark:text-zinc-400">
    {icon && <span className="mb-3 text-3xl opacity-60">{icon}</span>}

    <p className="text-base font-medium">{title}</p>

    {subtitle && (
      <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
        {subtitle}
      </p>
    )}
  </div>
);
