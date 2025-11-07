import { Search } from "lucide-react";
import type { ISearchInputProps } from "../../../types";

export const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative w-full sm:w-96 ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 dark:text-zinc-500" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-4 py-2.5 rounded-xl text-sm
          bg-white/80 dark:bg-slate-900/70
          border border-zinc-300 dark:border-slate-700
          text-zinc-800 dark:text-zinc-100
          placeholder:text-zinc-400 dark:placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-sky-400/50 dark:focus:ring-teal-400/50
          shadow-sm hover:shadow-md transition-all duration-200
        "
      />
    </div>
  );
};
