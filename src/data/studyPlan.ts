import type { StudyDay } from "./types";

export const studyPlan: StudyDay[] = [
  {
    day: 1,
    title: "Probability, counting, conditional probability, Bayes",
    concepts: ["sample spaces", "ordered outcomes", "permutations and combinations", "conditional probability", "Bayes' theorem"],
    problems: ["DS1 P1-P3", "DS2 P1-P4", "PS1 P1-P3, P6"],
    visuals: ["Dice and counting visualiser", "Cards conditional probability", "Bayes tree", "Monty Hall"],
    formulae: ["P(A union B)", "P(A|B)", "law of total probability", "Bayes' theorem", "multinomial coefficient"],
    selfTest: "Explain why dice sums 9 and 10 are not equally likely, then solve the colour-blindness posterior twice."
  },
  {
    day: 2,
    title: "Random variables, PMF, PDF, CDF, expectation, variance",
    concepts: ["PMF/PDF/CDF", "expectation", "variance", "checking validity", "discrete CDFs"],
    problems: ["PS2 P1, P3, P5"],
    visuals: ["Distribution explorer", "PDF/CDF visualiser"],
    formulae: ["E[X]", "Var(X)", "E[g(X)]", "F'(x)=f(x) where continuous"],
    selfTest: "Derive the PMF of the absolute dice difference and sketch the CDF from P(X=n)=2^{-n}."
  },
  {
    day: 3,
    title: "Standard distributions",
    concepts: ["Bernoulli", "Binomial", "Multinomial", "Poisson", "Uniform", "Exponential", "Normal"],
    problems: ["PS1 P4-P5", "DS6 P2-P3", "Sample Final P1"],
    visuals: ["Distribution explorer", "LLN and CLT simulator"],
    formulae: ["binomial PMF", "Poisson PMF", "normal standardisation", "exponential density"],
    selfTest: "Choose between binomial, Poisson and normal for three short word problems without computing first."
  },
  {
    day: 4,
    title: "Joint distributions and conditional densities",
    concepts: ["joint PDFs", "support", "normalisation", "marginalisation", "conditional density", "independence"],
    problems: ["PS2 P2", "DS4 P1"],
    visuals: ["Joint PDF support visualiser", "Marginal and conditional density visualiser", "Independence visualiser"],
    formulae: ["marginal density", "conditional density", "independence via product", "covariance if useful"],
    selfTest: "Normalise one rectangular support and one triangular support, then explain why support dependence breaks independence."
  },
  {
    day: 5,
    title: "Transformations, convolution, order statistics, LLN, CLT",
    concepts: ["CDF method", "Jacobian method", "convolution", "order statistics", "LLN", "CLT"],
    problems: ["PS2 P4", "DS4 P2-P3", "DS6 P1, P4", "PS3 P4-P5"],
    visuals: ["Transformation and Jacobian visualiser", "Convolution visualiser", "Order statistics visualiser", "CLT simulator"],
    formulae: ["Jacobian density formula", "convolution", "kth order statistic density", "CLT"],
    selfTest: "Transform U=X+Y, V=X/(X+Y) and identify the new support without looking at notes."
  },
  {
    day: 6,
    title: "Estimation, bias, consistency, MLE, MoM, Delta Method",
    concepts: ["estimators", "bias", "consistency", "Method of Moments", "Maximum Likelihood", "Delta Method"],
    problems: ["PS3 P2-P4", "Sample Final P5, P7"],
    visuals: ["Estimator simulator", "Likelihood and MLE grapher", "Delta Method visualiser"],
    formulae: ["bias", "consistency", "likelihood", "log-likelihood", "Delta Method"],
    selfTest: "Write the Poisson likelihood from memory and derive lambda-hat before comparing it with MoM."
  },
  {
    day: 7,
    title: "Confidence intervals, hypothesis tests, F-tests, power, mock final",
    concepts: ["z intervals", "t intervals", "z tests", "t tests", "two-sample tests", "F-tests", "power"],
    problems: ["PS4 P1-P4", "Sample Final P2-P4, P6"],
    visuals: ["Confidence interval visualiser", "Hypothesis testing visualiser", "Power curve visualiser"],
    formulae: ["z/t intervals", "one-sample z test", "two-sample t", "F ratio", "power function"],
    selfTest: "Complete one 90-minute mock final, then rebuild a mistake log by archetype."
  }
];
