import { ImagePlus, Map, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateBottomSheet({ open, onClose }: Props) {
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* sheet */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          rounded-t-3xl
          bg-white dark:bg-zinc-900
          border-t border-zinc-200 dark:border-zinc-800
          shadow-2xl
          p-5 space-y-4
          animate-slideUp
        "
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Create</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        <button
          onClick={() => {
            onClose();
            navigate("/posts/new");
          }}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl
                     hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <ImagePlus className="w-5 h-5" />
          <span className="font-medium">Create post</span>
        </button>

        <button
          onClick={() => {
            onClose();
            navigate("/trips/new");
          }}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl
                     hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
        >
          <Map className="w-5 h-5" />
          <span className="font-medium">Create trip</span>
        </button>
      </div>
    </div>
  );
}
