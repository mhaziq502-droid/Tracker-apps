import { useCallback, useEffect, useRef, useState } from 'react';
import { loadStore, saveStore } from './storage.js';
import { MODULES } from '../data/modules.js';
import { getNotes } from '../data/notes.js';
import { getQuiz } from '../data/quizzes.js';

// Central app state: progress + quiz history, persisted via the storage layer.
// Shape of `store`:
// {
//   progress: {
//     [moduleId]: { notes: { [sectionId]: true }, quizzesTaken: number, bestScore: number }
//   },
//   quizHistory: [ { moduleId, score, total, date } ],
//   settings: {}
// }

export function useAppState() {
  const [store, setStore] = useState(null);
  const saveTimer = useRef(null);

  useEffect(() => {
    loadStore().then(setStore);
  }, []);

  // Debounced persistence whenever store changes.
  useEffect(() => {
    if (!store) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => saveStore(store), 250);
    return () => clearTimeout(saveTimer.current);
  }, [store]);

  const markNoteComplete = useCallback((moduleId, sectionId, complete = true) => {
    setStore((prev) => {
      const next = structuredClone(prev);
      next.progress[moduleId] = next.progress[moduleId] || {
        notes: {},
        quizzesTaken: 0,
        bestScore: 0,
      };
      if (complete) {
        next.progress[moduleId].notes[sectionId] = true;
      } else {
        delete next.progress[moduleId].notes[sectionId];
      }
      return next;
    });
  }, []);

  const recordQuiz = useCallback((moduleId, score, total) => {
    setStore((prev) => {
      const next = structuredClone(prev);
      next.progress[moduleId] = next.progress[moduleId] || {
        notes: {},
        quizzesTaken: 0,
        bestScore: 0,
      };
      next.progress[moduleId].quizzesTaken += 1;
      const pct = total > 0 ? Math.round((score / total) * 100) : 0;
      next.progress[moduleId].bestScore = Math.max(
        next.progress[moduleId].bestScore || 0,
        pct
      );
      next.quizHistory.unshift({
        moduleId,
        score,
        total,
        pct,
        date: new Date().toISOString(),
      });
      // Keep history bounded.
      next.quizHistory = next.quizHistory.slice(0, 200);
      return next;
    });
  }, []);

  const resetModule = useCallback((moduleId) => {
    setStore((prev) => {
      const next = structuredClone(prev);
      delete next.progress[moduleId];
      next.quizHistory = next.quizHistory.filter((h) => h.moduleId !== moduleId);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setStore({ progress: {}, quizHistory: [], notesCache: {}, settings: {} });
  }, []);

  return {
    store,
    markNoteComplete,
    recordQuiz,
    resetModule,
    resetAll,
  };
}

// ---- Derived progress helpers (pure functions) -----------------------------

export function moduleStats(moduleId, store) {
  const totalNotes = getNotes(moduleId).length;
  const totalQuiz = getQuiz(moduleId).length;
  const p = store?.progress?.[moduleId];
  const notesDone = p ? Object.keys(p.notes || {}).length : 0;
  const bestScore = p?.bestScore || 0;
  const quizzesTaken = p?.quizzesTaken || 0;

  // Completion = half notes coverage + half best-quiz score.
  const notesPct = totalNotes ? notesDone / totalNotes : 0;
  const quizPct = quizzesTaken > 0 ? bestScore / 100 : 0;
  const completion = Math.round((notesPct * 0.5 + quizPct * 0.5) * 100);

  return {
    totalNotes,
    notesDone,
    totalQuiz,
    quizzesTaken,
    bestScore,
    completion,
  };
}

export function overallStats(store) {
  if (!store) return { completion: 0, notesDone: 0, totalNotes: 0, quizzesTaken: 0 };
  let notesDone = 0;
  let totalNotes = 0;
  let completionSum = 0;
  let quizzesTaken = 0;

  for (const m of MODULES) {
    const s = moduleStats(m.id, store);
    notesDone += s.notesDone;
    totalNotes += s.totalNotes;
    quizzesTaken += s.quizzesTaken;
    completionSum += s.completion;
  }

  return {
    completion: MODULES.length ? Math.round(completionSum / MODULES.length) : 0,
    notesDone,
    totalNotes,
    quizzesTaken,
  };
}
