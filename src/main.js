// main.js — application logic for the Work Progress Tracker.
import { loadData, saveData } from "./storage.js";

// ---------- State ----------
let state = { todos: [], journal: {} };
let currentFilter = "all";

const STATUSES = ["todo", "in-progress", "done"];
const STATUS_LABELS = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function todayISO() {
  // Local date in YYYY-MM-DD (not UTC) so "today" matches the user's clock.
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
}

function prettyDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

async function persist() {
  await saveData(state);
}

// ---------- Navigation ----------
function switchView(view) {
  $$(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.view === view));
  $$(".view").forEach((v) => v.classList.toggle("active", v.id === `view-${view}`));
  if (view === "dashboard") renderDashboard();
}

// ---------- To-Dos ----------
function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  state.todos.unshift({
    id: uid(),
    text: trimmed,
    status: "todo",
    createdAt: todayISO(),
  });
  persist();
  renderTodos();
}

function updateTodoStatus(id, status) {
  const t = state.todos.find((x) => x.id === id);
  if (t) {
    t.status = status;
    persist();
    renderTodos();
  }
}

function deleteTodo(id) {
  state.todos = state.todos.filter((x) => x.id !== id);
  persist();
  renderTodos();
}

function renderTodos() {
  const list = $("#todo-list");
  const empty = $("#todo-empty");
  const filtered =
    currentFilter === "all"
      ? state.todos
      : state.todos.filter((t) => t.status === currentFilter);

  list.innerHTML = "";

  if (filtered.length === 0) {
    empty.classList.remove("hidden");
    empty.textContent =
      state.todos.length === 0
        ? "No tasks yet. Add one above to get started."
        : "No tasks match this filter.";
  } else {
    empty.classList.add("hidden");
  }

  for (const t of filtered) {
    const li = document.createElement("li");
    li.className = `todo-item status-${t.status}`;

    const dot = document.createElement("span");
    dot.className = `status-dot ${t.status}`;

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = t.text;

    const select = document.createElement("select");
    select.className = "todo-select";
    for (const s of STATUSES) {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = STATUS_LABELS[s];
      if (s === t.status) opt.selected = true;
      select.appendChild(opt);
    }
    select.addEventListener("change", () => updateTodoStatus(t.id, select.value));

    const del = document.createElement("button");
    del.className = "todo-delete";
    del.innerHTML = "&times;";
    del.title = "Delete task";
    del.addEventListener("click", () => deleteTodo(t.id));

    li.append(dot, text, select, del);
    list.appendChild(li);
  }
}

// ---------- Journal ----------
function saveJournalEntry() {
  const date = $("#journal-date").value || todayISO();
  const text = $("#journal-text").value;
  if (text.trim() === "") {
    // Empty entry removes any existing one for that date.
    delete state.journal[date];
  } else {
    state.journal[date] = { text, updatedAt: new Date().toISOString() };
  }
  persist();
  renderJournalList();

  const note = $("#journal-saved");
  note.textContent = "Saved ✓";
  setTimeout(() => (note.textContent = ""), 1800);
}

function loadJournalForDate(date) {
  $("#journal-date").value = date;
  $("#journal-text").value = state.journal[date]?.text || "";
}

function renderJournalList() {
  const list = $("#journal-list");
  const empty = $("#journal-empty");
  const dates = Object.keys(state.journal).sort().reverse();

  list.innerHTML = "";
  empty.classList.toggle("hidden", dates.length !== 0);

  for (const date of dates) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "journal-entry-btn";

    const dateEl = document.createElement("div");
    dateEl.className = "journal-entry-date";
    dateEl.textContent = prettyDate(date);

    const snippet = document.createElement("div");
    snippet.className = "journal-entry-snippet";
    snippet.textContent = state.journal[date].text.replace(/\s+/g, " ").slice(0, 80);

    btn.append(dateEl, snippet);
    btn.addEventListener("click", () => loadJournalForDate(date));
    li.appendChild(btn);
    list.appendChild(li);
  }
}

// ---------- Dashboard ----------
function renderDashboard() {
  const total = state.todos.length;
  const inProgress = state.todos.filter((t) => t.status === "in-progress").length;
  const done = state.todos.filter((t) => t.status === "done").length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  $("#stat-total").textContent = total;
  $("#stat-progress").textContent = inProgress;
  $("#stat-done").textContent = done;
  $("#stat-pct").textContent = pct + "%";
  $("#progress-fill").style.width = pct + "%";
  $("#dash-date").textContent = prettyDate(todayISO());

  // Open tasks (not done)
  const open = state.todos.filter((t) => t.status !== "done").slice(0, 6);
  const dashTasks = $("#dash-tasks");
  dashTasks.innerHTML = "";
  if (open.length === 0) {
    const li = document.createElement("li");
    li.textContent = "🎉 Nothing open — you're all caught up!";
    dashTasks.appendChild(li);
  } else {
    for (const t of open) {
      const li = document.createElement("li");
      const dot = document.createElement("span");
      dot.className = `status-dot ${t.status}`;
      const span = document.createElement("span");
      span.textContent = t.text;
      li.append(dot, span);
      dashTasks.appendChild(li);
    }
  }

  // Today's journal preview
  const todayEntry = state.journal[todayISO()];
  const preview = $("#dash-journal");
  preview.textContent = todayEntry?.text
    ? todayEntry.text
    : "No journal entry for today yet. Head to the Journal tab to add one.";
}

// ---------- Init ----------
async function init() {
  state = await loadData();

  // Sidebar footer date
  $("#today-label").textContent = prettyDate(todayISO());

  // Navigation
  $$(".nav-btn").forEach((btn) =>
    btn.addEventListener("click", () => switchView(btn.dataset.view))
  );

  // To-do form
  $("#todo-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#todo-input");
    addTodo(input.value);
    input.value = "";
    input.focus();
  });

  // Filters
  $$(".filter-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      $$(".filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderTodos();
    })
  );

  // Journal
  $("#journal-date").value = todayISO();
  loadJournalForDate(todayISO());
  $("#journal-save").addEventListener("click", saveJournalEntry);
  $("#journal-date").addEventListener("change", (e) => loadJournalForDate(e.target.value));

  // First render
  renderTodos();
  renderJournalList();
  renderDashboard();
}

init();
