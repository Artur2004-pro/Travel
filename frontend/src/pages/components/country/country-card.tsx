import type { ICountryCardProps } from "../../../types";
import { ImageCarousel } from "../image/image-carusel";

export const CountryCard: React.FC<ICountryCardProps> = ({ country, next }) => {
  if (!country) return null;

  const { name, description, images } = country;

  return (
    <div className="bg-white/5 dark:bg-zinc-900/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {images?.length > 0 && (
        <div className="h-56 w-full">
          <ImageCarousel images={images} />
        </div>
      )}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        {description && (
          <p className="text-sm text-zinc-400 line-clamp-3">{description}</p>
        )}
      </div>
      <button
        onClick={() => next(country._id)}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-b-3xl transition-colors"
      >
        Create Trip
      </button>
    </div>
  );
};
