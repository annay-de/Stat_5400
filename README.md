# Statistics Mastery Lab

A local visual learning and exam-preparation application for probability, random variables, distributions, joint densities, transformations, sampling, estimation, confidence intervals, hypothesis testing and power.

The app is designed as an independent statistics mastery site: serious, clean, mathematical, and useful for fast revision.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally:

```text
http://localhost:5173
```

For a production check:

```bash
npm run build
npm run preview
```

## Main routes

- `/` - dashboard and seven-day emergency study plan
- `/learning-map` - learning dependency map
- `/modules` - learning module index
- `/modules/:topic` - full topic module
- `/problem-bank` - searchable and filterable problem bank
- `/problem/:id` - complete problem and solution
- `/archetypes` - question-recognition engine
- `/visual-lab` - interactive statistical playgrounds
- `/formula-sheet` - formula and method sheet
- `/exam-mode` - timed drills and mock finals
- `/solver` - guided offline solver workbench
- `/survival-sheet` - final exam survival sheet and last-12-hours plan

## What is inside

- Seven-day intensive study plan
- Visual dependency map
- Topic modules with intuition, definitions, formulae, derivations, examples, traps and quizzes
- Question archetype engine
- Searchable problem bank with worked solutions
- Interactive visual lab for dice, cards, Bayes, Monty Hall, distributions, CDF/PDF, joint supports, transformations, convolution, order statistics, CLT, estimators, MLE, confidence intervals, testing, power and Delta Method
- Formula and method sheet
- Timed exam mode with hints, method scoring and mistake logging
- Guided solver workbench that runs without an API key

## Technical organisation

```text
src/
  components/         reusable interface and mathematics components
  data/
    archetypes.ts     question archetypes
    courseTopics.ts   topic modules and dependency map
    formulaSheet.ts   formula and method cards
    problemBank.ts    problems and worked solutions
    studyPlan.ts      seven-day emergency plan
  lib/
    solvers.ts        guided calculator outputs
    statistics.ts     probability, distribution and inference utilities
  pages/              route-level application pages
```

## Statistical implementation notes

- Mathematical notation is rendered with KaTeX.
- Interactive charts use Recharts.
- Normal CDF and inverse CDF use standard numerical approximations.
- The app includes table values for key t and chi-square examples and uses documented approximations for other values.
- F critical-value decisions in worked problems use conventional table approximations. For formal assessment work, verify against the table supplied by your instructor.
- The solver is deliberately structured and works without an LLM or API key.
- Solved problem status is stored locally in the browser.

## Hosting

The app is ready for Vercel, Netlify or Cloudflare Pages.

Use:

```text
Build command: npm run build
Output directory: dist
```

The repository includes:

- `vercel.json` for Vercel single-page-app rewrites
- `public/_redirects` for Netlify and Cloudflare Pages rewrites
