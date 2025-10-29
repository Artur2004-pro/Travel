import { Trash2 } from "lucide-react";
import type { IDeleteButtonProps } from "../../../types";

export const DeleteButton: React.FC<IDeleteButtonProps> = ({ onClick, id }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className="
        flex items-center gap-2
        px-4 py-2 rounded-lg text-sm font-medium
        border border-red-500 text-red-600
        hover:bg-red-600 hover:text-white
        transition-all duration-300
      "
    >
      <Trash2 size={16} />
      <span>Delete</span>
    </button>
  );
};
