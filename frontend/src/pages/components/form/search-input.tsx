import { Search } from "lucide-react";
import type { ISearchInputProps } from "../../../types";

export const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-12 pr-4 py-2.5 rounded-full text-sm
          bg-white/90 dark:bg-slate-900/80
          border border-zinc-200 dark:border-slate-700
          text-zinc-800 dark:text-zinc-100
          placeholder:text-zinc-400 dark:placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-sky-400/50 dark:focus:ring-teal-400/50
          shadow-sm hover:shadow-md transition-all duration-200
        "
      />
    </div>
  );
};
