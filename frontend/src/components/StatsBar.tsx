// React default import not required with the new JSX transform

export default function StatsBar({ posts, followers, following }: { posts: number; followers: number; following: number }) {
  return (
    <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur rounded-xl shadow-sm p-3 flex items-center justify-between max-w-md">
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{posts}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{followers}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{following}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Following</div>
        </div>
      </div>
    </div>
  );
}
