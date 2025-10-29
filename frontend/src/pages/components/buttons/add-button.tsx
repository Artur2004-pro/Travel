import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AddButtonProps {
  label: string;
  path: string;
}

export const AddButton: React.FC<AddButtonProps> = ({ label, path }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className="
        flex items-center gap-2
        bg-gradient-to-r from-indigo-600 to-purple-600
        text-white font-semibold
        px-5 py-2.5 rounded-xl shadow-md
        hover:shadow-lg hover:scale-[1.03]
        transition-all duration-300
        active:scale-95
      "
    >
      <Plus className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};
