import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: mode === "pages" ? "/Anker_AI_NPD_Copilot/" : "/",
  plugins: [react()],
}));
