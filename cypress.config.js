import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "2k6vty",
  env: {
    SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY,
  },
  e2e: {
    baseUrl: "http://localhost:5173",
  },
});
