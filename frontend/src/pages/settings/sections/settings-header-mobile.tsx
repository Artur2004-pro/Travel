import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsMobileHeader({ title }: { title: string }) {
  const navigate = useNavigate();
  return (
    <div className="md:hidden sticky top-0 z-40 flex items-center h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black px-4">
      <button onClick={() => navigate(-1)}>
        <ChevronLeft className="w-6 h-6" />
      </button>
      <h1 className="flex-1 text-center text-sm font-semibold">{title}</h1>
      <div className="w-6" />
    </div>
  );
}
