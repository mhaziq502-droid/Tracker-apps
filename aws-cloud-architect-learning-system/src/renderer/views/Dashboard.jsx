import React from 'react';
import { MODULES } from '../data/modules.js';
import { overallStats } from '../lib/useAppState.js';
import ModuleCard from '../components/ModuleCard.jsx';
import ProgressRing from '../components/ProgressRing.jsx';

export default function Dashboard({ app, goToModule, setView }) {
  const overall = overallStats(app.store);
  const recent = app.store.quizHistory.slice(0, 5);

  return (
    <div className="view">
      <header className="view-header">
        <div>
          <h1>Welcome back 👋</h1>
          <p className="subtitle">
            Your path to becoming a Junior AWS Cloud Solution Architect.
          </p>
        </div>
      </header>

      <section className="hero-stats">
        <div className="hero-ring">
          <ProgressRing value={overall.completion} size={120} stroke={10} color="#f59e0b" />
          <span className="hero-ring-caption">Overall progress</span>
        </div>
        <div className="hero-cards">
          <div className="stat-card">
            <span className="stat-value">{MODULES.length}</span>
            <span className="stat-label">Certification modules</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {overall.notesDone}/{overall.totalNotes}
            </span>
            <span className="stat-label">Topics studied</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{overall.quizzesTaken}</span>
            <span className="stat-label">Quizzes completed</span>
          </div>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="recent">
          <h2>Recent quiz activity</h2>
          <ul className="recent-list">
            {recent.map((h, i) => {
              const mod = MODULES.find((m) => m.id === h.moduleId);
              return (
                <li key={i}>
                  <span className="recent-dot" style={{ background: mod?.color }} />
                  <span className="recent-mod">{mod?.code || h.moduleId}</span>
                  <span className="recent-score">
                    {h.score}/{h.total} ({h.pct}%)
                  </span>
                  <span className="recent-date">
                    {new Date(h.date).toLocaleDateString()}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section>
        <h2 className="section-title">Certification modules</h2>
        <div className="module-grid">
          {MODULES.map((m) => (
            <ModuleCard
              key={m.id}
              module={m}
              store={app.store}
              onOpenNotes={(id) => goToModule(id, 'notes')}
              onOpenQuiz={(id) => goToModule(id, 'quiz')}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
