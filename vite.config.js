import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    return {
        build: {
            lib: {
                entry: 'src/index.ts',
                name: 'my-package',
                formats: ['es'],
            },
            rollupOptions: {
                external: [],
                output: {
                    globals: {},
                },
            },
        },
    };
});
