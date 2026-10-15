import React, { useEffect, useState } from 'react';
import { MODULES, getModule } from '../data/modules.js';
import { getNotes } from '../data/notes.js';
import { fetchUrl, openExternal } from '../lib/storage.js';
import { parseFeed } from '../lib/feed.js';
import ModulePicker from '../components/ModulePicker.jsx';

export default function Notes({ app, activeModule, setActiveModule }) {
  const moduleId = activeModule || MODULES[0].id;
  const module = getModule(moduleId);
  const notes = getNotes(moduleId);
  const progress = app.store.progress[moduleId]?.notes || {};

  const [feed, setFeed] = useState({ status: 'idle', items: [] });

  // Live-fetch the AWS "What's New" feed when the module changes.
  useEffect(() => {
    let cancelled = false;
    setFeed({ status: 'loading', items: [] });

    (async () => {
      const res = await fetchUrl(module.feedUrl);
      if (cancelled) return;
      if (res.ok && res.body) {
        const items = parseFeed(res.body).slice(0, 12);
        setFeed({ status: items.length ? 'ok' : 'empty', items });
      } else {
        setFeed({ status: 'offline', items: [] });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [moduleId]);

  const toggle = (sectionId) => {
    const done = !!progress[sectionId];
    app.markNoteComplete(moduleId, sectionId, !done);
  };

  return (
    <div className="view">
      <header className="view-header">
        <div>
          <h1>Study Notes</h1>
          <p className="subtitle">
            Core concepts (offline) plus live AWS updates fetched from the internet.
          </p>
        </div>
      </header>

      <ModulePicker
        modules={MODULES}
        activeId={moduleId}
        onPick={setActiveModule}
      />

      <section className="module-banner" style={{ '--accent': module.color }}>
        <div>
          <span className="module-code">{module.code}</span>
          <h2>{module.name}</h2>
          <p>{module.blurb}</p>
        </div>
        <button className="btn btn-ghost" onClick={() => openExternal(module.examGuideUrl)}>
          Official exam guide ↗
        </button>
      </section>

      <section>
        <h3 className="section-title">Core concepts</h3>
        <div className="notes-list">
          {notes.map((n) => {
            const done = !!progress[n.id];
            return (
              <article key={n.id} className={`note-card ${done ? 'done' : ''}`}>
                <div className="note-head">
                  <h4>{n.title}</h4>
                  <label className="note-check">
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggle(n.id)}
                    />
                    <span>{done ? 'Completed' : 'Mark done'}</span>
                  </label>
                </div>
                <ul className="note-body">
                  {n.body.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="section-title">
          Latest from AWS
          <span className="live-badge">
            {feed.status === 'loading' && '• fetching…'}
            {feed.status === 'ok' && '• live'}
            {(feed.status === 'offline' || feed.status === 'empty') && '• offline'}
          </span>
        </h3>

        {feed.status === 'loading' && (
          <div className="feed-placeholder">Fetching the latest AWS announcements…</div>
        )}

        {(feed.status === 'offline' || feed.status === 'empty') && (
          <div className="feed-placeholder">
            Couldn’t reach the live AWS feed right now. Your core concepts above work
            fully offline — reconnect to see the newest announcements.
          </div>
        )}

        {feed.status === 'ok' && (
          <ul className="feed-list">
            {feed.items.map((item, i) => (
              <li key={i} className="feed-item">
                <button
                  className="feed-link"
                  onClick={() => item.link && openExternal(item.link)}
                >
                  {item.title}
                </button>
                {item.summary && <p className="feed-summary">{item.summary}</p>}
                {item.date && (
                  <span className="feed-date">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
