import React, { useState } from 'react';
import { useAppState } from './lib/useAppState.js';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './views/Dashboard.jsx';
import Notes from './views/Notes.jsx';
import Quiz from './views/Quiz.jsx';
import Interview from './views/Interview.jsx';
import Progress from './views/Progress.jsx';

export default function App() {
  const app = useAppState();
  const [view, setView] = useState('dashboard'); // dashboard | notes | quiz | interview | progress
  const [activeModule, setActiveModule] = useState(null);

  if (!app.store) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading your learning system…</p>
      </div>
    );
  }

  const goToModule = (moduleId, targetView = 'notes') => {
    setActiveModule(moduleId);
    setView(targetView);
  };

  return (
    <div className="app-shell">
      <Sidebar view={view} setView={setView} />
      <main className="content">
        {view === 'dashboard' && (
          <Dashboard app={app} goToModule={goToModule} setView={setView} />
        )}
        {view === 'notes' && (
          <Notes
            app={app}
            activeModule={activeModule}
            setActiveModule={setActiveModule}
          />
        )}
        {view === 'quiz' && (
          <Quiz
            app={app}
            activeModule={activeModule}
            setActiveModule={setActiveModule}
          />
        )}
        {view === 'interview' && <Interview />}
        {view === 'progress' && <Progress app={app} goToModule={goToModule} />}
      </main>
    </div>
  );
}
