import { useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { ProblemCard } from "../components/ProblemCard";
import { problemBank, sourceNames, topicTags } from "../data/problemBank";

export function ProblemBankPage() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const [source, setSource] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [relevance, setRelevance] = useState("all");
  const [archetype, setArchetype] = useState("all");
  const [solved, setSolved] = useState<Record<string, boolean>>(() => JSON.parse(localStorage.getItem("stats-mastery-solved") ?? "{}"));

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return problemBank.filter((problem) => {
      const text = `${problem.title} ${problem.statement} ${problem.tags.join(" ")} ${problem.source}`.toLowerCase();
      return (
        text.includes(q) &&
        (topic === "all" || problem.tags.includes(topic)) &&
        (source === "all" || problem.source === source) &&
        (difficulty === "all" || problem.difficulty === difficulty) &&
        (relevance === "all" || problem.examRelevance === relevance) &&
        (archetype === "all" || problem.archetype === archetype)
      );
    });
  }, [query, topic, source, difficulty, relevance, archetype]);

  const toggleSolved = (id: string) => {
    const next = { ...solved, [id]: !solved[id] };
    setSolved(next);
    localStorage.setItem("stats-mastery-solved", JSON.stringify(next));
  };

  return (
    <div>
      <PageHeader eyebrow="Problem bank" title="Problems with solved methods" description="Search by source, topic, difficulty, exam relevance and archetype. Solved status is stored locally in your browser." />
      <div className="paper-card mb-5 rounded p-4">
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <input className="rounded border border-ink/15 bg-white/80 px-3 py-2 text-sm" placeholder="Search problems" value={query} onChange={(event) => setQuery(event.target.value)} />
          <Select value={topic} onChange={setTopic} options={["all", ...topicTags]} label="Topic" />
          <Select value={source} onChange={setSource} options={["all", ...sourceNames]} label="Source" />
          <Select value={difficulty} onChange={setDifficulty} options={["all", "Core", "Medium", "Hard", "Exam"]} label="Difficulty" />
          <Select value={relevance} onChange={setRelevance} options={["all", "Routine", "High", "Final"]} label="Relevance" />
          <Select value={archetype} onChange={setArchetype} options={["all", ...Array.from(new Set(problemBank.map((problem) => problem.archetype))).sort()]} label="Archetype" />
        </div>
      </div>
      <div className="mb-4 text-sm text-graphite">{filtered.length} problems shown · {Object.values(solved).filter(Boolean).length} marked solved</div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((problem) => (
          <div key={problem.id} className="relative">
            <ProblemCard problem={problem} />
            <button
              className={`focus-ring absolute bottom-3 right-3 rounded px-2 py-1 text-xs ${solved[problem.id] ? "bg-forest text-white" : "bg-white text-graphite border border-ink/10"}`}
              onClick={() => toggleSolved(problem.id)}
            >
              {solved[problem.id] ? "Solved" : "Mark solved"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Select({ value, onChange, options, label }: { value: string; onChange: (value: string) => void; options: string[]; label: string }) {
  return (
    <label className="text-xs uppercase tracking-[0.14em] text-brass">
      {label}
      <select className="mt-1 w-full rounded border border-ink/15 bg-white/80 px-3 py-2 text-sm normal-case tracking-normal text-ink" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option} value={option}>{option === "all" ? `All ${label.toLowerCase()}` : option}</option>)}
      </select>
    </label>
  );
}
