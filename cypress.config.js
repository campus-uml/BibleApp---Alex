import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "2k6vty",
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      config.env.VITE_API_SUPABASE_URL = process.env.VITE_API_SUPABASE_URL;
      config.env.VITE_API_SUPABASE_ANON_KEY =
        process.env.VITE_API_SUPABASE_ANON_KEY;
      console.log("Cypress env variables:");
      console.log(
        "VITE_API_SUPABASE_URL:",
        config.env.VITE_API_SUPABASE_URL ? "Configurado" : "No configurado"
      );
      console.log(
        "VITE_API_SUPABASE_ANON_KEY:",
        config.env.VITE_API_SUPABASE_ANON_KEY ? "Configurado" : "No configurado"
      );

      return config;
    },
  },
});
