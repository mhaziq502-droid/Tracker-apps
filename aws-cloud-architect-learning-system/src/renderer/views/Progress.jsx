import React from 'react';
import { MODULES } from '../data/modules.js';
import { moduleStats, overallStats } from '../lib/useAppState.js';

export default function Progress({ app, goToModule }) {
  const overall = overallStats(app.store);
  const history = app.store.quizHistory;

  return (
    <div className="view">
      <header className="view-header">
        <div>
          <h1>Progress Tracker</h1>
          <p className="subtitle">
            Completion is 50% topics studied + 50% best quiz score, per module.
          </p>
        </div>
        <button
          className="btn btn-danger-ghost"
          onClick={() => {
            if (confirm('Reset ALL progress? This cannot be undone.')) app.resetAll();
          }}
        >
          Reset all
        </button>
      </header>

      <section className="overall-bar-wrap">
        <div className="overall-bar-head">
          <span>Overall progress</span>
          <strong>{overall.completion}%</strong>
        </div>
        <div className="overall-bar">
          <span style={{ width: `${overall.completion}%` }} />
        </div>
      </section>

      <section>
        <h2 className="section-title">By module</h2>
        <div className="progress-table">
          {MODULES.map((m) => {
            const s = moduleStats(m.id, app.store);
            return (
              <div key={m.id} className="progress-row" style={{ '--accent': m.color }}>
                <div className="progress-row-main">
                  <div className="progress-row-title">
                    <span className="module-code">{m.code}</span>
                    <span>{m.name}</span>
                  </div>
                  <div className="progress-row-bar">
                    <span style={{ width: `${s.completion}%` }} />
                  </div>
                </div>
                <div className="progress-row-stats">
                  <span>📚 {s.notesDone}/{s.totalNotes}</span>
                  <span>📝 {s.quizzesTaken}×</span>
                  <span>⭐ {s.bestScore}%</span>
                  <strong>{s.completion}%</strong>
                </div>
                <div className="progress-row-actions">
                  <button className="btn btn-ghost sm" onClick={() => goToModule(m.id, 'notes')}>
                    Study
                  </button>
                  <button className="btn btn-ghost sm" onClick={() => goToModule(m.id, 'quiz')}>
                    Quiz
                  </button>
                  <button
                    className="btn btn-danger-ghost sm"
                    onClick={() => {
                      if (confirm(`Reset progress for ${m.code}?`)) app.resetModule(m.id);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="section-title">Quiz history</h2>
        {history.length === 0 ? (
          <div className="feed-placeholder">No quizzes taken yet. Head to the Quizzes tab!</div>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Module</th>
                <th>Score</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => {
                const mod = MODULES.find((m) => m.id === h.moduleId);
                return (
                  <tr key={i}>
                    <td>{new Date(h.date).toLocaleString()}</td>
                    <td>{mod?.code || h.moduleId}</td>
                    <td>
                      {h.score}/{h.total}
                    </td>
                    <td>
                      <span className={`pill ${h.pct >= 70 ? 'pass' : 'fail'}`}>{h.pct}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
