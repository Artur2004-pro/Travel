import React from "react";

const team = [
  { name: "Artur", role: "CEO & Founder", avatar: "/artur.png" },
  { name: "Gurgen", role: "Backend Engineer", avatar: "/gurgen.png" },
  { name: "Arman", role: "Frontend Engineer", avatar: "/arman.png" },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full max-w-feed mx-auto px-4 py-8 pb-24 md:pb-10">
      <section className="text-center mb-12">
        <h1 className="text-2xl font-semibold tracking-tight mb-3">
          About Bardiner
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
          Bardiner is your travel companion — designed to help you explore,
          plan, and remember journeys beautifully.
        </p>
      </section>

      <section className="space-y-8 mb-12">
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
            className="border-b border-neutral-200 dark:border-neutral-800 pb-6"
          >
            <h3 className="text-base font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-base font-semibold mb-6 text-center">Meet the Team</h2>
        <div className="flex flex-col gap-6">
          {team.map((member) => (
            <div key={member.name} className="flex items-center gap-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover border border-neutral-200 dark:border-neutral-800"
              />
              <div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
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
