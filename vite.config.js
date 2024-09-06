import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

let apiUrl;
if (process.env.VITE_API_URL) {
    apiUrl = process.env.VITE_API_URL;
} else {
    apiUrl = "https://api.thecyberhub.org";
}

export default defineConfig({
    resolve: {
        alias: { src: path.resolve("./src") },
    },
    server: {
        proxy: {
            "/api": {
                target: apiUrl,
                changeOrigin: true,
                secure: false,
            },
        },
        host: "0.0.0.0",
        port: 3000,
    },
    plugins: [react()],
    build: {
        rollupOptions: {
            external: ["node:path"],
        },
    },
});
