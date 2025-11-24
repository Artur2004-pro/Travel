import type { ImageSectionProps } from "../../../types";
import { motion } from "framer-motion";

export const ImageSection: React.FC<ImageSectionProps> = ({ images }) => {
  if (!images?.length) {
    return (
      <div className="h-40 sm:h-48 md:h-56 bg-gradient-to-br from-sky-100 to-teal-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl flex items-center justify-center text-zinc-400 dark:text-slate-500 text-sm">
        No Images
      </div>
    );
  }
  const img = images.map(
    (imgae) => import.meta.env.VITE_APP_DOMAIN.toString() + imgae
  );
  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <motion.img
        key={images[0]}
        src={img[0]}
        alt="Preview"
        className="h-40 sm:h-48 md:h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl" />
    </div>
  );
};
