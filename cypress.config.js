import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "2k6vty",
  e2e: {
    baseUrl: "http://localhost:5173",
  },
});
