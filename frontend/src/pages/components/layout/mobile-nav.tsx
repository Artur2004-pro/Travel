import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Globe, MapPin, User, Settings } from "lucide-react";

const MobileNav: React.FC = () => {
  const location = useLocation();

  const items = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/trips/country", icon: Globe, label: "Plan" },
    { to: "/my-trips", icon: MapPin, label: "Trips" },
    { to: "/settings", icon: Settings, label: "Settings" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden">
      <div className="flex justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition ${
                active ? "text-blue-500" : "text-gray-600 dark:text-gray-400"
              }`}
            >
              <Icon size={24} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
