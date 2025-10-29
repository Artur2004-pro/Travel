interface AdminCardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  title,
  icon,
  children,
}) => (
  <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-10 border border-gray-100 w-full">
    <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8 flex justify-center items-center gap-2">
      {icon && <span>{icon}</span>}
      {title}
    </h2>
    {children}
  </div>
);
