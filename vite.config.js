import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    return {
        build: {
            lib: {
                entry: "src/axion-button.ts",
                formats: ["es"],
            }
        },
    };
});