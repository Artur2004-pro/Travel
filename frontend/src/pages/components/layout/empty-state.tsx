interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, icon }) => (
  <div className="flex flex-col items-center justify-center py-20 text-gray-500 text-center">
    <p className="text-2xl font-semibold">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </p>
    {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
  </div>
);
