import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BibleProvider } from "./context/BIbleContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BibleProvider>
    <StrictMode>
      <App />
    </StrictMode>
    
  </BibleProvider>
);
