import {
  Utensils,
  Clock,
  MapPin,
  Phone,
  Globe,
  Mail,
  Cigarette,
  CigaretteOff,
  Star as StarIcon,
  Check,
} from "lucide-react";

export const ActivityCard = ({
  activity,
  selected,
  onClick,
  disabled = false,
  isHotel = false,
}: {
  activity: any;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  isHotel?: boolean;
}) => {
  const image = activity.image || activity.images?.[0];

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        relative w-full text-left overflow-hidden
        rounded-2xl
        bg-white/5 border border-white/10
        transition
        active:scale-[0.98]
        ${disabled ? "opacity-60" : "hover:bg-white/10"}
      `}
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/5]">
        {image ? (
          <img
            src={image}
            alt={activity.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
            {isHotel ? (
              <StarIcon className="w-12 h-12 text-zinc-600" />
            ) : (
              <Utensils className="w-12 h-12 text-zinc-600" />
            )}
          </div>
        )}

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* SELECTED CHECK */}
        {selected && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <div className="text-white font-semibold text-lg line-clamp-1">
          {activity.name || "Untitled"}
        </div>

        {/* STARS (HOTEL) */}
        {isHotel && activity.stars && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < activity.stars
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-zinc-600"
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-zinc-400">
              {activity.stars}★
            </span>
          </div>
        )}

        {/* META */}
        {!isHotel && activity.smoking !== undefined && (
          <div className="flex items-center gap-2 text-xs">
            {activity.smoking ? (
              <>
                <Cigarette className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-orange-300">Smoking allowed</span>
              </>
            ) : (
              <>
                <CigaretteOff className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Non-smoking</span>
              </>
            )}
          </div>
        )}

        {activity.openingHours && (
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{activity.openingHours}</span>
          </div>
        )}

        {activity.address && (
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <MapPin className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{activity.address}</span>
          </div>
        )}

        {/* CONTACT */}
        <div className="flex gap-4 pt-2 text-xs text-zinc-400">
          {activity.phone && <Phone className="w-4 h-4" />}
          {activity.website && <Globe className="w-4 h-4" />}
          {activity.email && <Mail className="w-4 h-4" />}
        </div>
      </div>
    </button>
  );
};

export default ActivityCard;
