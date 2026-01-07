import React, { useRef } from "react";
import { X, Plus } from "lucide-react";

interface Props {
  oldImages: string[];
  newImages: string[];
  onDeleteOld: (img: string) => void;
  onDeleteNew: (index: number) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageGrid: React.FC<Props> = ({
  oldImages,
  newImages,
  onDeleteOld,
  onDeleteNew,
  onUpload,
}) => {
    const apiUrl = useRef(import.meta.env.VITE_APP_DOMAIN);
  return (
    <div className="grid grid-cols-3 gap-1">
      {oldImages.map((img) => (
        <div key={img} className="relative aspect-square">
          <img src={apiUrl.current + img} className="h-full w-full object-cover rounded-md" />
          <button
            type="button"
            onClick={() => onDeleteOld(img)}
            className="absolute top-1 right-1 rounded-full bg-black/60 p-1"
          >
            <X className="h-3 w-3 text-white" />
          </button>
        </div>
      ))}

      {newImages.map((img, i) => (
        <div key={i} className="relative aspect-square">
          <img src={img} className="h-full w-full object-cover rounded-md" />
          <button
            type="button"
            onClick={() => onDeleteNew(i)}
            className="absolute top-1 right-1 rounded-full bg-black/60 p-1"
          >
            <X className="h-3 w-3 text-white" />
          </button>
        </div>
      ))}

      <label className="aspect-square rounded-md border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition">
        <Plus className="h-5 w-5 text-zinc-400" />
        <input
          type="file"
          multiple
          accept="image/*"
          hidden
          onChange={onUpload}
        />
      </label>
    </div>
  );
};
