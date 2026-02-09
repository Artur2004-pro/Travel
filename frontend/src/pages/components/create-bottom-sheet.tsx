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
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 p-4 pb-[env(safe-area-inset-bottom)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Create</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" strokeWidth={2} />
          </button>
        </div>

        <button
          onClick={() => {
            onClose();
            navigate("/posts/new");
          }}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ImagePlus className="w-5 h-5" strokeWidth={2} />
          <span className="font-medium text-sm">Create post</span>
        </button>

        <button
          onClick={() => {
            onClose();
            navigate("/trips/new");
          }}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <Map className="w-5 h-5" strokeWidth={2} />
          <span className="font-medium text-sm">Create trip</span>
        </button>
      </div>
    </div>
  );
}
