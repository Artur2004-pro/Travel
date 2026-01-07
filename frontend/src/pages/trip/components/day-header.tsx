import React from "react";

interface DayHeaderProps {
  day: number;
  date: string;
}

export const DayHeader: React.FC<DayHeaderProps> = ({ day, date }) => (
  <div className="bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 p-8 sm:p-12 text-center rounded-3xl shadow-xl backdrop-blur-sm">
    <h1 className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-md">
      Օր {day}
    </h1>
    <p className="text-base sm:text-2xl text-zinc-700 dark:text-zinc-300 mt-2 sm:mt-4">
      {date}
    </p>
  </div>
);
