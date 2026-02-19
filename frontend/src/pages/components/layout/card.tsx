import React from "react";

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={"bg-white dark:bg-neutral-950 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden " + className}
  >
    {children}
  </div>
);

export default Card;
