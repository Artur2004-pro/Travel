import { ImagePlus, X } from "lucide-react";

interface UploadImagesProps {
  label?: string;
  previews: string[];
  disable?: boolean;
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

      {/* Upload Area */}
      {!disable && (
        <label
          htmlFor="upload"
          className="
            flex flex-col items-center justify-center gap-3
            border-2 border-dashed border-zinc-300 dark:border-slate-700
            rounded-3xl p-5 sm:p-6 text-center cursor-pointer
            hover:border-pink-500 dark:hover:border-pink-400
            bg-white/70 dark:bg-slate-900/50
            transition-all duration-300 hover:shadow-lg
          "
        >
          <ImagePlus className="h-8 w-8 text-pink-500 dark:text-pink-400" />
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

      {/* Previews Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
          {previews.map((src, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <img
                src={src}
                alt={`Preview ${i}`}
                className="w-full h-24 sm:h-28 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <button
                type="button"
                onClick={() => onDelete(i)}
                className="
                  absolute top-1 right-1 flex items-center justify-center
                  h-6 w-6 rounded-full bg-rose-500/80 hover:bg-rose-600
                  text-white shadow-md transition
                "
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
