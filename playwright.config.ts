import { defineConfig } from "@playwright/test";
const port = Number(process.env.QA_PORT || 4175);
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  timeout: 45000,
  workers: 2,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["json", { outputFile: "docs/qa/playwright-results.json" }],
  ],
  use: {
    baseURL: process.env.QA_BASE_URL || `http://127.0.0.1:${port}`,
    channel:
      process.env.QA_BROWSER ||
      (process.platform === "win32" ? "msedge" : "chromium"),
    headless: true,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: process.env.QA_BASE_URL
    ? undefined
    : {
        command: `npm run preview -- --port ${port} --strictPort`,
        url: `http://127.0.0.1:${port}`,
        reuseExistingServer: true,
        timeout: 30000,
      },
});
