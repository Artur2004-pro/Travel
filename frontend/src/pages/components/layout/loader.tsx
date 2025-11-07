export const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[9999]">
    <div className="relative flex items-center justify-center">
      <div className="absolute h-14 w-14 rounded-full border-4 border-t-transparent border-sky-400 animate-spin-slow"></div>
      <div className="absolute h-10 w-10 rounded-full border-4 border-t-transparent border-teal-400 animate-spin-reverse"></div>
      <span className="text-sm font-medium text-white absolute top-16">
        Loading...
      </span>
    </div>
  </div>
);
