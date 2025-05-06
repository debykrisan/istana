import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { esbuildCommonjs, viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), viteCommonjs()],
    optimizeDeps: {
        esbuildOptions: {
            plugins: [esbuildCommonjs(["pdfmake", "vfs_fonts"])],
        },
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    base: "/portal-istana/",
    build: {
        outDir: "./dist/portal-istana/",
    },
    server: {
        host: true,
        port: 3000,
        proxy: {
            "/api": {
                // target: "http://192.168.100.251:31072",
                target: "http://0.0.0.0:8181",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
