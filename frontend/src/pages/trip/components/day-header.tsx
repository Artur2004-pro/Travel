import React from "react";

interface DayHeaderProps {
  day: number;
  date: string;
}

export const DayHeader: React.FC<DayHeaderProps> = ({ day, date }) => (
  <div className="bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30 p-8 sm:p-12 text-center rounded-3xl shadow-lg">
    <h1 className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-md">
      Օր {day}
    </h1>
    <p className="text-lg sm:text-2xl text-zinc-300 mt-2 sm:mt-4">{date}</p>
  </div>
);
