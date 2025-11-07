import type { Item } from "../../../types";
import {
  LayoutDashboard,
  Globe2,
  MapPin,
  Users,
  Globe,
  MapPinPlus,
} from "lucide-react";

export const navItems: Item[] = [
  {
    label: "Overview",
    to: "/admin",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    label: "Countries",
    to: "/admin/country",
    icon: <Globe2 className="h-4 w-4" />,
  },
  {
    label: "Cities",
    to: "/admin/city",
    icon: <MapPin className="h-4 w-4" />,
  },
  { label: "Users", to: "/admin/users", icon: <Users className="h-4 w-4" /> },
  {
    label: "Add Country",
    to: "/admin/add-country",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    label: "Add City",
    to: "/admin/city/add",
    icon: <MapPinPlus className="h-4 w-4" />,
  },
];
