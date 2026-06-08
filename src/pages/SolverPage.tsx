import { useMemo, useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { SolutionSteps } from "../components/SolutionSteps";
import { solve, solverLabels, type SolverInputs, type SolverKind } from "../lib/solvers";

const defaults: Record<SolverKind, SolverInputs> = {
  bayes: { prior: 0.1, sensitivity: 0.9, falsePositive: 0.1 },
  binomial: { n: 12, k: 1, p: 0.012 },
  poisson: { lambda: 0.7, k: 1 },
  normal: { x: 150, mu: 200, sigma: 39 },
  "ci-known": { mean: 18.7, sigma: Math.sqrt(20), n: 25, confidence: 0.9 },
  "ci-unknown": { mean: 18.7, sampleSd: Math.sqrt(22.5), n: 25, confidence: 0.9 },
  "z-test": { mean: 735, nullMean: 720, sigma: 48, n: 40, alpha: 0.05, tail: "greater" },
  "two-sample-t": { mean1: 105.5, mean2: 90.9, s1: 20.1, s2: 12.2, n1: 34, n2: 29 },
  "f-test": { s1: 5, s2: Math.sqrt(12), df1: 14, df2: 11, alpha: 0.01 },
  delta: { mu: 9, sigma: 4, n: 50 },
  power: { mu: 11, c: 10.987, sigma: 3, n: 25 },
};

const fieldLabels: Record<string, string> = {
  prior: "Prior P(H)",
  sensitivity: "P(E|H)",
  falsePositive: "P(E|not H)",
  n: "Sample size n",
  k: "Count k",
  p: "Success probability p",
  lambda: "Poisson lambda",
  x: "Cut-off x",
  mu: "True/population mean",
  sigma: "Known sigma",
  mean: "Sample mean",
  sampleSd: "Sample standard deviation",
  confidence: "Confidence level",
  nullMean: "Null mean",
  alpha: "Significance level",
  tail: "Alternative tail",
  mean1: "Mean 1",
  mean2: "Mean 2",
  s1: "Sample SD 1",
  s2: "Sample SD 2",
  n1: "Sample size 1",
  n2: "Sample size 2",
  df1: "Numerator degrees of freedom",
  df2: "Denominator degrees of freedom",
  c: "Critical sample mean c",
};

export function SolverPage() {
  const [kind, setKind] = useState<SolverKind>("z-test");
  const [values, setValues] = useState<SolverInputs>(defaults["z-test"]);
  const [question, setQuestion] = useState("");
  const [suggested, setSuggested] = useState<SolverKind | null>(null);
  const steps = useMemo(() => solve(kind, values), [kind, values]);

  const selectKind = (next: SolverKind) => {
    setKind(next);
    setValues(defaults[next]);
  };

  const suggest = () => {
    const q = question.toLowerCase();
    const next: SolverKind =
      q.includes("bayes") || q.includes("given that") ? "bayes" :
      q.includes("poisson") || q.includes("rare") ? "poisson" :
      q.includes("binomial") || q.includes("exactly") ? "binomial" :
      q.includes("confidence") && q.includes("unknown") ? "ci-unknown" :
      q.includes("confidence") ? "ci-known" :
      q.includes("two sample") || q.includes("treatment") ? "two-sample-t" :
      q.includes("variance") || q.includes("manufacturer") ? "f-test" :
      q.includes("delta") || q.includes("1/mu") ? "delta" :
      q.includes("power") || q.includes("reject when") ? "power" :
      q.includes("test") ? "z-test" : "normal";
    setSuggested(next);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Question solver workbench"
        title="Build the solution skeleton before calculating"
        description="Paste wording for an archetype suggestion, then enter the required values. The workbench runs fully offline and produces an exam-ready method."
      />
      <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
        <aside className="space-y-4">
          <div className="paper-card rounded p-4">
            <label className="text-xs uppercase tracking-[0.14em] text-brass">
              Paste question wording
              <textarea className="mt-2 h-32 w-full rounded border border-ink/15 bg-white px-3 py-2 text-sm normal-case tracking-normal text-ink" value={question} onChange={(event) => setQuestion(event.target.value)} />
            </label>
            <button className="focus-ring mt-3 w-full rounded bg-forest px-3 py-2 text-sm text-white" onClick={suggest}>Suggest archetype</button>
            {suggested ? (
              <button className="focus-ring mt-3 w-full rounded border border-forest/30 bg-forest/5 px-3 py-2 text-left text-sm text-forest" onClick={() => selectKind(suggested)}>
                Suggested: {solverLabels[suggested]}
              </button>
            ) : null}
          </div>
          <div className="paper-card rounded p-4">
            <label className="text-xs uppercase tracking-[0.14em] text-brass">
              Guided calculator
              <select className="mt-2 w-full rounded border border-ink/15 bg-white px-3 py-2 text-sm normal-case tracking-normal text-ink" value={kind} onChange={(event) => selectKind(event.target.value as SolverKind)}>
                {(Object.keys(solverLabels) as SolverKind[]).map((item) => <option key={item} value={item}>{solverLabels[item]}</option>)}
              </select>
            </label>
            <div className="mt-4 space-y-3">
              {Object.entries(values).map(([field, value]) => (
                <label key={field} className="block text-xs uppercase tracking-[0.12em] text-brass">
                  {fieldLabels[field] ?? field}
                  {field === "tail" ? (
                    <select className="mt-1 w-full rounded border border-ink/15 bg-white px-3 py-2 text-sm normal-case tracking-normal text-ink" value={String(value)} onChange={(event) => setValues((old) => ({ ...old, [field]: event.target.value }))}>
                      <option value="greater">greater than</option>
                      <option value="less">less than</option>
                      <option value="two-sided">two-sided</option>
                    </select>
                  ) : (
                    <input type="number" step="any" className="mt-1 w-full rounded border border-ink/15 bg-white px-3 py-2 text-sm normal-case tracking-normal text-ink" value={Number(value)} onChange={(event) => setValues((old) => ({ ...old, [field]: Number(event.target.value) }))} />
                  )}
                </label>
              ))}
            </div>
          </div>
        </aside>
        <section className="paper-card rounded p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">Generated answer format</div>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">{solverLabels[kind]}</h2>
          <div className="mt-5">
            <SolutionSteps steps={steps} />
          </div>
          <div className="mt-6 rounded border border-brass/30 bg-brass/5 p-4 text-sm leading-6 text-graphite">
            In an exam, define variables and state assumptions before substituting. For tests, include H0, HA, statistic, null distribution, alpha, rejection rule, computed value and conclusion.
          </div>
        </section>
      </div>
    </div>
  );
}
