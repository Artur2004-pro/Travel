import React from "react";

interface DayHeaderProps {
  day: number;
  date: string;
}

export const DayHeader: React.FC<DayHeaderProps> = ({ day, date }) => (
  <div className="bg-gradient-to-r from-indigo-600/40 via-purple-600/40 to-pink-600/40 p-12 text-center">
    <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-pink-300">
      Օր {day}
    </h1>
    <p className="text-2xl text-zinc-300 mt-4">{date}</p>
  </div>
);
