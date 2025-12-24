import type { ICountryCardProps } from "../../../types";
import { ImageCarousel } from "../image/image-carusel";

export const CountryCard: React.FC<ICountryCardProps> = ({ country, next }) => {
  if (!country) return null;

  const { name, description, images } = country;

  return (
    <div className="bg-white/10 dark:bg-slate-900/60 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image Carousel */}
      {images?.length > 0 && (
        <div className="w-full h-52 sm:h-56 relative">
          <ImageCarousel images={images} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      )}

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold text-white line-clamp-1">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-zinc-400 line-clamp-3">{description}</p>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={() => next(country._id)}
        className="w-full py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 text-white font-medium rounded-b-3xl transition-colors shadow-sm"
      >
        Create Trip
      </button>
    </div>
  );
};
