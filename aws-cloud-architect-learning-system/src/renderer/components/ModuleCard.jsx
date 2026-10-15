import React from 'react';
import { moduleStats } from '../lib/useAppState.js';
import ProgressRing from './ProgressRing.jsx';

export default function ModuleCard({ module, store, onOpenNotes, onOpenQuiz }) {
  const stats = moduleStats(module.id, store);

  return (
    <div className="module-card" style={{ '--accent': module.color }}>
      <div className="module-card-head">
        <div>
          <span className="module-code">{module.code}</span>
          <span className="module-level">{module.level}</span>
        </div>
        <ProgressRing value={stats.completion} color={module.color} />
      </div>
      <h3>{module.name}</h3>
      <p className="module-blurb">{module.blurb}</p>
      <div className="module-metrics">
        <span>📚 {stats.notesDone}/{stats.totalNotes} topics</span>
        <span>📝 best {stats.bestScore}%</span>
      </div>
      <div className="module-actions">
        <button className="btn btn-primary" onClick={() => onOpenNotes(module.id)}>
          Study
        </button>
        <button className="btn btn-ghost" onClick={() => onOpenQuiz(module.id)}>
          Quiz
        </button>
      </div>
    </div>
  );
}
