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
      className="
        inline-flex items-center justify-center sm:justify-start gap-2
        rounded-full px-3 py-2 text-sm font-medium
        text-rose-500 border border-rose-500
        bg-rose-500/10 dark:bg-rose-500/20
        hover:bg-rose-500 hover:text-white transition
      "
    >
      <Trash2 className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};
