import { Link, useParams } from "react-router-dom";
import { MathBlock } from "../components/MathBlock";
import { PageHeader } from "../components/PageHeader";
import { courseModules } from "../data/courseTopics";
import { problemBank } from "../data/problemBank";

const sectionLabels = [
  "What problem is this topic trying to solve?",
  "Visual intuition",
  "Formal definition",
  "Core formulae",
  "Derivation",
  "Step-by-step method",
  "Fully solved worked example",
  "Similar generated example",
  "Common exam traps",
  "Quick quiz",
];

export function ModuleDetailPage() {
  const { topic } = useParams();
  const module = courseModules.find((item) => item.id === topic) ?? courseModules[0];
  const related = problemBank.filter((problem) => module.relatedProblems.includes(problem.id));

  return (
    <div>
      <PageHeader eyebrow="Learning module" title={module.title} description={module.question} />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="paper-card human-card p-6 md:p-8">
          {sectionLabels.map((label) => (
            <section key={label} className="border-b border-white/10 py-7 first:pt-0 last:border-b-0 last:pb-0">
              <h2 className="font-sans text-xl font-semibold text-ink md:text-2xl">{label}</h2>
              {label === sectionLabels[0] ? <p className="mt-3 leading-7 text-graphite">{module.question}</p> : null}
              {label === sectionLabels[1] ? <p className="mt-3 leading-7 text-graphite">{module.visualIntuition}</p> : null}
              {label === sectionLabels[2] ? <p className="mt-3 leading-7 text-graphite">{module.formalDefinition}</p> : null}
              {label === sectionLabels[3] ? (
                <div className="mt-5 grid gap-4">
                  {module.formulae.map((formula) => (
                    <MathBlock key={formula} formula={formula} note={formulaNote(formula)} />
                  ))}
                </div>
              ) : null}
              {label === sectionLabels[4] ? <List items={module.derivation} /> : null}
              {label === sectionLabels[5] ? <List items={module.method} ordered /> : null}
              {label === sectionLabels[6] ? <p className="mt-3 leading-7 text-graphite">{module.courseExample}</p> : null}
              {label === sectionLabels[7] ? <p className="mt-3 leading-7 text-graphite">{module.generatedExample}</p> : null}
              {label === sectionLabels[8] ? <List items={module.traps} /> : null}
              {label === sectionLabels[9] ? <List items={module.quiz} ordered /> : null}
            </section>
          ))}
        </div>
        <aside className="space-y-4">
          <div className="paper-card human-card p-5">
            <h2 className="font-sans text-xl font-semibold text-ink">Worked examples</h2>
            <div className="mt-4 space-y-3">
              {related.map((problem) => (
                <Link key={problem.id} to={`/problem/${problem.id}`} className="block rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm hover:border-ocean/35">
                  <div className="font-medium text-ink">{problem.title}</div>
                  <div className="mt-1 text-xs text-graphite">{problem.source} - {problem.number}</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function formulaNote(formula: string) {
  if (formula.includes("\\int") || formula.includes("f_{X,Y}") || formula.includes("f_X") || formula.includes("f_Y") || formula.includes("f(")) {
    return "Read the support first, then let the integral describe the area or slice you are measuring.";
  }
  if (formula.includes("\\bar") || formula.includes("CLT") || formula.includes("sqrt") || formula.includes("\\sigma")) {
    return "This is a sampling-distribution statement: the statistic varies across repeated samples.";
  }
  if (formula.includes("L(") || formula.includes("\\ell") || formula.includes("arg\\max") || formula.includes("MLE") || formula.includes("\\hat")) {
    return "Start from the likelihood, then let the data choose the parameter value that makes the sample most plausible.";
  }
  if (formula.includes("P(") || formula.includes("F_") || formula.includes("CDF") || formula.includes("\\Phi")) {
    return "Translate the words into an event first; the formula only calculates its probability after that translation.";
  }
  return "Use the formula only after naming the random variable, its assumptions, and the quantity you are solving for.";
}

function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`mt-4 space-y-2 text-sm leading-6 text-graphite ${ordered ? "list-decimal pl-5" : "list-disc pl-5"}`}>
      {items.map((item) => <li key={item}>{item}</li>)}
    </Tag>
  );
}
