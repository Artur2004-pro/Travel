import React from "react";

const team = [
  {
    name: "Artur",
    role: "CEO & Founder",
    avatar: "/artur.png",
  },
  {
    name: "Gurgen",
    role: "Backend Engineer",
    avatar: "/gurgen.png",
  },
  {
    name: "Arman",
    role: "Frontend Engineer",
    avatar: "/arman.png",
  },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-8 pb-16">
      {/* Hero */}
      <section className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          About Bardiner
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg">
          Bardiner is your travel companion — designed to help you explore,
          plan, and remember journeys beautifully.
        </p>
      </section>

      {/* Mission / Vision / Values */}
      <section className="space-y-10 mb-16">
        {[
          {
            title: "Mission",
            text: "To simplify travel planning and turn every journey into a memorable experience.",
          },
          {
            title: "Vision",
            text: "To become a trusted travel platform people love to use every day.",
          },
          {
            title: "Values",
            text: "Clarity, reliability, and thoughtful design in everything we build.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="border-b border-zinc-200 dark:border-zinc-800 pb-6"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </section>

      {/* Team */}
      <section>
        <h2 className="text-xl font-semibold mb-8 text-center">
          Meet the Team
        </h2>

        <div className="flex flex-col gap-8">
          {team.map((member) => (
            <div key={member.name} className="flex items-center gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-14 h-14 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
              />

              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
