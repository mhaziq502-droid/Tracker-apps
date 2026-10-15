import React, { useMemo, useState } from 'react';
import { INTERVIEW } from '../data/interview.js';

export default function Interview() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState({}); // key -> bool

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INTERVIEW;
    return INTERVIEW.map((group) => ({
      ...group,
      items: group.items.filter(
        (it) =>
          it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q)
      ),
    })).filter((group) => group.items.length > 0);
  }, [query]);

  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  const totalCount = INTERVIEW.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="view">
      <header className="view-header">
        <div>
          <h1>Interview Q&amp;A</h1>
          <p className="subtitle">
            {totalCount} questions clients and interviewers most often ask a Cloud
            Solution Architect — with model answers.
          </p>
        </div>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search questions and answers…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length === 0 && (
        <div className="feed-placeholder">No questions match “{query}”.</div>
      )}

      {filtered.map((group) => (
        <section key={group.category} className="qa-group">
          <h2 className="section-title">{group.category}</h2>
          <div className="qa-list">
            {group.items.map((it, i) => {
              const key = `${group.category}-${i}`;
              const isOpen = !!open[key];
              return (
                <div key={key} className={`qa-item ${isOpen ? 'open' : ''}`}>
                  <button className="qa-question" onClick={() => toggle(key)}>
                    <span className="qa-chevron">{isOpen ? '▾' : '▸'}</span>
                    {it.q}
                  </button>
                  {isOpen && <p className="qa-answer">{it.a}</p>}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
