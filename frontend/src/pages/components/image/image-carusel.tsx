import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  title?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-56 flex items-center justify-center bg-gray-200 text-gray-500 text-sm rounded-2xl">
        No images available
      </div>
    );
  }

  const activeImage = "http://localhost:9999/" + images[activeIndex];

  return (
    <div className="relative group">
      <img
        src={activeImage}
        alt={title}
        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105 rounded-2xl"
      />

      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {images.map((img, i) => (
          <div
            key={img}
            onClick={() => setActiveIndex(i)}
            className={`w-3.5 h-3.5 rounded-full border-2 cursor-pointer transition-all duration-200 ${
              i === activeIndex
                ? "bg-indigo-600 border-indigo-600 scale-110"
                : "bg-white/70 border-white/80 hover:bg-indigo-400"
            }`}
          ></div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </div>
  );
};
