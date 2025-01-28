import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BibleProvider } from "./context/BIbleContext.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";

createRoot(document.getElementById("root")!).render(
  <SidebarProvider>
    <BibleProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </BibleProvider>
  </SidebarProvider>
);
