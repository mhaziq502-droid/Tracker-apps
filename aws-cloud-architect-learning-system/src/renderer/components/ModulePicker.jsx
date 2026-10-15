import React from 'react';

// Horizontal scrollable list of module "chips" to switch the active module.
export default function ModulePicker({ modules, activeId, onPick }) {
  return (
    <div className="module-picker">
      {modules.map((m) => (
        <button
          key={m.id}
          className={`chip ${activeId === m.id ? 'active' : ''}`}
          style={{ '--accent': m.color }}
          onClick={() => onPick(m.id)}
          title={m.name}
        >
          {m.code}
        </button>
      ))}
    </div>
  );
}
