import type { ImageSectionProps } from "../../../types";
import { useState } from "react";

export const ImageSection: React.FC<ImageSectionProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  if (!images?.length) {
    return (
      <div className="w-full h-full min-h-[200px] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-400 dark:text-neutral-500 text-sm">
        No images
      </div>
    );
  }

  const imgUrls = images.map(
    (img) => import.meta.env.VITE_APP_DOMAIN.toString() + img
  );

  const nextImage = () => setCurrent((prev) => (prev + 1) % imgUrls.length);
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + imgUrls.length) % imgUrls.length);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        key={imgUrls[current]}
        src={imgUrls[current]}
        alt={`Preview ${current + 1}`}
        className="w-full h-full object-cover"
      />

      {imgUrls.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white text-sm"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white text-sm"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {imgUrls.map((_, i) => (
              <span
                key={i}
                className={`h-1 w-1 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
