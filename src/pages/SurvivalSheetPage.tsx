import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";

const decisions = [
  {
    title: "Identify the distribution",
    lines: ["Independent yes/no trials: Binomial.", "Rare counts with large n and small p: Poisson with lambda = np.", "Sums or averages with a normal parent: exact Normal.", "Large-sample averages with finite variance: CLT Normal approximation.", "Squared standard normals or variance questions: chi-square and F."]
  },
  {
    title: "Choose z, t, chi-square or F",
    lines: ["Known population sigma for a mean: z.", "Unknown sigma and a normal sample: t.", "One population variance from normal data: chi-square.", "Ratio of two independent normal-sample variances: F.", "Two independent means with equal variances: pooled two-sample t."]
  },
  {
    title: "Bayes, binomial, Poisson or normal",
    lines: ["The word 'given' means check conditional probability first.", "Posterior after evidence means Bayes.", "Exactly k successes with fixed n and p means Binomial.", "Rare count with no need for exact Binomial means Poisson.", "Marks, lifetimes and sample means often ask for Normal standardisation."]
  },
  {
    title: "Set integration limits for joint PDFs",
    lines: ["Draw the support before writing any integral.", "For 0 < x < y < 1: x can run 0 to 1, y runs x to 1.", "For 0 < x < y < 3: y can run 0 to 3, x runs 0 to y.", "For events such as X + Y < 1, add the event boundary to the support drawing."]
  },
  {
    title: "Write a hypothesis test properly",
    lines: ["State H0 and HA.", "Name the test statistic and null distribution.", "State alpha and the rejection rule.", "Compute the statistic.", "Conclude in words about evidence, not truth."]
  },
  {
    title: "Derive MLE calmly",
    lines: ["Write the full likelihood first.", "Log it only after the likelihood is clear.", "Differentiate and solve the first-order condition.", "Check parameter restrictions and boundaries.", "Use invariance for functions of the MLE."]
  },
  {
    title: "Use the Delta Method",
    lines: ["Start with a CLT for the base estimator.", "Identify g and compute g'.", "Evaluate g' at the true parameter.", "Square the derivative in the variance.", "Write both the limiting and approximate finite-n form if asked."]
  },
  {
    title: "Common mistakes to avoid",
    lines: ["Using sigma squared where sigma is needed.", "Forgetting standard error sigma / sqrt(n).", "Using two-sided critical values for one-sided alternatives.", "Ignoring support dependence when testing independence.", "Treating unordered dice patterns as equally likely."]
  }
];

const lastTwelve = [
  "Redo the hardest inference, MLE, transformation and joint-density problems under timed conditions.",
  "Memorise z, t and F test templates and the confidence-interval decision rule.",
  "Practise three derivations: Poisson MLE, order statistics and the Delta Method.",
  "Redo the support and Jacobian problems until the limits feel automatic.",
  "Use the visual lab for CLT, power and confidence-interval coverage for 20 minutes.",
  "Skip new theory if time is critically short; consolidate what already appears in the problem bank.",
  "End with the formula sheet and mistake log, not fresh material."
];

export function SurvivalSheetPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Final review sheet"
        title="Decision rules for the last stretch"
        description="A compact guide for distribution choice, inference templates, integration limits, MLEs, the Delta Method and the final 12 hours."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {decisions.map((section) => (
          <article key={section.title} className="paper-card human-card p-5">
            <h2 className="font-sans text-2xl font-semibold text-ink">{section.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-graphite">
              {section.lines.map((line) => <li key={line}>{line}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <section className="paper-card human-card mt-5 p-5">
        <h2 className="font-sans text-3xl font-semibold text-ink">Last 12 hours before an exam</h2>
        <ol className="mt-4 grid list-decimal gap-3 pl-5 text-sm leading-6 text-graphite md:grid-cols-2">
          {lastTwelve.map((item) => <li key={item}>{item}</li>)}
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/exam-mode" className="focus-ring rounded-full border border-white/10 bg-lavender px-4 py-2 text-sm text-white shadow-soft">Run a mock exam</Link>
          <Link to="/problem-bank" className="focus-ring rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-ink">Redo problem bank</Link>
        </div>
      </section>
    </div>
  );
}
