import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../hooks/useThem";
const ThemeToggle: React.FC = () => {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center gap-2"
    >
      {dark ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} className="text-blue-600" />
      )}
      <span className="text-sm font-medium">{dark ? "Light" : "Dark"}</span>
    </button>
  );
};

export default ThemeToggle;
