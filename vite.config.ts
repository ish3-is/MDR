import { defineConfig } from "vite";
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  build: { target: "es2022", cssCodeSplit: true },
  server: { host: "127.0.0.1" },
});
