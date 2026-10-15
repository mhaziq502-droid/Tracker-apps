// Thin storage layer. In the packaged Electron app it talks to the main
// process (JSON file in userData). In a plain browser (dev preview without
// Electron) it falls back to localStorage so the UI still works.

const BROWSER_KEY = 'aws-learning-store';
const EMPTY = { progress: {}, quizHistory: [], notesCache: {}, settings: {} };

function hasBridge() {
  return typeof window !== 'undefined' && !!window.awsLearning;
}

export async function loadStore() {
  if (hasBridge()) {
    try {
      const data = await window.awsLearning.getStore();
      return { ...EMPTY, ...data };
    } catch {
      return { ...EMPTY };
    }
  }
  try {
    const raw = localStorage.getItem(BROWSER_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : { ...EMPTY };
  } catch {
    return { ...EMPTY };
  }
}

export async function saveStore(data) {
  if (hasBridge()) {
    try {
      await window.awsLearning.setStore(data);
      return;
    } catch {
      /* fall through to browser */
    }
  }
  try {
    localStorage.setItem(BROWSER_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export async function fetchUrl(url) {
  if (hasBridge()) {
    try {
      return await window.awsLearning.fetchUrl(url);
    } catch {
      return { ok: false, status: 0, body: null };
    }
  }
  // Plain browser: attempt fetch (may be blocked by CORS; that's fine, we fall back).
  try {
    const res = await fetch(url);
    const body = await res.text();
    return { ok: res.ok, status: res.status, body };
  } catch {
    return { ok: false, status: 0, body: null };
  }
}

export function openExternal(url) {
  if (hasBridge()) {
    window.awsLearning.openExternal(url);
  } else {
    window.open(url, '_blank', 'noopener');
  }
}
