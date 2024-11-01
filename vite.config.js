import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Set the API URL based on environment variable or default
const apiUrl = process.env.VITE_API_URL || "https://api.thecyberhub.org";

export default defineConfig({
    base: "./", // This is crucial for all relative paths
    resolve: {
        alias: {
            src: path.resolve(__dirname, "./src"),
        },
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
    plugins: [
        react(),
        {
            name: "rewrite-asset-paths",
            enforce: "post",
            generateBundle(options, bundle) {
                // Process each chunk in the bundle
                Object.keys(bundle).forEach((fileName) => {
                    const chunk = bundle[fileName];
                    if (chunk.type === "chunk" || chunk.type === "asset") {
                        // Replace absolute paths with relative paths in the content
                        if (typeof chunk.code === "string") {
                            chunk.code = chunk.code.replace(/["']\/assets\//g, '"./assets/');
                        }
                        if (chunk.source) {
                            chunk.source = chunk.source.toString().replace(/["']\/assets\//g, '"./assets/');
                        }
                    }
                });
            },
        },
    ],
    build: {
        outDir: "dist",
        emptyOutDir: true,
        assetsDir: "assets",
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name].[hash][extname]",
                chunkFileNames: "assets/[name].[hash].js",
                entryFileNames: "assets/[name].[hash].js",
                // Ensure proper path resolution
                manualChunks: undefined,
            },
        },
        // Generate source maps for better debugging
        sourcemap: true,
    },
});
