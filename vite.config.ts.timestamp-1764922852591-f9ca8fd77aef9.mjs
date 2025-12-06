// vite.config.ts
import { defineConfig } from "file:///C:/Users/Dee/Documents/pixel-prophet-92-2%20-%20Copy/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Dee/Documents/pixel-prophet-92-2%20-%20Copy/node_modules/@vitejs/plugin-react-swc/index.js";
import { fileURLToPath } from "node:url";
import { URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Dee/Documents/pixel-prophet-92-2%20-%20Copy/vite.config.ts";
var repo = (process.env.GITHUB_REPOSITORY || "").split("/")[1];
var isGhActions = !!process.env.GITHUB_ACTIONS;
var vite_config_default = defineConfig({
  plugins: [react()],
  base: isGhActions && repo ? `/${repo}/` : "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-accordion", "@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu"]
        }
      }
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    exclude: ["**/node_modules/**", "**/dist/**", "**/tests/visual/**"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxEZWVcXFxcRG9jdW1lbnRzXFxcXHBpeGVsLXByb3BoZXQtOTItMiAtIENvcHlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXERlZVxcXFxEb2N1bWVudHNcXFxccGl4ZWwtcHJvcGhldC05Mi0yIC0gQ29weVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvRGVlL0RvY3VtZW50cy9waXhlbC1wcm9waGV0LTkyLTIlMjAtJTIwQ29weS92aXRlLmNvbmZpZy50c1wiOy8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmNvbnN0IHJlcG8gPSAocHJvY2Vzcy5lbnYuR0lUSFVCX1JFUE9TSVRPUlkgfHwgJycpLnNwbGl0KCcvJylbMV1cbmNvbnN0IGlzR2hBY3Rpb25zID0gISFwcm9jZXNzLmVudi5HSVRIVUJfQUNUSU9OU1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIGJhc2U6IGlzR2hBY3Rpb25zICYmIHJlcG8gPyBgLyR7cmVwb30vYCA6ICcvJyxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICB2ZW5kb3I6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICB1aTogWydAcmFkaXgtdWkvcmVhY3QtYWNjb3JkaW9uJywgJ0ByYWRpeC11aS9yZWFjdC1kaWFsb2cnLCAnQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnUnXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgc2V0dXBGaWxlczogJy4vc3JjL3Rlc3Qvc2V0dXAudHMnLFxuICAgIGNzczogdHJ1ZSxcbiAgICBleGNsdWRlOiBbJyoqL25vZGVfbW9kdWxlcy8qKicsICcqKi9kaXN0LyoqJywgJyoqL3Rlc3RzL3Zpc3VhbC8qKiddLFxuICB9LFxufSBhcyBhbnkpXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsV0FBVztBQUo2TCxJQUFNLDJDQUEyQztBQU1sUSxJQUFNLFFBQVEsUUFBUSxJQUFJLHFCQUFxQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDL0QsSUFBTSxjQUFjLENBQUMsQ0FBQyxRQUFRLElBQUk7QUFFbEMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE1BQU0sZUFBZSxPQUFPLElBQUksSUFBSSxNQUFNO0FBQUEsRUFDMUMsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsVUFDakQsSUFBSSxDQUFDLDZCQUE2QiwwQkFBMEIsK0JBQStCO0FBQUEsUUFDN0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxJQUNaLEtBQUs7QUFBQSxJQUNMLFNBQVMsQ0FBQyxzQkFBc0IsY0FBYyxvQkFBb0I7QUFBQSxFQUNwRTtBQUNGLENBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
