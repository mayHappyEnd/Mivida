import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 打包时使用相对路径
  base: "./",
  server: {
    proxy: {
      "/api": "http://localhost:1337",
      "/upload": "http://localhost:1337",
    },
  },
});
