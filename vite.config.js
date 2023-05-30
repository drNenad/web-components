import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    return {
        build: {
            rollupOptions: {
                input: {
                    index: 'src/index.ts',
                    'axion-button': 'src/axion-button.ts',
                    'axion-spinner': 'src/axion-spinner.ts'
                },
                output: {
                    entryFileNames: '[name].js',
                }
            }
        }
    };
});
