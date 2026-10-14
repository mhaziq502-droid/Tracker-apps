// storage.js — persistence layer.
// Uses the Tauri filesystem plugin to store data in the app's data directory
// when running as a desktop app. Falls back to localStorage in a plain browser
// (so `npm run dev` previews still work).

const FILE_NAME = "tracker-data.json";

const EMPTY = { todos: [], journal: {} };

// Detect whether we're running inside Tauri.
function isTauri() {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

async function tauriFs() {
  // Imported lazily so the browser fallback doesn't try to resolve the plugin.
  const fs = await import("@tauri-apps/plugin-fs");
  return fs;
}

export async function loadData() {
  try {
    if (isTauri()) {
      const { readTextFile, exists, BaseDirectory } = await tauriFs();
      const there = await exists(FILE_NAME, { baseDir: BaseDirectory.AppData });
      if (!there) return structuredClone(EMPTY);
      const raw = await readTextFile(FILE_NAME, { baseDir: BaseDirectory.AppData });
      return normalize(JSON.parse(raw));
    } else {
      const raw = localStorage.getItem(FILE_NAME);
      return raw ? normalize(JSON.parse(raw)) : structuredClone(EMPTY);
    }
  } catch (err) {
    console.error("Failed to load data, starting fresh:", err);
    return structuredClone(EMPTY);
  }
}

export async function saveData(data) {
  const payload = JSON.stringify(data, null, 2);
  try {
    if (isTauri()) {
      const { writeTextFile, mkdir, exists, BaseDirectory } = await tauriFs();
      // Ensure the AppData directory exists before writing.
      const dirThere = await exists("", { baseDir: BaseDirectory.AppData }).catch(() => false);
      if (!dirThere) {
        await mkdir("", { baseDir: BaseDirectory.AppData, recursive: true }).catch(() => {});
      }
      await writeTextFile(FILE_NAME, payload, { baseDir: BaseDirectory.AppData });
    } else {
      localStorage.setItem(FILE_NAME, payload);
    }
  } catch (err) {
    console.error("Failed to save data:", err);
  }
}

// Guards against partially-shaped / older data files.
function normalize(data) {
  return {
    todos: Array.isArray(data?.todos) ? data.todos : [],
    journal: data?.journal && typeof data.journal === "object" ? data.journal : {},
  };
}
