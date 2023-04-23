import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.VITE_API_URL);

let apiUrl;
if (process.env.VITE_API_URL) {
    apiUrl = process.env.VITE_API_URL;
} else {
    apiUrl = "https://api.thecyberhub.org";
}

console.log("config", apiUrl);

export default defineConfig({
    server: {
        proxy: {
            // "/api": "http://localhost:5000",
            // "/api": "https://api.thecyberhub.org",
            "/api": {
                target: apiUrl,
                // target: "https://api.thecyberhub.org",
                // target: "https://api-thecyberhub-org.azurewebsites.net",
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
  build: {
        rollupOptions: {
            external: ["node:path"]
        }
    }
});
