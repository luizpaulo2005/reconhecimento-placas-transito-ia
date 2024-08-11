import { App } from "@/app";
import { ThemeProvider } from "@/providers/theme";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <Toaster richColors />
      <App />
    </ThemeProvider>
  </StrictMode>
);
