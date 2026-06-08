import { archetypes } from "../data/archetypes";
import { courseModules } from "../data/courseTopics";
import { formulaSheet } from "../data/formulaSheet";
import { problemBank } from "../data/problemBank";
import { formulaWhy, referencePrinciples } from "../data/referenceGuides";
import type { Archetype, FormulaCard, Problem } from "../data/types";

export interface AssistantAnswer {
  archetype: Archetype;
  moduleTitle: string;
  summary: string;
  method: string[];
  formulae: FormulaCard[];
  relatedProblems: Problem[];
  sources: typeof referencePrinciples;
}

const fallbackArchetype = archetypes.find((item) => item.id.includes("hypothesis")) ?? archetypes[0];

export function answerStatsQuestion(question: string): AssistantAnswer {
  const text = question.toLowerCase();
  const preferredArchetypeId = detectArchetypeIntent(text);
  const scoredArchetypes = scoreItems(archetypes, (item) => [
    item.title,
    ...item.keywords,
    ...item.assumptions,
    ...item.algorithm,
  ], text).map((row) => ({
    ...row,
    score: row.score + (preferredArchetypeId && row.item.id === preferredArchetypeId ? 1000 : 0),
  })).sort((a, b) => b.score - a.score);

  const archetype =
    scoredArchetypes[0]?.item ??
    scoreItems(archetypes, (item) => [
      item.title,
      ...item.keywords,
      ...item.assumptions,
      ...item.algorithm,
    ], text)[0]?.item ?? fallbackArchetype;

  const module =
    scoreItems(courseModules, (item) => [
      item.title,
      item.shortTitle,
      item.question,
      item.visualIntuition,
      ...item.formulae,
      ...item.method,
    ], `${text} ${archetype.title.toLowerCase()}`)[0]?.item ?? courseModules[0];

  const preferredFormulaTitle = detectFormulaIntent(text);
  const formulae = scoreItems(formulaSheet, (item) => [
    item.section,
    item.title,
    item.when,
    item.symbols,
    item.example,
    item.mistake,
  ], `${text} ${archetype.title.toLowerCase()} ${module.title.toLowerCase()}`)
    .map((row) => ({
      ...row,
      score: row.score + (preferredFormulaTitle && row.item.title === preferredFormulaTitle ? 1000 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((row) => row.item);

  const relatedProblems = scoreItems(problemBank, (item) => [
    item.title,
    item.statement,
    item.archetype,
    item.source,
    ...item.tags,
  ], `${text} ${archetype.title.toLowerCase()} ${module.title.toLowerCase()}`)
    .slice(0, 4)
    .map((row) => row.item);

  return {
    archetype,
    moduleTitle: module.title,
    summary: buildSummary(archetype, module.title, formulae),
    method: buildMethod(archetype, formulae),
    formulae,
    relatedProblems,
    sources: referencePrinciples,
  };
}

function detectArchetypeIntent(text: string) {
  if (/\bh0\b|\bha\b|null hypothesis|alternative hypothesis|p-?value|significance|reject|test\b/.test(text)) return "hypothesis-tests";
  if (/confidence interval|\bci\b|interval estimate/.test(text)) return "confidence-intervals";
  if (/two[- ]sample|treatment|placebo|pooled/.test(text)) return "two-sample";
  if (/variance|variability|manufacturer|f[- ]test/.test(text)) return "f-tests";
  if (/power|reject when|size alpha/.test(text)) return "power";
  if (/bayes|posterior|given that|conditional/.test(text)) return "bayes";
  if (/jacobian|one-to-one|u=x\+y|transformation/.test(text)) return "jacobian";
  if (/likelihood|mle|method of moments|mom/.test(text)) return "mle-mom";
  if (/delta|g\(mu\)|1\/mu/.test(text)) return "delta";
  return null;
}

function detectFormulaIntent(text: string) {
  if (/\bh0\b|\bha\b|null hypothesis|p-?value|significance|reject|test\b/.test(text) && /known sigma|sigma is known|population sigma|population sd/.test(text)) return "z Test";
  if (/\bh0\b|\bha\b|null hypothesis|p-?value|significance|reject|test\b/.test(text)) return "z Test";
  if (/confidence interval|\bci\b/.test(text) && /unknown sigma|sigma unknown|sample standard deviation|\bs\b/.test(text)) return "Unknown Sigma t Interval";
  if (/confidence interval|\bci\b/.test(text)) return "Known Sigma z Interval";
  if (/bayes|posterior/.test(text)) return "Bayes' Theorem";
  if (/binomial|exactly|at least one/.test(text)) return "Binomial";
  if (/poisson|rare/.test(text)) return "Poisson";
  if (/jacobian|transformation/.test(text)) return "Jacobian Method";
  if (/delta|1\/mu/.test(text)) return "Delta Method";
  return null;
}

function scoreItems<T>(items: T[], textParts: (item: T) => string[], query: string) {
  const tokens = tokenise(query);
  return items
    .map((item) => {
      const haystack = tokenise(textParts(item).join(" "));
      const score = tokens.reduce((sum, token) => sum + (haystack.includes(token) ? token.length : 0), 0);
      return { item, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score);
}

function tokenise(text: string) {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9+\-*/^ ]/g, " ")
        .split(/\s+/)
        .filter((token) => token.length > 2)
    )
  );
}

function buildSummary(archetype: Archetype, moduleTitle: string, formulae: FormulaCard[]) {
  const firstFormula = formulae[0];
  const why = firstFormula ? formulaWhy[firstFormula.title] : undefined;
  return [
    `This looks closest to: ${archetype.title}.`,
    `The relevant learning module is: ${moduleTitle}.`,
    why ? `The first formula is not a plug-in step: ${why}` : "Start by naming the random variable, the target quantity and the assumptions before calculating.",
  ].join(" ");
}

function buildMethod(archetype: Archetype, formulae: FormulaCard[]) {
  const steps = [
    "Translate the wording into variables: what is random, what is observed, and what is being asked?",
    ...archetype.algorithm.slice(0, 4),
  ];
  if (formulae[0]) steps.push(`Use ${formulae[0].title} only after checking: ${formulae[0].when}`);
  steps.push("End with a sentence in context; do not leave the answer as only a number or symbol.");
  return steps;
}
