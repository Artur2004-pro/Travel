import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

export const EditButton: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();
  return (
    <button
      className="
        flex items-center gap-2
        bg-indigo-600 text-white px-4 py-2
        rounded-lg text-sm font-medium
        hover:bg-indigo-700 transition-colors
      "
      onClick={() => navigate(`${id}`)}
    >
      <Pencil size={16} />
      <span>Edit</span>
    </button>
  );
};
