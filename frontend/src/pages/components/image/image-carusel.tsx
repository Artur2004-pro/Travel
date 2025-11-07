import type { ImageCarouselProps } from "../../../types";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  title,
  isAdmin,
  onDeleteImage,
}) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  if (!images?.length) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-zinc-200 dark:border-slate-800 shadow-md">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={`${import.meta.env.VITE_APP_DOMAIN}/${images[index]}`}
          alt={`${title || "Image"} ${index + 1}`}
          className="h-64 sm:h-72 md:h-80 w-full object-cover rounded-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {/* Overlay Title */}
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 text-white text-lg font-semibold tracking-tight">
          {title}
        </div>
      )}

      {/* Controls */}
      {isAdmin && onDeleteImage && images.length > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDeleteImage(images[index]);
            prev();
          }}
          className="absolute top-3 right-3 bg-rose-500/80 hover:bg-rose-600 text-white rounded-full p-2 shadow-md transition"
          aria-label="Delete image"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full cursor-pointer transition ${
                i === index
                  ? "bg-sky-400 dark:bg-teal-400"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
