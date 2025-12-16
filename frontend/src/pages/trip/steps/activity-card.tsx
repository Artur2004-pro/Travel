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
} from "lucide-react";

// Նոր ActivityCard՝ բարելավված ինֆոյով
export const ActivityCard = ({
  activity,
  selected,
  onClick,
  disabled = false,
  isHotel = false, // հյուրանոցի համար ավելի լավ կցուցադրենք stars-ը
}: {
  activity: any; // քանի որ տիպերը տարբեր են, any-ով, բայց կարող ես interface սարքել
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  isHotel?: boolean;
}) => (
  <div
    onClick={disabled ? undefined : onClick}
    className={`relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-500 group
      ${
        selected
          ? "ring-4 ring-emerald-500 shadow-2xl shadow-emerald-500/50 scale-105"
          : "hover:scale-102 hover:shadow-xl"
      }
      ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
  >
    {/* Selected background glow */}
    {selected && (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 to-teal-600/30 rounded-3xl blur-xl -z-10" />
    )}

    {/* Image or placeholder */}
    {activity.image || activity.images?.[0] ? (
      <img
        src={activity.image || activity.images[0]}
        alt={activity.name}
        className="w-full h-64 object-cover"
      />
    ) : (
      <div className="w-full h-64 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
        {isHotel ? (
          <StarIcon className="w-20 h-20 text-yellow-600/70" />
        ) : (
          <Utensils className="w-20 h-20 text-zinc-700" />
        )}
      </div>
    )}

    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
      <h3 className="text-2xl font-bold">{activity.name || "Անանուն"}</h3>

      {/* Stars - միայն հյուրանոցների համար */}
      {isHotel && activity.stars ? (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`w-6 h-6 ${
                i < activity.stars
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-zinc-600"
              }`}
            />
          ))}
          <span className="ml-2 text-yellow-300 font-semibold">
            {activity.stars} ★
          </span>
        </div>
      ) : null}

      {/* Smoking info - միայն activity/cafe-ների համար */}
      {!isHotel && activity.smoking !== undefined && (
        <div className="flex items-center gap-3 text-sm">
          {activity.smoking ? (
            <>
              <Cigarette className="w-5 h-5 text-orange-400" />
              <span className="text-orange-300">Թույլատրվում է ծխել</span>
            </>
          ) : (
            <>
              <CigaretteOff className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300">Առանց ծխելու</span>
            </>
          )}
        </div>
      )}

      {/* Cuisine */}
      {activity.cuisine && activity.cuisine.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-emerald-300">
          <Utensils className="w-4 h-4" />
          <span>{activity.cuisine.join(", ")}</span>
        </div>
      )}

      {/* Opening hours */}
      {activity.openingHours && (
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <Clock className="w-4 h-4" />
          <span className="truncate">{activity.openingHours}</span>
        </div>
      )}

      {/* Address */}
      {activity.address && (
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{activity.address}</span>
        </div>
      )}

      {/* Contact info - փոքրիկ icon-ներով */}
      <div className="flex flex-wrap gap-4 mt-3 text-xs">
        {activity.phone && activity.phone.length > 0 && (
          <div className="flex items-center gap-2 text-zinc-300">
            <Phone className="w-4 h-4" />
            <span>
              {Array.isArray(activity.phone)
                ? activity.phone[0]
                : activity.phone}
            </span>
          </div>
        )}
        {activity.website && (
          <div className="flex items-center gap-2 text-blue-300">
            <Globe className="w-4 h-4" />
            <span className="truncate max-w-32">Website</span>
          </div>
        )}
        {activity.email && (
          <div className="flex items-center gap-2 text-purple-300">
            <Mail className="w-4 h-4" />
            <span className="truncate max-w-32">Email</span>
          </div>
        )}
      </div>

      {/* Selected badge */}
      {selected && (
        <div className="mt-5 text-center">
          <span className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg">
            Ընտրված է
          </span>
        </div>
      )}
    </div>
  </div>
);

export default ActivityCard;
