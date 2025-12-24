import type { ImageSectionProps } from "../../../types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const ImageSection: React.FC<ImageSectionProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  if (!images?.length) {
    return (
      <div className="h-44 sm:h-52 md:h-60 bg-gradient-to-br from-sky-100 to-teal-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl flex items-center justify-center text-zinc-400 dark:text-slate-500 text-sm font-medium">
        No Images
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
    <div className="relative w-full overflow-hidden rounded-3xl shadow-md">
      <AnimatePresence mode="wait">
        <motion.img
          key={imgUrls[current]}
          src={imgUrls[current]}
          alt={`Preview ${current + 1}`}
          className="h-44 sm:h-52 md:h-60 w-full object-cover rounded-3xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl pointer-events-none" />

      {imgUrls.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white"
          >
            ›
          </button>
        </>
      )}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
        {imgUrls.map((_, i) => (
          <span
            key={i}
            className={`h-1 w-1 rounded-full transition-all ${
              i === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
