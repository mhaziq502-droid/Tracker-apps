import React, { useMemo, useState } from 'react';
import { MODULES, getModule } from '../data/modules.js';
import { getQuiz } from '../data/quizzes.js';
import ModulePicker from '../components/ModulePicker.jsx';

// Fisher–Yates shuffle (returns a new array).
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build a randomized quiz run: shuffle question order, and shuffle each
// question's options while remapping the correct-answer index.
function buildRun(bank, limit) {
  const picked = shuffle(bank).slice(0, limit || bank.length);
  return picked.map((item) => {
    const indexed = item.options.map((text, idx) => ({ text, idx }));
    const shuffled = shuffle(indexed);
    const answerIndex = shuffled.findIndex((o) => o.idx === item.answer);
    return {
      q: item.q,
      options: shuffled.map((o) => o.text),
      answer: answerIndex,
      explain: item.explain,
    };
  });
}

export default function Quiz({ app, activeModule, setActiveModule }) {
  const moduleId = activeModule || MODULES[0].id;
  const module = getModule(moduleId);
  const bank = getQuiz(moduleId);

  const [run, setRun] = useState(null); // array of randomized questions
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]); // {chosen, correct}

  const start = () => {
    setRun(buildRun(bank));
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
  };

  const choose = (idx) => {
    if (revealed) return;
    setSelected(idx);
  };

  const submit = () => {
    if (selected === null) return;
    const correct = selected === run[current].answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, { chosen: selected, correct }]);
    setRevealed(true);
  };

  const next = () => {
    if (current + 1 >= run.length) {
      setFinished(true);
      app.recordQuiz(moduleId, score, run.length);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const switchModule = (id) => {
    setActiveModule(id);
    setRun(null);
    setFinished(false);
  };

  const bestScore = app.store.progress[moduleId]?.bestScore || 0;

  return (
    <div className="view">
      <header className="view-header">
        <div>
          <h1>Quizzes</h1>
          <p className="subtitle">
            Randomized questions &amp; answer order every attempt. Best score is tracked per module.
          </p>
        </div>
      </header>

      <ModulePicker modules={MODULES} activeId={moduleId} onPick={switchModule} />

      {!run && (
        <section className="quiz-start" style={{ '--accent': module.color }}>
          <span className="module-code">{module.code}</span>
          <h2>{module.name}</h2>
          <p>
            {bank.length} question{bank.length === 1 ? '' : 's'} in this bank · best score {bestScore}%
          </p>
          {bank.length === 0 ? (
            <p className="feed-placeholder">No questions for this module yet.</p>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={start}>
              Start randomized quiz
            </button>
          )}
        </section>
      )}

      {run && !finished && (
        <section className="quiz-run">
          <div className="quiz-progress">
            <div className="quiz-progress-bar">
              <span style={{ width: `${(current / run.length) * 100}%` }} />
            </div>
            <span className="quiz-count">
              Question {current + 1} of {run.length}
            </span>
          </div>

          <div className="quiz-question">
            <h3>{run[current].q}</h3>
            <div className="quiz-options">
              {run[current].options.map((opt, idx) => {
                const isCorrect = revealed && idx === run[current].answer;
                const isWrongChoice =
                  revealed && idx === selected && idx !== run[current].answer;
                return (
                  <button
                    key={idx}
                    className={`quiz-option ${selected === idx ? 'selected' : ''} ${
                      isCorrect ? 'correct' : ''
                    } ${isWrongChoice ? 'wrong' : ''}`}
                    onClick={() => choose(idx)}
                    disabled={revealed}
                  >
                    <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {revealed && (
              <div className="quiz-explain">
                <strong>
                  {selected === run[current].answer ? '✅ Correct' : '❌ Incorrect'}
                </strong>
                <p>{run[current].explain}</p>
              </div>
            )}

            <div className="quiz-controls">
              {!revealed ? (
                <button
                  className="btn btn-primary"
                  onClick={submit}
                  disabled={selected === null}
                >
                  Submit answer
                </button>
              ) : (
                <button className="btn btn-primary" onClick={next}>
                  {current + 1 >= run.length ? 'See results' : 'Next question'}
                </button>
              )}
              <span className="quiz-live-score">Score: {score}</span>
            </div>
          </div>
        </section>
      )}

      {run && finished && (
        <section className="quiz-results" style={{ '--accent': module.color }}>
          <h2>Quiz complete!</h2>
          <div className="result-score">
            {score} / {run.length}
          </div>
          <div className="result-pct">
            {Math.round((score / run.length) * 100)}%
          </div>
          <p>
            {score / run.length >= 0.7
              ? '🎉 Great work — you’re on track for this certification.'
              : 'Keep going — review the notes and try again. Repetition builds mastery.'}
          </p>
          <div className="quiz-controls center">
            <button className="btn btn-primary" onClick={start}>
              Retake (new random order)
            </button>
            <button className="btn btn-ghost" onClick={() => setRun(null)}>
              Back to overview
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
