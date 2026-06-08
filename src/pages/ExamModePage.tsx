import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { SolutionSteps } from "../components/SolutionSteps";
import { problemBank } from "../data/problemBank";

const modes = [
  { id: "drill", label: "30-minute drill", minutes: 30, count: 4 },
  { id: "mock", label: "90-minute mock", minutes: 90, count: 7 },
  { id: "topic", label: "Topic-specific test", minutes: 45, count: 5 },
  { id: "sample", label: "Final sample replication", minutes: 90, count: 7 },
  { id: "hard", label: "Only hard questions", minutes: 60, count: 5 },
];

export function ExamModePage() {
  const [mode, setMode] = useState("drill");
  const [topic, setTopic] = useState("hypothesis");
  const config = modes.find((item) => item.id === mode) ?? modes[0];
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(config.minutes * 60);
  const [current, setCurrent] = useState(0);
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [mistakes, setMistakes] = useState<string[]>([]);

  const questions = useMemo(() => {
    let pool = problemBank;
    if (mode === "sample") pool = problemBank.filter((problem) => problem.source === "Sample Final Questions");
    if (mode === "hard") pool = problemBank.filter((problem) => problem.difficulty === "Hard" || problem.examRelevance === "Final");
    if (mode === "topic") pool = problemBank.filter((problem) => `${problem.tags.join(" ")} ${problem.archetype}`.toLowerCase().includes(topic.toLowerCase()));
    return deterministicShuffle(pool, mode + topic).slice(0, Math.min(config.count, pool.length));
  }, [mode, topic, config.count]);

  useEffect(() => {
    setSeconds(config.minutes * 60);
    setCurrent(0);
    setRevealedHints(0);
    setShowSolution(false);
    setStarted(false);
  }, [config.minutes, mode, topic]);

  useEffect(() => {
    if (!started || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [started, seconds]);

  const question = questions[current];
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

  if (!question) {
    return (
      <div>
        <PageHeader eyebrow="Exam mode" title="No matching questions" description="Choose a broader topic filter." />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Exam mode"
        title="Method marks, not answer theatre"
        description="Hints start hidden. Score yourself on set-up, formula, intermediate work and conclusion, then log the exact mistake."
      />
      <div className="paper-card mb-5 rounded p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <label className="text-xs uppercase tracking-[0.14em] text-brass">
            Mode
            <select className="mt-1 w-full rounded border border-ink/15 bg-white px-3 py-2 text-sm normal-case tracking-normal text-ink" value={mode} onChange={(event) => setMode(event.target.value)}>
              {modes.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          {mode === "topic" ? (
            <label className="text-xs uppercase tracking-[0.14em] text-brass">
              Topic
              <select className="mt-1 w-full rounded border border-ink/15 bg-white px-3 py-2 text-sm normal-case tracking-normal text-ink" value={topic} onChange={(event) => setTopic(event.target.value)}>
                {["probability", "joint", "transformation", "CLT", "MLE", "confidence", "hypothesis", "power"].map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          ) : <div />}
          <div className="rounded border border-ink/10 bg-white/70 px-3 py-2 text-sm">
            Time: <strong className={seconds < 300 ? "text-oxblood" : "text-ink"}>{formatTime(seconds)}</strong>
          </div>
          <button className="focus-ring rounded bg-ink px-4 py-2 text-sm text-paper" onClick={() => setStarted((value) => !value)}>
            {started ? "Pause timer" : "Start timer"}
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <section className="space-y-5">
          <article className="paper-card rounded p-5">
            <div className="text-xs uppercase tracking-[0.16em] text-brass">Question {current + 1} of {questions.length} · {question.source}</div>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">{question.title}</h2>
            <p className="mt-4 leading-7 text-graphite">{question.statement}</p>
          </article>

          <article className="paper-card rounded p-5">
            <h2 className="font-serif text-2xl font-semibold text-ink">Step-by-step hints</h2>
            <div className="mt-4 space-y-3">
              {question.solution.slice(0, revealedHints).map((step, index) => (
                <div key={step} className="rounded border border-ink/10 bg-white/70 p-3 text-sm leading-6 text-graphite">
                  Hint {index + 1}: {softenHint(step)}
                </div>
              ))}
              {revealedHints < Math.min(3, question.solution.length) ? (
                <button className="focus-ring rounded border border-ink/15 bg-white px-3 py-2 text-sm" onClick={() => setRevealedHints((value) => value + 1)}>
                  Reveal next hint
                </button>
              ) : null}
            </div>
          </article>

          {showSolution ? (
            <article className="paper-card rounded p-5">
              <h2 className="font-serif text-2xl font-semibold text-ink">Full solution</h2>
              <div className="mt-4"><SolutionSteps steps={question.solution} /></div>
              <div className="mt-5 rounded border border-forest/20 bg-forest/5 p-4 text-sm leading-6 text-graphite">
                Final answer: <strong className="text-ink">{question.finalAnswer}</strong>
              </div>
            </article>
          ) : (
            <button className="focus-ring rounded bg-oxblood px-4 py-2 text-sm text-white" onClick={() => setShowSolution(true)}>Reveal final solution</button>
          )}
        </section>

        <aside className="space-y-4">
          <div className="paper-card rounded p-5">
            <h2 className="font-serif text-xl font-semibold text-ink">Method score</h2>
            <p className="mt-2 text-sm leading-6 text-graphite">0: no method, 1: correct archetype, 2: formula, 3: intermediate steps, 4: complete exam answer.</p>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {[0, 1, 2, 3, 4].map((score) => (
                <button key={score} className={`focus-ring rounded border px-2 py-2 ${scores[question.id] === score ? "border-forest bg-forest text-white" : "border-ink/10 bg-white"}`} onClick={() => setScores((old) => ({ ...old, [question.id]: score }))}>
                  {score}
                </button>
              ))}
            </div>
          </div>
          <div className="paper-card rounded p-5">
            <h2 className="font-serif text-xl font-semibold text-ink">Mistake log</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {["wrong distribution", "wrong limits", "critical value", "algebra", "conclusion", "time"].map((mistake) => (
                <button key={mistake} className={`focus-ring rounded px-2 py-1 text-xs ${mistakes.includes(mistake) ? "bg-oxblood text-white" : "border border-ink/10 bg-white"}`} onClick={() => setMistakes((old) => old.includes(mistake) ? old.filter((item) => item !== mistake) : [...old, mistake])}>
                  {mistake}
                </button>
              ))}
            </div>
          </div>
          <div className="paper-card rounded p-5 text-sm leading-6 text-graphite">
            <strong className="text-ink">Current total:</strong> {totalScore}/{questions.length * 4}
            <p className="mt-2"><strong className="text-ink">Revision recommendation:</strong> {recommend(mistakes)}</p>
          </div>
          <div className="flex gap-2">
            <button disabled={current === 0} className="focus-ring flex-1 rounded border border-ink/15 bg-white px-3 py-2 text-sm disabled:opacity-40" onClick={() => move(-1)}>Previous</button>
            <button disabled={current === questions.length - 1} className="focus-ring flex-1 rounded bg-ink px-3 py-2 text-sm text-paper disabled:opacity-40" onClick={() => move(1)}>Next</button>
          </div>
        </aside>
      </div>
    </div>
  );

  function move(delta: number) {
    setCurrent((value) => value + delta);
    setRevealedHints(0);
    setShowSolution(false);
  }
}

function deterministicShuffle<T>(items: T[], key: string) {
  let seed = Array.from(key).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return [...items].sort(() => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280 - 0.5;
  });
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const rest = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function softenHint(step: string) {
  const sentence = step.split(".")[0];
  return sentence.length > 12 ? `${sentence}.` : step;
}

function recommend(mistakes: string[]) {
  if (mistakes.includes("wrong distribution")) return "Return to the archetype engine and the distribution decision rules.";
  if (mistakes.includes("wrong limits")) return "Redo DS4 P1 and the joint support visualiser.";
  if (mistakes.includes("critical value")) return "Review the formula sheet section on z, t, chi-square and F.";
  if (mistakes.includes("conclusion")) return "Use the six-line hypothesis-test answer template.";
  if (mistakes.includes("time")) return "Run a 30-minute drill with only high-relevance questions.";
  return "Continue with the next question and mark the exact point where the method became uncertain.";
}
