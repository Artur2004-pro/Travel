interface MessagePopupProps {
  type: "success" | "error";
  text: string;
}

export const MessagePopup: React.FC<MessagePopupProps> = ({ type, text }) => (
  <div
    className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-medium transition-all duration-300 z-50 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`}
  >
    {text}
  </div>
);
