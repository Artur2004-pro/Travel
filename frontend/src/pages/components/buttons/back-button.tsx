import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="
        fixed bottom-4 left-4 sm:bottom-6 sm:left-6
        flex items-center gap-2
        bg-gradient-to-r from-indigo-600 to-purple-600
        text-white font-semibold
        px-5 py-3 rounded-xl shadow-lg
        hover:shadow-xl hover:scale-[1.03]
        transition-all duration-300
        active:scale-95
        z-50
      "
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back</span>
    </button>
  );
};
