import { Plus } from "lucide-react";

export const AddButton = ({
  onClick,
  label = "Add",
  className = "",
}: {
  onClick: () => void;
  label?: string;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center sm:justify-start gap-2
        rounded-full px-3 py-2 text-sm font-medium
        bg-emerald-500/20 dark:bg-emerald-600/20
        text-white shadow-sm hover:shadow-md hover:bg-emerald-500/40
        transition ${className}
      `}
    >
      <Plus className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};
