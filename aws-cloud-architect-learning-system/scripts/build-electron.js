// Bundles the Electron main process with esbuild into dist-electron/main.js and
// copies the preload script. Keeps the build fast and dependency-light.
import esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'dist-electron');

fs.mkdirSync(outDir, { recursive: true });

await esbuild.build({
  entryPoints: [path.join(root, 'src/electron/main.js')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node18',
  outfile: path.join(outDir, 'main.js'),
  external: ['electron'],
  banner: {
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
});

// Preload must be CommonJS (.cjs) so copy it verbatim.
fs.copyFileSync(
  path.join(root, 'src/electron/preload.cjs'),
  path.join(outDir, 'preload.cjs')
);

console.log('[build-electron] main.js + preload.cjs written to dist-electron/');
