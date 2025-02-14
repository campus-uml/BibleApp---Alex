import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./setupTest.ts"],
      coverage: {
        provider: "v8",
        reporter: ['lcov', 'text'],
      },
    },
    define: {
      "import.meta.env.VITE_API_SUPABASE_URL": JSON.stringify(
        env.VITE_API_SUPABASE_URL
      ),
      "import.meta.env.VITE_API_SUPABASE_ANON_KEY": JSON.stringify(
        env.VITE_API_SUPABASE_ANON_KEY
      ),
    },
  };
});
