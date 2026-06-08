import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "../components/PageHeader";
import {
  binomialPmf,
  chiSquarePdf,
  combinations,
  exponentialPdf,
  fPdf,
  inverseNormalCdf,
  normalCdf,
  normalPdf,
  poissonPmf,
  powerForMeanTest,
  range,
  round,
  studentTPdf,
  uniformPdf,
} from "../lib/statistics";

const playgrounds = [
  "Dice and counting visualiser",
  "Cards and conditional probability visualiser",
  "Bayes tree visualiser",
  "Monty Hall visualiser",
  "Distribution explorer",
  "PDF/CDF visualiser",
  "Joint PDF support visualiser",
  "Marginal and conditional density visualiser",
  "Independence visualiser",
  "Transformation and Jacobian visualiser",
  "Convolution visualiser",
  "Order statistics visualiser",
  "LLN and CLT simulator",
  "Estimator simulator",
  "Likelihood and MLE grapher",
  "Confidence interval visualiser",
  "Hypothesis testing visualiser",
  "Power curve visualiser",
  "Delta Method visualiser",
];

export function VisualLabPage() {
  const [active, setActive] = useState(playgrounds[0]);
  return (
    <div>
      <PageHeader
        eyebrow="Visual playgrounds"
        title="See the probability before symbol-pushing"
        description="These tools are built around the problem types that matter most: dice, cards, Bayes, joint supports, transformations, CLT, MLE, intervals, tests and power."
      />
      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <aside className="paper-card rounded p-3 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-auto">
          {playgrounds.map((item, index) => (
            <button
              key={item}
              className={`focus-ring mb-2 flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm ${
                active === item ? "bg-ink text-paper" : "bg-white/65 text-graphite hover:bg-white"
              }`}
              onClick={() => setActive(item)}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-current/20 text-xs">
                {index + 1}
              </span>
              {item}
            </button>
          ))}
        </aside>
        <section className="paper-card min-h-[620px] rounded p-5">
          <h2 className="font-serif text-3xl font-semibold text-ink">{active}</h2>
          <div className="mt-5">
            <Playground name={active} />
          </div>
        </section>
      </div>
    </div>
  );
}

function Playground({ name }: { name: string }) {
  if (name.startsWith("Dice")) return <DiceVisualiser />;
  if (name.startsWith("Cards")) return <CardsVisualiser />;
  if (name.startsWith("Bayes")) return <BayesVisualiser />;
  if (name.startsWith("Monty")) return <MontyHallVisualiser />;
  if (name.startsWith("Distribution")) return <DistributionExplorer />;
  if (name.startsWith("PDF")) return <PdfCdfVisualiser />;
  if (name.startsWith("Joint")) return <JointSupportVisualiser />;
  if (name.startsWith("Marginal")) return <MarginalVisualiser />;
  if (name.startsWith("Independence")) return <IndependenceVisualiser />;
  if (name.startsWith("Transformation")) return <TransformationVisualiser />;
  if (name.startsWith("Convolution")) return <ConvolutionVisualiser />;
  if (name.startsWith("Order")) return <OrderStatsVisualiser />;
  if (name.startsWith("LLN")) return <CltVisualiser />;
  if (name.startsWith("Estimator")) return <EstimatorVisualiser />;
  if (name.startsWith("Likelihood")) return <LikelihoodVisualiser />;
  if (name.startsWith("Confidence")) return <ConfidenceIntervalVisualiser />;
  if (name.startsWith("Hypothesis")) return <HypothesisVisualiser />;
  if (name.startsWith("Power")) return <PowerVisualiser />;
  return <DeltaVisualiser />;
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function NumberInput({ value, setValue, min, max, step = 1 }: { value: number; setValue: (value: number) => void; min: number; max: number; step?: number }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => setValue(Number(event.target.value))}
      className="w-full accent-forest"
    />
  );
}

function ChartBox({ children, height = 320 }: { children: React.ReactNode; height?: number }) {
  return <div style={{ height }} className="rounded border border-ink/10 bg-white/70 p-3">{children}</div>;
}

function DiceVisualiser() {
  const [dice, setDice] = useState(3);
  const [event, setEvent] = useState("sum10");
  const outcomes = useMemo(() => makeDiceOutcomes(dice), [dice]);
  const highlighted = outcomes.filter((roll) => diceEvent(roll, event));
  const data = outcomes.reduce<Record<string, number>>((acc, roll) => {
    const sum = roll.reduce((a, b) => a + b, 0);
    acc[sum] = (acc[sum] ?? 0) + 1;
    return acc;
  }, {});
  const chart = Object.entries(data).map(([sum, count]) => ({ sum, count, selected: event.startsWith("sum") && Number(event.replace("sum", "")) === Number(sum) }));
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <Control label="Dice count">
          <select className="w-full rounded border border-ink/15 bg-white px-3 py-2" value={dice} onChange={(e) => setDice(Number(e.target.value))}>
            <option value={2}>Two dice</option>
            <option value={3}>Three dice</option>
          </select>
        </Control>
        <Control label="Event">
          <select className="w-full rounded border border-ink/15 bg-white px-3 py-2" value={event} onChange={(e) => setEvent(e.target.value)}>
            <option value="sum9">sum = 9</option>
            <option value="sum10">sum = 10</option>
            <option value="atLeastOdd">at least one odd</option>
            <option value="allEven">all even</option>
          </select>
        </Control>
        <div className="rounded border border-ink/10 bg-white/70 p-3 text-sm text-graphite">
          Selected {highlighted.length} of {outcomes.length} ordered outcomes: probability {round(highlighted.length / outcomes.length, 5)}.
        </div>
      </div>
      <ChartBox>
        <ResponsiveContainer>
          <BarChart data={chart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sum" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count">
              {chart.map((row) => <Cell key={row.sum} fill={row.selected ? "#7f312f" : "#1f5a4a"} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>
      <div className="max-h-64 overflow-auto rounded border border-ink/10 bg-white/70 p-3">
        <div className="grid grid-cols-4 gap-2 text-xs sm:grid-cols-6 md:grid-cols-9">
          {outcomes.map((roll) => {
            const selected = diceEvent(roll, event);
            return <span key={roll.join("-")} className={`rounded px-2 py-1 text-center ${selected ? "bg-oxblood text-white" : "bg-paper text-graphite"}`}>{roll.join(",")}</span>;
          })}
        </div>
      </div>
      <p className="text-sm leading-6 text-graphite">The classic dice trap is visible here: the unordered pattern (3,3,3) is one ordered outcome, while (1,3,6) is six ordered outcomes.</p>
    </div>
  );
}

function makeDiceOutcomes(dice: number) {
  const values = [1, 2, 3, 4, 5, 6];
  if (dice === 2) return values.flatMap((a) => values.map((b) => [a, b]));
  return values.flatMap((a) => values.flatMap((b) => values.map((c) => [a, b, c])));
}

function diceEvent(roll: number[], event: string) {
  if (event.startsWith("sum")) return roll.reduce((a, b) => a + b, 0) === Number(event.replace("sum", ""));
  if (event === "atLeastOdd") return roll.some((value) => value % 2 === 1);
  return roll.every((value) => value % 2 === 0);
}

function CardsVisualiser() {
  const [known, setKnown] = useState("atLeastOne");
  const pAtLeastOne = 1 - combinations(48, 13) / combinations(52, 13);
  const pAtLeastTwo = 1 - (combinations(48, 13) + 4 * combinations(48, 12)) / combinations(52, 13);
  const result = known === "atLeastOne" ? pAtLeastTwo / pAtLeastOne : 1 - combinations(48, 12) / combinations(51, 12);
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div>
        <Control label="Known information">
          <select className="w-full rounded border border-ink/15 bg-white px-3 py-2" value={known} onChange={(event) => setKnown(event.target.value)}>
            <option value="atLeastOne">At least one ace is selected</option>
            <option value="aceHearts">Ace of hearts is selected</option>
          </select>
        </Control>
        <div className="mt-5 grid grid-cols-13 gap-1 rounded border border-ink/10 bg-white/70 p-3">
          {Array.from({ length: 52 }, (_, index) => {
            const isAce = index < 4;
            const fixed = known === "aceHearts" && index === 0;
            return <div key={index} className={`h-10 rounded border text-center text-xs leading-10 ${fixed ? "border-oxblood bg-oxblood text-white" : isAce ? "border-brass bg-brass/20 text-ink" : "border-ink/10 bg-paper text-graphite"}`}>{isAce ? "A" : ""}</div>;
          })}
        </div>
      </div>
      <div className="rounded border border-ink/10 bg-white/70 p-4">
        <h3 className="font-serif text-xl font-semibold text-ink">Conditional sample space</h3>
        <p className="mt-3 text-sm leading-6 text-graphite">Probability of at least two aces under this condition: <strong className="text-ink">{round(result, 5)}</strong>.</p>
        <p className="mt-3 text-sm leading-6 text-graphite">{known === "atLeastOne" ? "Knowing some ace is present leaves many possible first-ace identities." : "Knowing the ace of hearts is present fixes one success and turns the question into catching at least one of the remaining three aces."}</p>
      </div>
    </div>
  );
}

function BayesVisualiser() {
  const [prior, setPrior] = useState(0.08);
  const [sensitivity, setSensitivity] = useState(0.9);
  const [falsePositive, setFalsePositive] = useState(0.15);
  const numerator = prior * sensitivity;
  const denominator = numerator + (1 - prior) * falsePositive;
  const posterior = numerator / denominator;
  const tree = [
    { name: "target and evidence", value: numerator },
    { name: "target no evidence", value: prior * (1 - sensitivity) },
    { name: "not target and evidence", value: (1 - prior) * falsePositive },
    { name: "not target no evidence", value: (1 - prior) * (1 - falsePositive) },
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <div className="space-y-4">
        <Slider label={`Prior P(H) = ${round(prior, 3)}`} value={prior} setValue={setPrior} min={0.01} max={0.99} step={0.01} />
        <Slider label={`P(E|H) = ${round(sensitivity, 3)}`} value={sensitivity} setValue={setSensitivity} min={0.01} max={0.99} step={0.01} />
        <Slider label={`P(E|not H) = ${round(falsePositive, 3)}`} value={falsePositive} setValue={setFalsePositive} min={0.01} max={0.99} step={0.01} />
        <div className="rounded border border-ink/10 bg-white/70 p-4 text-sm leading-6 text-graphite">
          Posterior P(H|E) = <strong className="text-ink">{round(posterior, 5)}</strong>
        </div>
      </div>
      <ChartBox>
        <ResponsiveContainer>
          <BarChart data={tree} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="value" fill="#1f5a4a" />
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>
    </div>
  );
}

function MontyHallVisualiser() {
  const [trials, setTrials] = useState(500);
  const result = useMemo(() => {
    let seed = 5400;
    let stay = 0;
    let switchWins = 0;
    for (let i = 0; i < trials; i += 1) {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      const prize = seed % 3;
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      const choice = seed % 3;
      if (choice === prize) stay += 1;
      else switchWins += 1;
    }
    return [
      { strategy: "Stay", wins: stay, rate: stay / trials },
      { strategy: "Switch", wins: switchWins, rate: switchWins / trials },
    ];
  }, [trials]);
  return (
    <div className="space-y-5">
      <Slider label={`Trials = ${trials}`} value={trials} setValue={setTrials} min={30} max={5000} step={10} />
      <ChartBox>
        <ResponsiveContainer>
          <BarChart data={result}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="strategy" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Bar dataKey="rate" fill="#7f312f" />
          </BarChart>
        </ResponsiveContainer>
      </ChartBox>
      <p className="text-sm leading-6 text-graphite">Switching wins exactly when the first choice was wrong. That event has probability 2/3, and the simulation approaches it.</p>
    </div>
  );
}

function DistributionExplorer() {
  const [dist, setDist] = useState("Normal");
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.4);
  const [lambda, setLambda] = useState(3);
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);
  const [df, setDf] = useState(5);
  const data = useMemo(() => distributionData(dist, { n, p, lambda, mu, sigma, df }), [dist, n, p, lambda, mu, sigma, df]);
  const summary = distributionSummary(dist, { n, p, lambda, mu, sigma, df });
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-4">
        <Control label="Distribution">
          <select className="w-full rounded border border-ink/15 bg-white px-3 py-2" value={dist} onChange={(event) => setDist(event.target.value)}>
            {["Bernoulli", "Binomial", "Poisson", "Uniform", "Exponential", "Normal", "Chi-square", "t", "F"].map((item) => <option key={item}>{item}</option>)}
          </select>
        </Control>
        <Slider label={`n/df = ${n}`} value={n} setValue={setN} min={1} max={60} step={1} />
        <Slider label={`p = ${round(p, 2)}`} value={p} setValue={setP} min={0.05} max={0.95} step={0.01} />
        <Slider label={`λ/μ/σ = ${lambda}`} value={lambda} setValue={setLambda} min={0.2} max={12} step={0.1} />
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <ChartBox>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="pdf" stroke="#1f5a4a" dot={false} />
              <Line type="monotone" dataKey="cdf" stroke="#7f312f" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
        <div className="rounded border border-ink/10 bg-white/70 p-4 text-sm leading-6 text-graphite">
          <h3 className="font-serif text-xl font-semibold text-ink">Summary</h3>
          <p className="mt-2">Mean: <strong>{summary.mean}</strong></p>
          <p>Variance: <strong>{summary.variance}</strong></p>
          <p>Typical 95% critical: <strong>{summary.critical}</strong></p>
          <p className="mt-2 text-xs">Green is PMF/PDF, red is CDF. For discrete distributions, the line connects probability spikes for readability.</p>
        </div>
      </div>
    </div>
  );
}

function distributionData(dist: string, params: { n: number; p: number; lambda: number; mu: number; sigma: number; df: number }) {
  if (dist === "Bernoulli") return [0, 1].map((x) => ({ x, pdf: x === 1 ? params.p : 1 - params.p, cdf: x === 0 ? 1 - params.p : 1 }));
  if (dist === "Binomial") return range(0, params.n, 1).map((x) => ({ x, pdf: binomialPmf(params.n, x, params.p), cdf: range(0, x, 1).reduce((s, k) => s + binomialPmf(params.n, k, params.p), 0) }));
  if (dist === "Poisson") return range(0, Math.max(12, Math.ceil(params.lambda * 4)), 1).map((x) => ({ x, pdf: poissonPmf(params.lambda, x), cdf: range(0, x, 1).reduce((s, k) => s + poissonPmf(params.lambda, k), 0) }));
  if (dist === "Uniform") return range(-0.5, 1.5, 0.05).map((x) => ({ x, pdf: uniformPdf(x), cdf: x < 0 ? 0 : x > 1 ? 1 : x }));
  if (dist === "Exponential") return range(0, 8, 0.1).map((x) => ({ x, pdf: exponentialPdf(x, params.lambda), cdf: 1 - Math.exp(-params.lambda * x) }));
  if (dist === "Chi-square") return range(0.05, Math.max(15, params.n * 3), 0.1).map((x) => ({ x, pdf: chiSquarePdf(x, params.n), cdf: 0 }));
  if (dist === "t") return range(-5, 5, 0.1).map((x) => ({ x, pdf: studentTPdf(x, params.n), cdf: 0 }));
  if (dist === "F") return range(0.05, 6, 0.05).map((x) => ({ x, pdf: fPdf(x, params.n, params.df), cdf: 0 }));
  return range(params.mu - 4 * params.sigma, params.mu + 4 * params.sigma, 0.1).map((x) => ({ x, pdf: normalPdf(x, params.mu, params.sigma), cdf: normalCdf(x, params.mu, params.sigma) }));
}

function distributionSummary(dist: string, params: { n: number; p: number; lambda: number; mu: number; sigma: number; df: number }) {
  if (dist === "Bernoulli") return { mean: round(params.p, 3), variance: round(params.p * (1 - params.p), 3), critical: "not used" };
  if (dist === "Binomial") return { mean: round(params.n * params.p, 3), variance: round(params.n * params.p * (1 - params.p), 3), critical: "use CDF" };
  if (dist === "Poisson") return { mean: round(params.lambda, 3), variance: round(params.lambda, 3), critical: "use CDF" };
  if (dist === "Exponential") return { mean: round(1 / params.lambda, 3), variance: round(1 / params.lambda ** 2, 3), critical: round(-Math.log(0.05) / params.lambda, 3) };
  if (dist === "Chi-square") return { mean: params.n, variance: 2 * params.n, critical: "table / approximation" };
  if (dist === "t") return { mean: params.n > 1 ? 0 : "undefined", variance: params.n > 2 ? round(params.n / (params.n - 2), 3) : "undefined", critical: "t table" };
  if (dist === "F") return { mean: params.df > 2 ? round(params.df / (params.df - 2), 3) : "undefined", variance: "df dependent", critical: "F table" };
  if (dist === "Uniform") return { mean: 0.5, variance: round(1 / 12, 3), critical: "quantile = p" };
  return { mean: params.mu, variance: params.sigma ** 2, critical: round(inverseNormalCdf(0.975), 3) };
}

function PdfCdfVisualiser() {
  const [x, setX] = useState(0);
  const data = range(-3, 3, 0.05).map((value) => ({ x: value, pdf: normalPdf(value), cdf: normalCdf(value), area: value <= x ? normalPdf(value) : 0 }));
  return (
    <div className="space-y-5">
      <Slider label={`x = ${round(x, 2)}; CDF area = ${round(normalCdf(x), 4)}; derivative/PDF = ${round(normalPdf(x), 4)}`} value={x} setValue={setX} min={-3} max={3} step={0.05} />
      <ChartBox>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Area dataKey="area" fill="#a47c39" stroke="#a47c39" />
            <Line type="monotone" dataKey="pdf" stroke="#1f5a4a" dot={false} />
            <Line type="monotone" dataKey="cdf" stroke="#7f312f" dot={false} />
            <ReferenceLine x={x} stroke="#25221d" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartBox>
    </div>
  );
}

function JointSupportVisualiser() {
  const [support, setSupport] = useState("square");
  const description = {
    square: "0 ≤ x ≤ 3, 0 ≤ y ≤ 3. Integrate x from 0 to 3 and y from 0 to 3.",
    triangle3: "0 ≤ x ≤ y ≤ 3. A natural order is y from 0 to 3, x from 0 to y.",
    triangle1: "0 < x < y < 1. A natural order is x from 0 to 1, y from x to 1.",
  }[support];
  return (
    <div className="grid gap-5 md:grid-cols-[260px_1fr]">
      <Control label="Support">
        <select className="w-full rounded border border-ink/15 bg-white px-3 py-2" value={support} onChange={(event) => setSupport(event.target.value)}>
          <option value="square">0 ≤ x ≤ 3, 0 ≤ y ≤ 3</option>
          <option value="triangle3">0 ≤ x ≤ y ≤ 3</option>
          <option value="triangle1">0 &lt; x &lt; y &lt; 1</option>
        </select>
      </Control>
      <div>
        <svg viewBox="0 0 420 320" className="h-80 w-full rounded border border-ink/10 bg-white/70">
          <line x1="50" y1="270" x2="370" y2="270" stroke="#25221d" />
          <line x1="50" y1="270" x2="50" y2="40" stroke="#25221d" />
          <text x="375" y="275" fontSize="14">x</text>
          <text x="38" y="35" fontSize="14">y</text>
          {support === "square" ? <rect x="50" y="50" width="250" height="220" fill="#1f5a4a33" stroke="#1f5a4a" /> : null}
          {support === "triangle3" ? <polygon points="50,270 300,270 300,50" fill="#7f312f33" stroke="#7f312f" /> : null}
          {support === "triangle1" ? <polygon points="50,270 300,50 300,270" fill="#a47c3933" stroke="#a47c39" /> : null}
          <line x1="50" y1="270" x2="300" y2="50" stroke="#25221d" strokeDasharray="4 4" />
          <text x="310" y="55" fontSize="13">y=x</text>
        </svg>
        <p className="mt-3 text-sm leading-6 text-graphite">{description}</p>
      </div>
    </div>
  );
}

function MarginalVisualiser() {
  const [x, setX] = useState(0.4);
  const fX = 12 * x ** 3 * (1 - x ** 2);
  const data = range(0, 1, 0.02).map((y) => ({ y, joint: y > x ? 24 * x ** 3 * y : 0, conditional: y > x ? (2 * y) / (1 - x ** 2) : 0 }));
  return (
    <div className="space-y-5">
      <Slider label={`Fix x = ${round(x, 2)}; fX(x) = ${round(fX, 4)}`} value={x} setValue={setX} min={0.05} max={0.95} step={0.01} />
      <ChartBox>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="y" />
            <YAxis />
            <Tooltip />
            <Line dataKey="joint" stroke="#1f5a4a" dot={false} />
            <Line dataKey="conditional" stroke="#7f312f" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>
      <p className="text-sm leading-6 text-graphite">Green is the unnormalised slice f(x,y). Red divides by fX(x), turning the slice into f(y|x) over y between x and 1.</p>
    </div>
  );
}

function IndependenceVisualiser() {
  const [shape, setShape] = useState("triangle");
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Control label="Support type">
        <select className="w-full rounded border border-ink/15 bg-white px-3 py-2" value={shape} onChange={(event) => setShape(event.target.value)}>
          <option value="rectangle">Product rectangle</option>
          <option value="triangle">Support depends on x</option>
        </select>
      </Control>
      <div className="rounded border border-ink/10 bg-white/70 p-4 text-sm leading-6 text-graphite">
        {shape === "rectangle" ? "A product support can be independent if the joint density factorises into an x-only part times a y-only part." : "A triangular support such as 0<x<y<1 cannot be reproduced by fX(x)fY(y), because possible y-values depend on x."}
      </div>
      <div className="md:col-span-2">
        <JointSupportMini triangle={shape === "triangle"} />
      </div>
    </div>
  );
}

function JointSupportMini({ triangle }: { triangle: boolean }) {
  return (
    <svg viewBox="0 0 420 220" className="h-56 w-full rounded border border-ink/10 bg-white/70">
      <line x1="50" y1="180" x2="360" y2="180" stroke="#25221d" />
      <line x1="50" y1="180" x2="50" y2="35" stroke="#25221d" />
      {triangle ? <polygon points="50,180 320,45 320,180" fill="#7f312f33" stroke="#7f312f" /> : <rect x="70" y="55" width="260" height="125" fill="#1f5a4a33" stroke="#1f5a4a" />}
    </svg>
  );
}

function TransformationVisualiser() {
  const [u, setU] = useState(2);
  const [v, setV] = useState(0.35);
  const x = u * v;
  const y = u * (1 - v);
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Slider label={`u = X+Y = ${round(u, 2)}`} value={u} setValue={setU} min={0.2} max={6} step={0.05} />
        <Slider label={`v = X/(X+Y) = ${round(v, 2)}`} value={v} setValue={setV} min={0.02} max={0.98} step={0.01} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded border border-ink/10 bg-white/70 p-4">Inverse: x=uv={round(x, 3)}, y=u(1-v)={round(y, 3)}</div>
        <div className="rounded border border-ink/10 bg-white/70 p-4">Jacobian |∂(x,y)/∂(u,v)| = u = {round(u, 3)}</div>
        <div className="rounded border border-ink/10 bg-white/70 p-4">Support: u&gt;0 and 0&lt;v&lt;1</div>
      </div>
      <svg viewBox="0 0 600 260" className="h-72 w-full rounded border border-ink/10 bg-white/70">
        <text x="90" y="25" fontSize="15">Old support (x,y)</text>
        <line x1="60" y1="220" x2="260" y2="220" stroke="#25221d" />
        <line x1="60" y1="220" x2="60" y2="40" stroke="#25221d" />
        <rect x="60" y="40" width="180" height="180" fill="#1f5a4a22" stroke="#1f5a4a" />
        <circle cx={60 + x * 28} cy={220 - y * 28} r="6" fill="#7f312f" />
        <text x="380" y="25" fontSize="15">New support (u,v)</text>
        <line x1="340" y1="220" x2="550" y2="220" stroke="#25221d" />
        <line x1="340" y1="220" x2="340" y2="40" stroke="#25221d" />
        <rect x="350" y="50" width="190" height="170" fill="#a47c3922" stroke="#a47c39" />
        <circle cx={350 + u * 28} cy={220 - v * 170} r="6" fill="#7f312f" />
      </svg>
    </div>
  );
}

function ConvolutionVisualiser() {
  const [z, setZ] = useState(2);
  const data = range(0, 6, 0.05).map((x) => ({ x, fx: exponentialPdf(x), shifted: exponentialPdf(z - x), product: x <= z ? exponentialPdf(x) * exponentialPdf(z - x) : 0 }));
  return (
    <div className="space-y-5">
      <Slider label={`Target sum z = ${round(z, 2)}; fZ(z)=z e^{-z} = ${round(z * Math.exp(-z), 4)}`} value={z} setValue={setZ} min={0.1} max={6} step={0.05} />
      <ChartBox>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line dataKey="fx" stroke="#1f5a4a" dot={false} />
            <Line dataKey="shifted" stroke="#7f312f" dot={false} />
            <Area dataKey="product" fill="#a47c39" stroke="#a47c39" />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>
    </div>
  );
}

function OrderStatsVisualiser() {
  const [n, setN] = useState(8);
  const [k, setK] = useState(2);
  const data = range(0.01, 0.99, 0.02).map((y) => ({ y, density: combinations(n, k - 1) * (n - k + 1) * y ** (k - 1) * (1 - y) ** (n - k) }));
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Slider label={`n = ${n}`} value={n} setValue={(value) => { setN(value); setK(Math.min(k, value)); }} min={2} max={30} step={1} />
        <Slider label={`k = ${k}`} value={k} setValue={setK} min={1} max={n} step={1} />
      </div>
      <ChartBox>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="y" />
            <YAxis />
            <Tooltip />
            <Line dataKey="density" stroke="#1f5a4a" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>
      <p className="text-sm leading-6 text-graphite">For Uniform(0,1), the kth order statistic density becomes n!/[(k-1)!(n-k)!] y^(k-1)(1-y)^(n-k).</p>
    </div>
  );
}

function CltVisualiser() {
  const [n, setN] = useState(20);
  const [dist, setDist] = useState("exponential");
  const data = useMemo(() => simulateMeans(n, dist), [n, dist]);
  const running = data.slice(0, 80).map((row, index, arr) => ({ index: index + 1, avg: round(arr.slice(0, index + 1).reduce((s, r) => s + r.mean, 0) / (index + 1), 4) }));
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Control label="Parent distribution">
          <select className="w-full rounded border border-ink/15 bg-white px-3 py-2" value={dist} onChange={(event) => setDist(event.target.value)}>
            <option value="exponential">Exponential(1)</option>
            <option value="uniform">Uniform(0,1)</option>
            <option value="bernoulli">Bernoulli(0.3)</option>
          </select>
        </Control>
        <Slider label={`Sample size n = ${n}`} value={n} setValue={setN} min={1} max={120} step={1} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ChartBox>
          <ResponsiveContainer>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mean" />
              <YAxis dataKey="jitter" hide />
              <Tooltip />
              <Scatter data={data} fill="#1f5a4a" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox>
          <ResponsiveContainer>
            <LineChart data={running}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              <Line dataKey="avg" stroke="#7f312f" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
    </div>
  );
}

function simulateMeans(n: number, dist: string) {
  let seed = 12345 + n;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  return Array.from({ length: 240 }, (_, i) => {
    let total = 0;
    for (let j = 0; j < n; j += 1) {
      const u = rand();
      total += dist === "exponential" ? -Math.log(1 - u) : dist === "bernoulli" ? (u < 0.3 ? 1 : 0) : u;
    }
    return { mean: total / n, jitter: (i % 30) / 30 };
  });
}

function EstimatorVisualiser() {
  const [n, setN] = useState(20);
  const data = range(5, n, 1).map((m) => ({ n: m, unbiased: 0, biasedConsistent: -1 / m, inconsistent: 0.2 }));
  return (
    <div className="space-y-5">
      <Slider label={`Maximum n shown = ${n}`} value={n} setValue={setN} min={5} max={120} step={1} />
      <ChartBox>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="n" />
            <YAxis />
            <Tooltip />
            <Line dataKey="unbiased" stroke="#1f5a4a" dot={false} />
            <Line dataKey="biasedConsistent" stroke="#a47c39" dot={false} />
            <Line dataKey="inconsistent" stroke="#7f312f" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>
      <p className="text-sm leading-6 text-graphite">Bias can vanish with n. A biased estimator can be consistent when both bias and variance disappear.</p>
    </div>
  );
}

function LikelihoodVisualiser() {
  const [dist, setDist] = useState("poisson");
  const [meanObs, setMeanObs] = useState(3);
  const data = range(0.2, 8, 0.05).map((theta) => ({ theta, logLikelihood: dist === "poisson" ? 10 * (meanObs * Math.log(theta) - theta) : 8 * (meanObs * Math.log(theta) + (1 - meanObs) * Math.log(1 - Math.min(theta, 0.99))) }));
  const mle = dist === "poisson" ? meanObs : meanObs;
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Control label="Model">
          <select className="w-full rounded border border-ink/15 bg-white px-3 py-2" value={dist} onChange={(event) => setDist(event.target.value)}>
            <option value="poisson">Poisson λ</option>
            <option value="bernoulli">Bernoulli p</option>
          </select>
        </Control>
        <Slider label={`${dist === "poisson" ? "sample mean" : "sample proportion"} = ${round(meanObs, 2)}`} value={meanObs} setValue={setMeanObs} min={dist === "poisson" ? 0.5 : 0.05} max={dist === "poisson" ? 7 : 0.95} step={0.05} />
      </div>
      <ChartBox>
        <ResponsiveContainer>
          <LineChart data={dist === "bernoulli" ? data.filter((d) => d.theta < 1) : data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="theta" />
            <YAxis />
            <Tooltip />
            <Line dataKey="logLikelihood" stroke="#1f5a4a" dot={false} />
            <ReferenceLine x={mle} stroke="#7f312f" />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>
    </div>
  );
}

function ConfidenceIntervalVisualiser() {
  const [n, setN] = useState(25);
  const [confidence, setConfidence] = useState(0.95);
  const z = inverseNormalCdf(0.5 + confidence / 2);
  const intervals = Array.from({ length: 60 }, (_, i) => {
    const sampleMean = seededNormal(i + n) / Math.sqrt(n);
    const margin = z / Math.sqrt(n);
    return { i, lower: sampleMean - margin, upper: sampleMean + margin, covers: sampleMean - margin <= 0 && sampleMean + margin >= 0 };
  });
  const coverage = intervals.filter((interval) => interval.covers).length / intervals.length;
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Slider label={`n = ${n}`} value={n} setValue={setN} min={5} max={100} step={1} />
        <Slider label={`confidence = ${round(confidence, 2)}`} value={confidence} setValue={setConfidence} min={0.8} max={0.99} step={0.01} />
      </div>
      <div className="rounded border border-ink/10 bg-white/70 p-4 text-sm">Simulated coverage in this batch: {round(coverage, 3)}</div>
      <ChartBox height={380}>
        <ResponsiveContainer>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="i" />
            <YAxis domain={[-1.2, 1.2]} />
            <Tooltip />
            <ReferenceLine y={0} stroke="#25221d" />
            <Scatter data={intervals.flatMap((d) => [{ i: d.i, y: d.lower, covers: d.covers }, { i: d.i, y: d.upper, covers: d.covers }])}>
              {intervals.flatMap((d) => [d, d]).map((d, index) => <Cell key={index} fill={d.covers ? "#1f5a4a" : "#7f312f"} />)}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </ChartBox>
    </div>
  );
}

function HypothesisVisualiser() {
  const [z, setZ] = useState(1.2);
  const [alpha, setAlpha] = useState(0.05);
  const critical = inverseNormalCdf(1 - alpha);
  const data = range(-4, 4, 0.05).map((x) => ({ x, density: normalPdf(x), rejection: x >= critical ? normalPdf(x) : 0 }));
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Slider label={`observed z = ${round(z, 2)}`} value={z} setValue={setZ} min={-4} max={4} step={0.05} />
        <Slider label={`alpha = ${round(alpha, 2)}`} value={alpha} setValue={setAlpha} min={0.01} max={0.2} step={0.01} />
      </div>
      <ChartBox>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Area dataKey="rejection" fill="#7f312f" stroke="#7f312f" />
            <Line dataKey="density" stroke="#1f5a4a" dot={false} />
            <ReferenceLine x={critical} stroke="#25221d" label="critical" />
            <ReferenceLine x={z} stroke="#a47c39" label="observed" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartBox>
      <p className="text-sm leading-6 text-graphite">{z > critical ? "Reject in this one-sided upper-tail display." : "Do not reject in this one-sided upper-tail display."}</p>
    </div>
  );
}

function PowerVisualiser() {
  const [n, setN] = useState(25);
  const [sigma, setSigma] = useState(3);
  const [alpha, setAlpha] = useState(0.05);
  const c = 10 + inverseNormalCdf(1 - alpha) * sigma / Math.sqrt(n);
  const data = range(8, 13, 0.05).map((mu) => ({ mu, power: powerForMeanTest(mu, c, sigma, n) }));
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <Slider label={`n = ${n}`} value={n} setValue={setN} min={5} max={100} step={1} />
        <Slider label={`sigma = ${sigma}`} value={sigma} setValue={setSigma} min={1} max={8} step={0.1} />
        <Slider label={`alpha = ${round(alpha, 2)}`} value={alpha} setValue={setAlpha} min={0.01} max={0.2} step={0.01} />
      </div>
      <div className="rounded border border-ink/10 bg-white/70 p-3 text-sm">Critical c for H0: μ=10 is {round(c, 4)}.</div>
      <ChartBox>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mu" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Line dataKey="power" stroke="#7f312f" dot={false} />
            <ReferenceLine x={10} stroke="#25221d" />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>
    </div>
  );
}

function DeltaVisualiser() {
  const [mu, setMu] = useState(9);
  const [sigma, setSigma] = useState(4);
  const [n, setN] = useState(50);
  const derivative = -1 / mu ** 2;
  const transformedSe = Math.abs(derivative) * sigma / Math.sqrt(n);
  const data = range(mu - 4, mu + 4, 0.1).filter((x) => x > 0).map((x) => ({ x, gx: 1 / x, tangent: 1 / mu + derivative * (x - mu) }));
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <Slider label={`mu = ${round(mu, 2)}`} value={mu} setValue={setMu} min={1} max={15} step={0.1} />
        <Slider label={`sigma = ${round(sigma, 2)}`} value={sigma} setValue={setSigma} min={0.5} max={8} step={0.1} />
        <Slider label={`n = ${n}`} value={n} setValue={setN} min={10} max={300} step={1} />
      </div>
      <div className="rounded border border-ink/10 bg-white/70 p-3 text-sm">For g(μ)=1/μ, g'(μ)={round(derivative, 5)} and approximate SE of g(Xbar) is {round(transformedSe, 5)}.</div>
      <ChartBox>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line dataKey="gx" stroke="#1f5a4a" dot={false} />
            <Line dataKey="tangent" stroke="#7f312f" dot={false} />
            <ReferenceLine x={mu} stroke="#25221d" />
          </LineChart>
        </ResponsiveContainer>
      </ChartBox>
    </div>
  );
}

function Slider({ label, value, setValue, min, max, step }: { label: string; value: number; setValue: (value: number) => void; min: number; max: number; step: number }) {
  return (
    <Control label={label}>
      <NumberInput value={value} setValue={setValue} min={min} max={max} step={step} />
    </Control>
  );
}

function seededNormal(seedValue: number) {
  const u1 = seededUniform(seedValue);
  const u2 = seededUniform(seedValue + 99);
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function seededUniform(seedValue: number) {
  const x = Math.sin(seedValue * 999) * 10000;
  return x - Math.floor(x);
}
