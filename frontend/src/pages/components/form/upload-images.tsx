import { Plus, X } from "lucide-react";

interface UploadImagesProps {
  label: string;
  images: File[];
  previews: string[];
  max?: number;
  onAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (index: number) => void;
}

export const UploadImages: React.FC<UploadImagesProps> = ({
  label,
  images,
  previews,
  onAdd,
  onDelete,
  max = 5,
}) => {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">
        {label} ({images.length}/{max})
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          {previews.map((preview, index) => (
            <div
              key={preview}
              className="relative border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={preview}
                alt="preview"
                className="object-cover w-full h-32"
              />
              <button
                type="button"
                onClick={() => onDelete(index)}
                className="absolute top-1 right-1 bg-black/60 text-white text-xs p-1 rounded hover:bg-red-600 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < max && (
        <label className="flex items-center justify-center gap-2 w-full text-indigo-700 border-2 border-dashed border-indigo-300 rounded-xl py-3 bg-indigo-50 hover:bg-indigo-100 transition-all cursor-pointer">
          <Plus size={18} />
          <span className="font-medium">Add Image</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onAdd}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};
