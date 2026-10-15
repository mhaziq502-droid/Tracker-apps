import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Vite builds the React renderer. The output goes to `dist/`, which Electron
// loads in production. `base: './'` keeps asset paths relative so they resolve
// correctly from the file:// protocol inside the packaged app.
export default defineConfig({
  plugins: [react()],
  base: './',
  root: 'src/renderer',
  build: {
    outDir: fileURLToPath(new URL('./dist', import.meta.url)),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
