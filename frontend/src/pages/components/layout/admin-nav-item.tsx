import type { Item } from "../../../types";
import { LayoutDashboard, Globe2, MapPin, Users } from "lucide-react";

export const navItems: Item[] = [
  {
    label: "Overview",
    to: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Countries",
    to: "/admin/country",
    icon: <Globe2 className="h-5 w-5" />,
  },
  {
    label: "Cities",
    to: "/admin/city",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    label: "Users",
    to: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
];
