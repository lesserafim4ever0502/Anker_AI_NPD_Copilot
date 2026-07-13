import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/Anker_AI_NPD_Copilot/" : "/",
  plugins: [react()],
});
