const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "2k6vty",
  e2e: {
    baseUrl: "http://localhost:5173",
  },
});
