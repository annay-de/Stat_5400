# ECO 5400 Statistics Exam Mastery Lab

A local, course-specific visual learning and exam-preparation application for:

- ECO 5400: Statistics for Economics
- Ashoka University
- Monsoon 2025
- Instructor: Avantika Prabhakar

The application is built from the uploaded course outline, Problem Sets 1-4, Discussion Sheets 1, 2, 4 and 6, and the Sample Final Questions.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

For a production check:

```bash
npm run build
npm run preview
```

## Main routes

- `/` - dashboard and seven-day emergency study plan
- `/course-map` - dependency map
- `/modules` - learning module index
- `/modules/:topic` - full topic module
- `/problem-bank` - searchable and filterable problem bank
- `/problem/:id` - complete course problem and solution
- `/archetypes` - question-recognition engine
- `/visual-lab` - 19 interactive statistical playgrounds
- `/formula-sheet` - formula and method sheet
- `/exam-mode` - timed drills and mock finals
- `/solver` - guided offline solver workbench
- `/survival-sheet` - final exam survival sheet and last-12-hours plan

## Course material coverage

The problem bank includes all questions identified in:

- `Problem Set 1.pdf`
- `Problem Set 2.pdf`
- `Problem Set 3.pdf`
- `Problem Set 4.pdf`
- `ECO5400-M25-DS1 (1).pdf`
- `ECO5400-M25-DS2.pdf`
- `ECO5400-M25-DS4.pdf`
- `ECO5400-M25-DS6.pdf`
- `ECO 5400 - Monsoon 2025 - Sample Final Questions.pdf`

The course outline and Problem Set 4 did not expose readable text through normal PDF extraction. They were rendered and visually inspected so that their course description and questions were still included.

## Technical organisation

```text
src/
  components/         reusable interface and mathematics components
  data/
    archetypes.ts     18 question archetypes
    courseTopics.ts   course modules and dependency map
    formulaSheet.ts   formula and method cards
    problemBank.ts    course problems and worked solutions
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
- The app includes table values for course-critical t and chi-square examples and uses documented approximations for other values.
- F critical-value decisions in worked problems use conventional table approximations. For formal work, verify against the course table supplied in the examination.
- The solver is deliberately structured and works without an LLM or API key.
- Progress and solved problem status are stored locally in the browser.

## Study workflow

1. Follow the dashboard's seven-day sequence.
2. Learn a module and complete its linked visual playgrounds.
3. Solve the cited course problems without revealing the solution.
4. Use the archetype engine when you cannot identify a method.
5. Log mistakes in Exam Mode.
6. Use the Survival Sheet and Sample Final replication on Day 7.
