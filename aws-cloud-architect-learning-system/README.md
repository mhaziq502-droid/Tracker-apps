# AWS Cloud Architect Learning System

A cross-platform **desktop learning application** for anyone studying to become a
**Junior AWS Cloud Solution Architect**. Built with **Electron + React + Vite**,
it packages into a native Windows `.exe` installer (and macOS/Linux builds too).

![status](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)
![stack](https://img.shields.io/badge/stack-Electron%20%2B%20React%20%2B%20Vite-success)

---

## ✨ Features

### 📚 Study Notes — organized by certification
Covers all the major AWS certification tracks, each with curated **core-concept
notes that work fully offline**:

| Code | Certification | Level |
|------|---------------|-------|
| CLF-C02 | Cloud Practitioner | Foundational |
| AIF-C01 | AI Practitioner | Foundational |
| SAA-C03 | Solutions Architect – Associate | Associate |
| DVA-C02 | Developer – Associate | Associate |
| SOA-C02 | SysOps Administrator – Associate | Associate |
| MLA-C01 | Machine Learning Engineer – Associate | Associate |
| SAP-C02 | Solutions Architect – Professional | Professional |
| DOP-C02 | DevOps Engineer – Professional | Professional |
| ANS-C01 | Advanced Networking – Specialty | Specialty |
| SCS-C02 | Security – Specialty | Specialty |

Each module also **fetches the latest AWS announcements live from the internet**
(AWS "What's New" feed) when the app runs on your machine, with a graceful
offline fallback. A link to the official AWS exam guide opens in your browser.

### 📝 Quizzes — randomized, per certification
- A dedicated question bank per certification module.
- **Every attempt randomizes the order of questions _and_ the order of answer
  options** (the correct-answer index is remapped so scoring stays correct).
- Immediate feedback with an explanation after each question.
- Best score per module is tracked.

### 💬 Interview Q&A for Cloud Solution Architects
The questions clients and interviewers most often ask a Cloud Solution
Architect — architecture, security, networking, cost, migration and behavioral —
each with a concise **model answer**. Full-text searchable.

### 📊 Progress Tracker
- Per-module completion = **50% topics studied + 50% best quiz score**.
- Overall progress across all certifications.
- Full quiz history with pass/fail pills.
- Reset per-module or all progress. Everything is stored **locally** on your
  machine (JSON in the app's user-data directory), so your progress is private.

---

## 🖥️ How content is fetched "from the internet"

Live fetching runs **on the end-user's machine**, not at build time. The Electron
main process uses the `net` module (which respects the system proxy) to pull the
public AWS "What's New" feed and parse it in the renderer. If the network is
unavailable, the app seamlessly shows the bundled curated notes instead — so it
is useful **both online and offline**.

> Only `https://` requests to AWS feeds are allowed by the main process for safety.

---

## 🚀 Getting started (development)

Requirements: **Node.js 18+**.

```bash
npm install        # install dependencies
npm run dev        # launch Vite + Electron in dev mode (hot reload)
```

The renderer also runs in a plain browser (`npm run build:renderer` then preview),
falling back to `localStorage` for persistence when Electron isn't present.

---

## 📦 Building the Windows `.exe`

```bash
npm run dist:win   # produces release/AWS-Learning-System-Setup-<version>.exe
```

Other targets:

```bash
npm run dist       # build for the current platform
npm run dist -- --mac    # macOS .dmg
npm run dist -- --linux  # Linux AppImage + .deb
```

> **Note:** A Windows `.exe` must be produced on a Windows machine (or a CI runner
> with Windows / Wine). `electron-builder` handles the packaging; this repo is
> pre-configured with an NSIS installer target under `build.win` in `package.json`.

A ready-to-use GitHub Actions workflow (`.github/workflows/build.yml`) builds the
Windows installer on every tag and uploads it as an artifact.

---

## 🗂️ Project structure

```
aws-learning-system/
├─ src/
│  ├─ electron/
│  │  ├─ main.js          # Electron main process (window, IPC, local storage, net fetch)
│  │  └─ preload.cjs      # safe bridge exposed to the renderer
│  └─ renderer/           # React app (Vite root)
│     ├─ main.jsx
│     ├─ App.jsx
│     ├─ styles.css
│     ├─ components/      # Sidebar, ModuleCard, ProgressRing, ModulePicker
│     ├─ views/           # Dashboard, Notes, Quiz, Interview, Progress
│     ├─ lib/             # storage, feed parser, app-state hook
│     └─ data/            # modules, notes, quizzes, interview content
├─ scripts/build-electron.js
├─ vite.config.js
└─ package.json
```

---

## 📝 Extending the content

- **Add quiz questions:** edit `src/renderer/data/quizzes.js` — add objects with
  `q`, `options`, `answer` (correct index) and `explain`.
- **Add notes:** edit `src/renderer/data/notes.js`.
- **Add interview Q&A:** edit `src/renderer/data/interview.js`.
- **Add a module:** add an entry to `src/renderer/data/modules.js` (the UI,
  progress tracking and quizzes wire up automatically).

---

## License

MIT © mhaziq502-droid
