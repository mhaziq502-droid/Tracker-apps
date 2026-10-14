# Work Progress Tracker

A simple, private, single-user desktop app for your **Windows laptop** to track:

- ✅ **To-Dos** — add tasks and move them through *To Do → In Progress → Done*
- ✎ **Daily Journal** — write a dated log of what you worked on each day
- ▣ **Dashboard** — see today's progress at a glance (completion rate, open tasks, today's journal)

All data is stored **locally on your laptop** in a JSON file — no account, no internet, no cloud. Fully private.

Built with [Tauri 2](https://tauri.app/) (tiny, fast native Windows installer) + a lightweight HTML/CSS/JS frontend.

---

## 📦 How to build the installer on your Windows laptop

You only need to do the setup **once**. After that, building takes a couple of minutes.

### Step 1 — Install the prerequisites

Install these three things (all free):

1. **Node.js (LTS)** → https://nodejs.org/ (download the "LTS" installer and click through)
2. **Rust** → https://www.rust-lang.org/tools/install (download `rustup-init.exe`, run it, pick the default option `1`)
3. **Microsoft C++ Build Tools / WebView2**:
   - Install **Microsoft Visual Studio Build Tools**: https://visualstudio.microsoft.com/visual-studio-build-tools/
     During install, check the box **"Desktop development with C++"**.
   - **WebView2** is already included on Windows 10/11. (If you're on an older build, get it here: https://developer.microsoft.com/microsoft-edge/webview2/)

> 💡 After installing, **close and reopen** your terminal (PowerShell / Command Prompt) so the new tools are on your PATH.

Verify everything is installed by running these in a new terminal:

```powershell
node --version
npm --version
rustc --version
cargo --version
```

Each should print a version number.

### Step 2 — Get the project onto your laptop

Copy this whole project folder to your Windows laptop (via USB, cloud drive, or `git clone` if it's in a repo). Then open a terminal **inside the project folder** (the folder that contains `package.json`).

### Step 3 — Install dependencies

```powershell
npm install
```

### Step 4 — (Optional) Regenerate icons

The icons are already included, but if you ever want to regenerate them from the master image:

```powershell
npm run tauri icon app-icon.png
```

### Step 5 — Build the installer 🚀

```powershell
npm run tauri build
```

This compiles everything and produces your installers. When it finishes (first build takes a few minutes because Rust compiles from scratch), you'll find them here:

```
src-tauri\target\release\bundle\nsis\Work Progress Tracker_1.0.0_x64-setup.exe
src-tauri\target\release\bundle\msi\Work Progress Tracker_1.0.0_x64_en-US.msi
```

### Step 6 — Install it

Double-click the **`.exe`** (recommended) **or** the **`.msi`** installer and follow the prompts. The app will install and appear in your Start Menu as **Work Progress Tracker**. 🎉

---

## 🔧 Run in development mode (optional)

If you want to try/change the app without building a full installer:

```powershell
npm run tauri dev
```

This opens the app in a live window that reloads when you edit the code.

---

## 📁 Where is my data stored?

Your to-dos and journal entries are saved to:

```
C:\Users\<you>\AppData\Roaming\com.progresstracker.app\tracker-data.json
```

Back up that one file and you've backed up everything. Delete it to start fresh.

---

## 🗂️ Project structure

```
.
├── index.html              # App shell / markup
├── src/
│   ├── main.js             # App logic (to-dos, journal, dashboard)
│   ├── storage.js          # Local save/load (Tauri FS, with browser fallback)
│   └── styles.css          # Styling (dark theme)
├── src-tauri/              # Native desktop wrapper (Rust)
│   ├── Cargo.toml          # Rust dependencies
│   ├── tauri.conf.json     # App config (window, bundle targets, icons)
│   ├── capabilities/       # Filesystem permission grants
│   ├── icons/              # App icons (generated)
│   └── src/                # Rust entry points
├── make_icon.py            # Optional: regenerate base icon with pure Python
├── vite.config.js          # Frontend build config
└── package.json            # Node scripts & dependencies
```

---

## ❓ Troubleshooting

- **`cargo` / `rustc` not found** → You forgot to reopen the terminal after installing Rust, or Rust isn't on PATH. Reopen the terminal.
- **Linker / MSVC errors during build** → The "Desktop development with C++" workload from Visual Studio Build Tools isn't installed. Re-run the VS Build Tools installer and check that box.
- **`npm install` fails** → Make sure you're running it inside the project folder (where `package.json` lives).
- **Build is slow the first time** → Normal. Rust compiles all dependencies on the first build; later builds are much faster.
