import type { IUser } from "../../types";
import { EditButton } from "../components";

export const UserItem: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className="flex flex-col justify-between bg-white hover:bg-blue-50 transition-all duration-200 rounded-2xl p-6 shadow-md border border-gray-200 min-h-[200px] w-full">
      {/* User Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 mb-4">
        {/* Avatar */}
        <div className="flex justify-center mb-3 sm:mb-0">
          <img
            src={user.avatar || "/default.jpg"}
            alt={user.username}
            className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-300 shadow-sm"
          />
        </div>

        {/* Text info */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <b className="text-gray-800 text-base font-semibold">
            {user.username}
          </b>
          <span className="text-gray-500 text-sm truncate max-w-[220px]">
            {user.email}
          </span>
          <span
            className={`text-sm mt-2 px-3 py-1 rounded-full font-medium ${
              user.role === "admin"
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                : "bg-sky-100 text-sky-700 border border-sky-200"
            }`}
          >
            {user.role}
          </span>
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex justify-center sm:justify-end mt-auto pt-2">
        <EditButton id={user._id} />
      </div>
    </div>
  );
};
