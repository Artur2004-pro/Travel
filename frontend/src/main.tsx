import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./hooks/useThem";
import { RouterProvider } from "react-router-dom";
import { router } from "./route.config";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
