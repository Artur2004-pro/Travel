import type { ISearchInputProps } from "../../../types";

export const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  onChange,
  placeholder = "Type to search...",
  className = "",
}) => {
  return (
    <div className={`flex justify-center mb-8 ${className}`}>
      <div className="relative w-full sm:w-96">
        {/* 🔍 Search icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full
            border border-gray-300 rounded-xl pl-10 pr-4 py-3
            shadow-sm bg-white text-gray-800
            focus:outline-none focus:ring-2 focus:ring-indigo-400
            transition duration-200
          "
        />
      </div>
    </div>
  );
};
