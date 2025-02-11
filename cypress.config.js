const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "huddwf",
  e2e: {
    baseUrl: "http://localhost:5173",
  },
});
