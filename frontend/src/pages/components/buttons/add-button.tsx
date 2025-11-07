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
      className={`btn-primary flex items-center gap-2 text-sm shadow-glass hover:shadow-glass-dark transition-all ${className}`}
    >
      <Plus className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );
};
