ECO 5400 Statistics Exam Mastery Lab plan

1. Inspect and encode the uploaded materials
   - Extract `Stats.zip` into `work/materials/Stats`.
   - Use text extraction for all text-readable PDFs.
   - Render and manually inspect image-based PDFs (`MA Statistics Course Outline - Monsoon 2025.pdf` and `Problem Set 4.pdf`) so their content is not ignored.
   - Build a course-specific problem bank from problem sets, discussion sheets and sample final questions.

2. Build the local app
   - Create a Vite + React + TypeScript app with Tailwind CSS.
   - Use KaTeX for mathematical notation and Recharts for interactive visualisations.
   - Add typed data modules for course topics, archetypes, formulae, problems and the 7-day plan.
   - Add statistical utilities for distributions, CDFs, critical values, confidence intervals, hypothesis tests, MLE helpers and simulations.

3. Implement required pages
   - Dashboard with 7-day emergency plan and course progress.
   - Course dependency map.
   - Learning module index and topic detail pages.
   - Problem bank and problem solution pages.
   - Question archetype engine.
   - Visual lab with interactive probability, distribution, sampling, estimation and testing playgrounds.
   - Formula and method sheet.
   - Exam mode.
   - Guided solver workbench.
   - Final Exam Survival Sheet.

4. Verify and ship
   - Run `npm install`, type-check/build, and start the local dev server.
   - Fix TypeScript, route and rendering errors.
   - Add a clear README.
   - Initialise git, commit the completed app, add the GitHub remote `annay-de/Stat_5400`, and push.
