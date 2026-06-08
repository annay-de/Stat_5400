import {
  binomialCdf,
  binomialPmf,
  confidenceIntervalKnownSigma,
  confidenceIntervalUnknownSigma,
  inverseNormalCdf,
  normalCdf,
  poissonCdf,
  poissonPmf,
  pooledVariance,
  powerForMeanTest,
  pValueFromZ,
  round,
  zStatistic,
} from "./statistics";

export type SolverKind =
  | "bayes"
  | "binomial"
  | "poisson"
  | "normal"
  | "ci-known"
  | "ci-unknown"
  | "z-test"
  | "two-sample-t"
  | "f-test"
  | "delta"
  | "power";

export const solverLabels: Record<SolverKind, string> = {
  bayes: "Bayes posterior",
  binomial: "Binomial probability",
  poisson: "Poisson probability",
  normal: "Normal probability",
  "ci-known": "Confidence interval, known sigma",
  "ci-unknown": "Confidence interval, unknown sigma",
  "z-test": "One-sample z test",
  "two-sample-t": "Two-sample equal-variance t test",
  "f-test": "F test for variances",
  delta: "Delta Method skeleton",
  power: "Power for reject when sample mean exceeds c",
};

export type SolverInputs = Record<string, number | string>;

export const solve = (kind: SolverKind, values: SolverInputs) => {
  const n = Number(values.n ?? 0);
  const alpha = Number(values.alpha ?? 0.05);
  if (kind === "bayes") {
    const prior = Number(values.prior);
    const sensitivity = Number(values.sensitivity);
    const falsePositive = Number(values.falsePositive);
    const numerator = prior * sensitivity;
    const denominator = numerator + (1 - prior) * falsePositive;
    return [
      "Let A be the target state and B be the observed evidence.",
      `Bayes' theorem gives P(A|B)=P(B|A)P(A)/P(B).`,
      `Numerator = ${round(numerator)}; denominator = ${round(denominator)}.`,
      `Posterior probability = ${round(numerator / denominator, 5)}.`,
    ];
  }
  if (kind === "binomial") {
    const k = Number(values.k);
    const p = Number(values.p);
    return [
      "Use X ~ Binomial(n,p) because trials are independent with the same success probability.",
      `P(X=${k}) = C(${n},${k})(${p})^${k}(1-${p})^${n - k} = ${round(binomialPmf(n, k, p), 6)}.`,
      `P(X <= ${k}) = ${round(binomialCdf(n, k, p), 6)}; P(X >= ${k}) = ${round(1 - binomialCdf(n, k - 1, p), 6)}.`,
    ];
  }
  if (kind === "poisson") {
    const lambda = Number(values.lambda);
    const k = Number(values.k);
    return [
      "Use X ~ Poisson(lambda), usually for rare independent counts over a fixed exposure.",
      `P(X=${k}) = exp(-${lambda}) ${lambda}^${k}/${k}! = ${round(poissonPmf(lambda, k), 6)}.`,
      `P(X <= ${k}) = ${round(poissonCdf(lambda, k), 6)}.`,
    ];
  }
  if (kind === "normal") {
    const x = Number(values.x);
    const mu = Number(values.mu);
    const sigma = Number(values.sigma);
    const z = (x - mu) / sigma;
    return [
      "Standardise first, then read probability on the standard normal scale.",
      `z = (${x} - ${mu})/${sigma} = ${round(z, 4)}.`,
      `P(X <= ${x}) = Phi(${round(z, 4)}) = ${round(normalCdf(z), 6)}.`,
      `P(X > ${x}) = ${round(1 - normalCdf(z), 6)}.`,
    ];
  }
  if (kind === "ci-known") {
    const result = confidenceIntervalKnownSigma(
      Number(values.mean),
      Number(values.sigma),
      n,
      Number(values.confidence ?? 0.95)
    );
    return [
      "Use a z interval because the population variance is known.",
      `Critical value = ${round(result.critical, 4)}; margin = ${round(result.margin, 4)}.`,
      `CI = [${round(result.lower, 4)}, ${round(result.upper, 4)}].`,
    ];
  }
  if (kind === "ci-unknown") {
    const result = confidenceIntervalUnknownSigma(
      Number(values.mean),
      Number(values.sampleSd),
      n,
      Number(values.confidence ?? 0.95)
    );
    return [
      "Use a t interval because sigma is unknown and must be estimated by s.",
      `Degrees of freedom = ${n - 1}; critical value = ${round(result.critical, 4)}.`,
      `CI = [${round(result.lower, 4)}, ${round(result.upper, 4)}].`,
    ];
  }
  if (kind === "z-test") {
    const z = zStatistic(Number(values.mean), Number(values.nullMean), Number(values.sigma), n);
    const tail = String(values.tail ?? "greater") as "less" | "greater" | "two-sided";
    const critical =
      tail === "two-sided" ? inverseNormalCdf(1 - alpha / 2) : inverseNormalCdf(1 - alpha);
    return [
      `H0: mu = ${values.nullMean}. HA: ${tail === "greater" ? "mu > mu0" : tail === "less" ? "mu < mu0" : "mu != mu0"}.`,
      `z = ${round(z, 4)} and p-value = ${round(pValueFromZ(z, tail), 6)}.`,
      `Critical value approach uses ${round(critical, 4)} at alpha = ${alpha}.`,
      Math.abs(z) > critical || (tail === "greater" && z > critical) || (tail === "less" && z < -critical)
        ? "Reject H0 in words: the sample is statistically inconsistent with the null at this level."
        : "Do not reject H0: the sample evidence is not strong enough at this level.",
    ];
  }
  if (kind === "two-sample-t") {
    const n1 = Number(values.n1);
    const n2 = Number(values.n2);
    const s1 = Number(values.s1);
    const s2 = Number(values.s2);
    const sp2 = pooledVariance(n1, s1, n2, s2);
    const t =
      (Number(values.mean1) - Number(values.mean2)) /
      Math.sqrt(sp2 * (1 / n1 + 1 / n2));
    return [
      "Assume independent normal samples with equal variances.",
      `Pooled variance = ${round(sp2, 4)}; df = ${n1 + n2 - 2}.`,
      `t = ${round(t, 4)}. Compare |t| with the two-sided critical value.`,
    ];
  }
  if (kind === "f-test") {
    const f = Number(values.s1) ** 2 / Number(values.s2) ** 2;
    return [
      "Place the variance claimed to be larger in the numerator for a one-sided upper-tail F test.",
      `F = s1^2/s2^2 = ${round(f, 4)} with df1 = ${values.df1}, df2 = ${values.df2}.`,
      "Reject only if this exceeds the upper-tail F critical value for the stated alpha.",
    ];
  }
  if (kind === "delta") {
    return [
      "Start with sqrt(n)(Xbar - mu) -> N(0, sigma^2).",
      "For theta = g(mu), Delta Method says sqrt(n)(g(Xbar)-g(mu)) -> N(0, [g'(mu)]^2 sigma^2).",
      "For g(mu)=1/mu, g'(mu)=-1/mu^2, so the asymptotic variance is sigma^2/mu^4.",
    ];
  }
  if (kind === "power") {
    const c = Number(values.c);
    const mu = Number(values.mu);
    const sigma = Number(values.sigma);
    return [
      "Under true mean mu, the sample mean is normal with mean mu and standard error sigma/sqrt(n).",
      `Power pi(mu)=P_mu(Xbar > c)=1-Phi((c-mu)/(sigma/sqrt(n))).`,
      `For these inputs, power = ${round(powerForMeanTest(mu, c, sigma, n), 6)}.`,
    ];
  }
  return ["Select a solver to generate an exam-ready skeleton."];
};
