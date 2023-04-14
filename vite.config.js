import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            // "/api": "http://localhost:5000",
            // "/api": "https://api.thecyberhub.org",
            "/api": {
                target: "http://localhost:5000",
                // target: "https://api.thecyberhub.org",
                // target: "https://alpha-testing-please-do-not-hack-us-1.thecyberhub.org",
                // target: "https://dev.api.thecyberhub.org",
                changeOrigin: true,
                secure: false,
            },
        },
        host: "0.0.0.0",
        port: 3000,
    },
    // preview: {
    //     port: 8080
    // },
    plugins: [react()],
});
