import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // GitHub Pages deployment configuration
  base: mode === 'production' ? '/pixel-prophet-92/' : '/',
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/unsplash": {
        target: "https://images.unsplash.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/unsplash/, ""),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
