export type Difficulty = "Core" | "Medium" | "Hard" | "Exam";

export interface LearningModule {
  id: string;
  title: string;
  shortTitle: string;
  question: string;
  visualIntuition: string;
  formalDefinition: string;
  formulae: string[];
  derivation: string[];
  method: string[];
  courseExample: string;
  generatedExample: string;
  traps: string[];
  quiz: string[];
  relatedProblems: string[];
}

export interface StudyDay {
  day: number;
  title: string;
  concepts: string[];
  problems: string[];
  visuals: string[];
  formulae: string[];
  selfTest: string;
}

export interface Problem {
  id: string;
  source: string;
  number: string;
  title: string;
  tags: string[];
  difficulty: Difficulty;
  examRelevance: "Routine" | "High" | "Final";
  archetype: string;
  statement: string;
  finalAnswer: string;
  solution: string[];
  visualExplanation?: string;
  commonTraps: string[];
  similarQuestion: string;
}

export interface Archetype {
  id: string;
  title: string;
  keywords: string[];
  assumptions: string[];
  formulae: string[];
  algorithm: string[];
  solvedProblemId: string;
  practice: string;
  mistakes: string[];
  template: string[];
}

export interface FormulaCard {
  section: string;
  title: string;
  formula: string;
  when: string;
  symbols: string;
  example: string;
  mistake: string;
}
