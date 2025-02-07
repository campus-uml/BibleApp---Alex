import { defineConfig } from "cypress";
import { loadEnv } from "vite";
import dotenv from "dotenv";

dotenv.config();

const env = loadEnv("", process.cwd(), "VITE_");

export default defineConfig({
  projectId: env.VITE_CYPRESS_PROJECT_ID,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    supportFile: false,
  },
});