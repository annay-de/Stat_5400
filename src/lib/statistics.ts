export type Tail = "less" | "greater" | "two-sided";

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const round = (value: number, digits = 4) => {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export const factorial = (n: number): number => {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  let product = 1;
  for (let i = 2; i <= n; i += 1) product *= i;
  return product;
};

export const permutations = (n: number, r: number): number => {
  if (r > n || r < 0) return 0;
  let product = 1;
  for (let i = 0; i < r; i += 1) product *= n - i;
  return product;
};

export const combinations = (n: number, r: number): number => {
  if (r > n || r < 0) return 0;
  const k = Math.min(r, n - r);
  let numerator = 1;
  let denominator = 1;
  for (let i = 1; i <= k; i += 1) {
    numerator *= n - (k - i);
    denominator *= i;
  }
  return numerator / denominator;
};

export const mean = (values: number[]) =>
  values.reduce((sum, value) => sum + value, 0) / values.length;

export const variance = (values: number[], sample = true) => {
  const m = mean(values);
  const divisor = sample ? values.length - 1 : values.length;
  return values.reduce((sum, value) => sum + (value - m) ** 2, 0) / divisor;
};

export const erf = (x: number) => {
  const sign = x < 0 ? -1 : 1;
  const z = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * z);
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const value =
    1 -
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) *
      Math.exp(-z * z);
  return sign * value;
};

export const normalPdf = (x: number, mu = 0, sigma = 1) =>
  Math.exp(-0.5 * ((x - mu) / sigma) ** 2) / (sigma * Math.sqrt(2 * Math.PI));

export const normalCdf = (x: number, mu = 0, sigma = 1) =>
  0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2)));

// Acklam's rational approximation. Accurate enough for study and plotting.
export const inverseNormalCdf = (p: number) => {
  if (p <= 0 || p >= 1) {
    if (p === 0) return -Infinity;
    if (p === 1) return Infinity;
    return NaN;
  }
  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.38357751867269e2, -3.066479806614716e1, 2.506628277459239,
  ];
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1,
  ];
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1,
    -2.400758277161838, -2.549732539343734, 4.374664141464968,
    2.938163982698783,
  ];
  const d = [
    7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996,
    3.754408661907416,
  ];
  const plow = 0.02425;
  const phigh = 1 - plow;
  if (p < plow) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
  if (p > phigh) {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
  const q = p - 0.5;
  const r = q * q;
  return (
    (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) *
    q /
    (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  );
};

export const binomialPmf = (n: number, k: number, p: number) =>
  combinations(n, k) * p ** k * (1 - p) ** (n - k);

export const binomialCdf = (n: number, k: number, p: number) => {
  let total = 0;
  for (let i = 0; i <= Math.floor(k); i += 1) total += binomialPmf(n, i, p);
  return total;
};

export const poissonPmf = (lambda: number, k: number) =>
  Math.exp(-lambda) * lambda ** k / factorial(k);

export const poissonCdf = (lambda: number, k: number) => {
  let total = 0;
  for (let i = 0; i <= Math.floor(k); i += 1) total += poissonPmf(lambda, i);
  return total;
};

export const exponentialPdf = (x: number, lambda = 1) =>
  x < 0 ? 0 : lambda * Math.exp(-lambda * x);

export const exponentialCdf = (x: number, lambda = 1) =>
  x < 0 ? 0 : 1 - Math.exp(-lambda * x);

export const uniformPdf = (x: number, a = 0, b = 1) =>
  x >= a && x <= b ? 1 / (b - a) : 0;

export const uniformCdf = (x: number, a = 0, b = 1) =>
  x < a ? 0 : x > b ? 1 : (x - a) / (b - a);

export const gammaLanczos = (z: number): number => {
  const p = [
    676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012,
    9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gammaLanczos(1 - z));
  let x = 0.99999999999980993;
  const shifted = z - 1;
  for (let i = 0; i < p.length; i += 1) x += p[i] / (shifted + i + 1);
  const t = shifted + p.length - 0.5;
  return Math.sqrt(2 * Math.PI) * t ** (shifted + 0.5) * Math.exp(-t) * x;
};

export const chiSquarePdf = (x: number, k: number) =>
  x <= 0 ? 0 : x ** (k / 2 - 1) * Math.exp(-x / 2) / (2 ** (k / 2) * gammaLanczos(k / 2));

export const studentTPdf = (x: number, df: number) =>
  gammaLanczos((df + 1) / 2) /
  (Math.sqrt(df * Math.PI) * gammaLanczos(df / 2)) *
  (1 + x * x / df) ** (-(df + 1) / 2);

export const fPdf = (x: number, d1: number, d2: number) => {
  if (x <= 0) return 0;
  const numerator = Math.sqrt((d1 * x) ** d1 * d2 ** d2 / (d1 * x + d2) ** (d1 + d2));
  return numerator / (x * beta(d1 / 2, d2 / 2));
};

export const beta = (a: number, b: number) => gammaLanczos(a) * gammaLanczos(b) / gammaLanczos(a + b);

export const tCritical = (df: number, confidence: number) => {
  const table: Record<string, number> = {
    "24:0.90": 1.711,
    "24:0.95": 2.064,
    "14:0.95": 2.145,
    "51:0.90": 1.675,
    "61:0.95": 2.0,
  };
  const key = `${df}:${confidence.toFixed(2)}`;
  if (table[key]) return table[key];
  const z = inverseNormalCdf(0.5 + confidence / 2);
  return z + (z ** 3 + z) / (4 * df);
};

export const chiSquareCriticalUpper = (df: number, alpha: number) => {
  const exact: Record<string, number> = {
    "1:0.05": 3.841,
    "2:0.05": 5.991,
    "3:0.05": 7.815,
    "4:0.05": 9.488,
    "5:0.05": 11.07,
    "100:0.05": 124.342,
  };
  const key = `${df}:${alpha.toFixed(2)}`;
  if (exact[key]) return exact[key];
  const z = inverseNormalCdf(1 - alpha);
  return df * (1 - 2 / (9 * df) + z * Math.sqrt(2 / (9 * df))) ** 3;
};

export const zStatistic = (sampleMean: number, nullMean: number, sigma: number, n: number) =>
  (sampleMean - nullMean) / (sigma / Math.sqrt(n));

export const oneSampleTStatistic = (sampleMean: number, nullMean: number, sampleSd: number, n: number) =>
  (sampleMean - nullMean) / (sampleSd / Math.sqrt(n));

export const pooledVariance = (n1: number, s1: number, n2: number, s2: number) =>
  ((n1 - 1) * s1 ** 2 + (n2 - 1) * s2 ** 2) / (n1 + n2 - 2);

export const confidenceIntervalKnownSigma = (
  sampleMean: number,
  sigma: number,
  n: number,
  confidence: number
) => {
  const z = inverseNormalCdf(0.5 + confidence / 2);
  const margin = z * sigma / Math.sqrt(n);
  return { lower: sampleMean - margin, upper: sampleMean + margin, margin, critical: z };
};

export const confidenceIntervalUnknownSigma = (
  sampleMean: number,
  sampleSd: number,
  n: number,
  confidence: number
) => {
  const critical = tCritical(n - 1, confidence);
  const margin = critical * sampleSd / Math.sqrt(n);
  return { lower: sampleMean - margin, upper: sampleMean + margin, margin, critical };
};

export const pValueFromZ = (z: number, tail: Tail) => {
  if (tail === "greater") return 1 - normalCdf(z);
  if (tail === "less") return normalCdf(z);
  return 2 * Math.min(normalCdf(z), 1 - normalCdf(z));
};

export const powerForMeanTest = (mu: number, c: number, sigma: number, n: number) =>
  1 - normalCdf((c - mu) / (sigma / Math.sqrt(n)));

export const range = (start: number, end: number, step: number) => {
  const output: number[] = [];
  for (let value = start; value <= end + step / 2; value += step) output.push(round(value, 8));
  return output;
};
