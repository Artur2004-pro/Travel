import { createPortal } from "react-dom";

type Props = {
  type: "success" | "error";
  text: string;
};

export const MessagePopup = ({ type, text }: Props) =>
  createPortal(
    <div className="fixed inset-x-0 top-4 z-[10000] flex justify-center pointer-events-none px-4">
      <div
        className={`
          px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg animate-fade-in
          ${type === "success"
            ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
            : "bg-red-500 text-white"
          }
        `}
      >
        {text}
      </div>
    </div>,
    document.body
  );
