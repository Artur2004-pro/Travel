import { ImagePlus, X } from "lucide-react";

interface UploadImagesProps {
  label?: string;
  // images: File[];
  disable?: boolean;
  previews: string[];
  onAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (index: number) => void;
}

export const UploadImages: React.FC<UploadImagesProps> = ({
  label = "Upload Images",
  previews,
  onAdd,
  onDelete,
  disable,
}) => {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </p>

      {/* Upload area */}
      {!disable && (
        <label
          htmlFor="upload"
          className="
          flex flex-col items-center justify-center gap-3
          border-2 border-dashed border-zinc-300 dark:border-slate-700
          rounded-2xl p-6 text-center cursor-pointer
          hover:border-sky-400 dark:hover:border-teal-400
          bg-white/60 dark:bg-slate-900/40
          transition-all duration-300 hover:shadow-glass
        "
        >
          <ImagePlus className="h-8 w-8 text-sky-500 dark:text-teal-400" />
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Click or drag images to upload
          </p>
          <input
            id="upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onAdd}
          />
        </label>
      )}

      {/* Preview grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {previews.map((src, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-2xl border border-zinc-200 dark:border-slate-800 shadow-sm"
            >
              <img
                src={src}
                alt={`Preview ${i}`}
                className="h-32 w-full object-cover rounded-2xl group-hover:opacity-90 transition"
              />
              <button
                type="button"
                onClick={() => onDelete(i)}
                className="absolute top-1.5 right-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/80 hover:bg-rose-600 text-white shadow-md transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
