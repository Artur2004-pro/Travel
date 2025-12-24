import { createPortal } from "react-dom";

export const MessagePopup = ({
  type,
  text,
}: {
  type: "success" | "error";
  text: string;
}) =>
  createPortal(
    <div className="fixed inset-x-0 top-4 z-[10000] flex justify-center pointer-events-none">
      <div
        className={[
          "px-4 py-2 rounded-lg text-xs sm:text-sm font-medium",
          "backdrop-blur bg-black/80 text-white",
          "animate-fade-in-down",
          type === "error" && "bg-rose-600/90",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {text}
      </div>
    </div>,
    document.body
  );
