import { useState } from "react";
import type { IShowMessage } from "../types";

export const useMessage = () => {
  const [message, setMessage] = useState<IShowMessage | null>(null);

  const showMessage = (
    type: "success" | "error",
    msg: string,
    delay: number = 3000,
    cb?: () => void
  ) => {
    setMessage({ type, text: msg });
    setTimeout(() => {
      setMessage(null);
      cb?.();
    }, delay);
  };

  return { message, showMessage };
};

export default useMessage;
