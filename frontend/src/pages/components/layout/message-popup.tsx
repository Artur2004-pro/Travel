import { createPortal } from "react-dom";

type Props = {
  type: "success" | "error";
  text: string;
};

export const MessagePopup = ({ type, text }: Props) =>
  createPortal(
    <div className="fixed inset-x-0 top-4 z-[10000] flex justify-center pointer-events-none">
      <div
        className={`
          px-4 py-2
          rounded-xl
          text-xs sm:text-sm font-medium
          backdrop-blur-md
          shadow-lg
          animate-fade-in-down
          ${
            type === "success"
              ? "bg-emerald-500/90 text-white"
              : "bg-rose-500/90 text-white"
          }
        `}
      >
        {text}
      </div>
    </div>,
    document.body
  );
