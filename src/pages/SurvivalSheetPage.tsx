import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";

const decisions = [
  {
    title: "Identify the distribution",
    lines: ["Independent yes/no trials: Binomial.", "Rare counts with large n and small p: Poisson with λ=np.", "Sums or averages with normal parent: exact Normal.", "Large-sample averages with finite variance: CLT Normal approximation.", "Squared standard normals or variance questions: chi-square and F."]
  },
  {
    title: "Choose z, t, chi-square or F",
    lines: ["Known population σ for a mean: z.", "Unknown σ and normal sample: t.", "One population variance from normal data: chi-square.", "Ratio of two independent normal-sample variances: F.", "Two independent means with equal variances: pooled two-sample t."]
  },
  {
    title: "Bayes, binomial, Poisson or normal",
    lines: ["The word 'given' means check conditional probability first.", "Posterior after evidence means Bayes.", "Exactly k successes with fixed n and p means Binomial.", "Rare count with no need for exact Binomial means Poisson.", "Marks, lifetimes and sample means often ask for Normal standardisation."]
  },
  {
    title: "Set integration limits for joint PDFs",
    lines: ["Draw the support before writing any integral.", "For 0<x<y<1: x can run 0 to 1, y runs x to 1.", "For 0<x<y<3: y can run 0 to 3, x runs 0 to y.", "For events such as X+Y<1, add the event boundary to the support drawing."]
  },
  {
    title: "Write a hypothesis test properly",
    lines: ["State H0 and HA.", "Name the test statistic and null distribution.", "State α and rejection rule.", "Compute the statistic.", "Conclude in words about evidence, not truth."]
  },
  {
    title: "Derive MLE without panic",
    lines: ["Write the full likelihood first.", "Log it only after the likelihood is clear.", "Differentiate and solve the first-order condition.", "Check parameter restrictions and boundaries.", "Use invariance for functions of the MLE."]
  },
  {
    title: "Use the Delta Method",
    lines: ["Start with a CLT for the base estimator.", "Identify g and compute g'.", "Evaluate g' at the true parameter.", "Square the derivative in the variance.", "Write both the limiting and approximate finite-n form if asked."]
  },
  {
    title: "Most common mistakes to avoid",
    lines: ["Using σ² where σ is needed.", "Forgetting standard error σ/√n.", "Using two-sided critical values for one-sided alternatives.", "Ignoring support dependence when testing independence.", "Treating unordered dice patterns as equally likely."]
  }
];

const lastTwelve = [
  "Redo PS4 P1-P4 and Sample Final P2-P7 under timed conditions.",
  "Memorise z/t/F test templates and the confidence interval decision rule.",
  "Practise three derivations: Poisson MLE, order statistics, Delta Method.",
  "Redo DS4 P1-P2 for support and Jacobian fluency.",
  "Use the visual lab for CLT, power and confidence interval coverage for 20 minutes.",
  "Ignore decorative theory proofs not represented in problem sets if time is critically short.",
  "End with the formula sheet and mistake log, not new material."
];

export function SurvivalSheetPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Final exam survival sheet"
        title="Last-mile decision rules"
        description="A compact guide for distribution choice, inference templates, integration limits, MLEs, Delta Method and the final 12 hours."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {decisions.map((section) => (
          <article key={section.title} className="paper-card rounded p-5">
            <h2 className="font-sans text-2xl font-semibold text-ink">{section.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-graphite">
              {section.lines.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <section className="paper-card mt-5 rounded p-5">
        <h2 className="font-sans text-3xl font-semibold text-ink">Last 12 Hours Before Exam</h2>
        <ol className="mt-4 grid list-decimal gap-3 pl-5 text-sm leading-6 text-graphite md:grid-cols-2">
          {lastTwelve.map((item) => <li key={item}>{item}</li>)}
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/exam-mode" className="focus-ring rounded bg-accent-hero px-4 py-2 text-sm text-white shadow-colour">Run a mock final</Link>
          <Link to="/problem-bank" className="focus-ring rounded border border-ink/15 bg-white/70 px-4 py-2 text-sm text-ink">Redo problem bank</Link>
        </div>
      </section>
    </div>
  );
}
