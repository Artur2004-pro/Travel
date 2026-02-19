import React from "react";

export const SkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  const items = Array.from({ length: count });
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-1 bg-neutral-200 dark:bg-neutral-800">
      {items.map((_, i) => (
        <div key={i} className="aspect-square bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
      ))}
    </div>
  );
};

export default SkeletonGrid;
