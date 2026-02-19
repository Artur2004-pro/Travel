// React default import not required with the new JSX transform

export default function ProfileHeader({
  avatar,
  username,
  bio,
  editable = false,
  onEdit,
}: {
  avatar?: string;
  username: string;
  bio?: string;
  editable?: boolean;
  onEdit?: () => void;
}) {
  return (
    <header className="bg-white/60 dark:bg-slate-900/60 backdrop-blur rounded-xl shadow-sm p-5">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-shrink-0">
          <img
            src={avatar || "/public/avatar-placeholder.png"}
            alt={`${username} avatar`}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-slate-800 shadow"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{username}</h2>
            {editable ? (
              <button
                onClick={onEdit}
                className="ml-2 px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Edit profile
              </button>
            ) : null}
          </div>
          {bio ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{bio}</p> : null}
        </div>
      </div>
    </header>
  );
}
