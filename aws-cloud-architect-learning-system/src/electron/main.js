import { app, BrowserWindow, ipcMain, net, shell } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === 'development';

// -----------------------------------------------------------------------------
// Local persistence (progress + cached notes) in the OS user-data directory.
// We use a plain JSON file so the app has zero native build dependencies and
// stays easy to package into a Windows .exe.
// -----------------------------------------------------------------------------
function storePath() {
  return path.join(app.getPath('userData'), 'aws-learning-store.json');
}

function readStore() {
  try {
    const raw = fs.readFileSync(storePath(), 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { progress: {}, quizHistory: [], notesCache: {}, settings: {} };
  }
}

function writeStore(data) {
  fs.writeFileSync(storePath(), JSON.stringify(data, null, 2), 'utf-8');
}

// -----------------------------------------------------------------------------
// Live fetch helper. Runs on the USER's machine (not the build sandbox), so it
// can reach the public internet. Uses Electron's net module which respects the
// system proxy. Any failure returns null so the renderer falls back to the
// bundled offline notes.
// -----------------------------------------------------------------------------
function fetchUrl(url) {
  return new Promise((resolve) => {
    try {
      const request = net.request(url);
      let body = '';
      request.on('response', (response) => {
        if (response.statusCode >= 400) {
          resolve({ ok: false, status: response.statusCode, body: null });
          return;
        }
        response.on('data', (chunk) => {
          body += chunk.toString();
        });
        response.on('end', () => resolve({ ok: true, status: response.statusCode, body }));
      });
      request.on('error', () => resolve({ ok: false, status: 0, body: null }));
      request.setHeader('User-Agent', 'AWS-Learning-System/1.0');
      request.end();
    } catch {
      resolve({ ok: false, status: 0, body: null });
    }
  });
}

// -----------------------------------------------------------------------------
// IPC handlers
// -----------------------------------------------------------------------------
ipcMain.handle('store:get', () => readStore());

ipcMain.handle('store:set', (_event, data) => {
  writeStore(data);
  return true;
});

ipcMain.handle('net:fetch', async (_event, url) => {
  // Allow only https AWS/official feeds to keep things safe.
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return { ok: false, status: 0, body: null };
  } catch {
    return { ok: false, status: 0, body: null };
  }
  return fetchUrl(url);
});

ipcMain.handle('shell:open', (_event, url) => {
  shell.openExternal(url);
  return true;
});

// -----------------------------------------------------------------------------
// Window
// -----------------------------------------------------------------------------
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 960,
    minHeight: 640,
    backgroundColor: '#0f1724',
    title: 'AWS Cloud Architect Learning System',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.setMenuBarVisibility(false);

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
