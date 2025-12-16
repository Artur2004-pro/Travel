import React from "react";

const team = [
  {
    name: "Artur",
    role: "CEO & Founder Bardiner",
    avatar: "/artur.png",
  },
  { name: "Gurgen", role: "Backend Enginner", avatar: "/gurgen.png" },
  { name: "Arman", role: "Frontend Enginner", avatar: "/arman.png" },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About Bardiner</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
          Bardiner is your ultimate travel companion. We make planning your
          trips simple, organized, and fun.
        </p>
      </section>

      {/* Info Section */}
      <section className="max-w-5xl mx-auto py-12 px-4 grid gap-8 md:grid-cols-3">
        <div className="bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-300">
            To make every traveler's journey seamless and memorable with
            intuitive tools and smart planning.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-300">
            To become the most reliable travel companion app worldwide, loved by
            travelers everywhere.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition-transform">
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-gray-300">
            Simplicity, reliability, innovation, and joy in every trip.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-850">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Meet the Team
        </h2>
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-gray-800 p-6 rounded-lg shadow hover:scale-105 transition-transform text-center"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-xl">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
