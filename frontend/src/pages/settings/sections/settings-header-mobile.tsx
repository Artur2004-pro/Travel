import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsMobileHeader({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div className="md:hidden sticky top-0 z-40 h-14 flex items-center px-4 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <button
        onClick={() => navigate(-1)}
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors -ml-2"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2} />
      </button>
      <h1 className="flex-1 text-center text-sm font-semibold truncate pr-10">
        {title}
      </h1>
    </div>
  );
}
