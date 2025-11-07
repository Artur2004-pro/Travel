import { Trash2 } from "lucide-react";

export const DeleteButton = ({
  id,
  onClick,
  label = "Delete",
}: {
  id: string;
  onClick?: (id: string) => void;
  label?: string;
}) => {
  return (
    <button
      onClick={() => onClick?.(id)}
      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-rose-500 hover:text-white border border-rose-500 hover:bg-rose-500 transition"
    >
      <Trash2 className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};
