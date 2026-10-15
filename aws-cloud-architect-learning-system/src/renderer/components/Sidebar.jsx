import React from 'react';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'notes', label: 'Study Notes', icon: '📚' },
  { id: 'quiz', label: 'Quizzes', icon: '📝' },
  { id: 'interview', label: 'Interview Q&A', icon: '💬' },
  { id: 'progress', label: 'Progress', icon: '📊' },
];

export default function Sidebar({ view, setView }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">AWS</div>
        <div className="brand-text">
          <strong>Cloud Architect</strong>
          <span>Learning System</span>
        </div>
      </div>
      <nav>
        {NAV.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${view === item.id ? 'active' : ''}`}
            onClick={() => setView(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>Junior Cloud Solution Architect track</p>
      </div>
    </aside>
  );
}
