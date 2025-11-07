import { createPortal } from "react-dom";

export const MessagePopup = ({
  type,
  text,
}: {
  type: "success" | "error";
  text: string;
}) =>
  createPortal(
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-sm font-semibold shadow-lg backdrop-blur-md z-[10000] transition-all animate-fade-in-down ${
        type === "success"
          ? "bg-emerald-500/90 text-white shadow-emerald-300/20"
          : "bg-rose-500/90 text-white shadow-rose-300/20"
      }`}
    >
      {text}
    </div>,
    document.body
  );
