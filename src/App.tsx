import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ArchetypesPage } from "./pages/ArchetypesPage";
import { CourseMapPage } from "./pages/CourseMapPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ExamModePage } from "./pages/ExamModePage";
import { FormulaSheetPage } from "./pages/FormulaSheetPage";
import { ModuleDetailPage } from "./pages/ModuleDetailPage";
import { ModulesPage } from "./pages/ModulesPage";
import { ProblemBankPage } from "./pages/ProblemBankPage";
import { ProblemDetailPage } from "./pages/ProblemDetailPage";
import { SolverPage } from "./pages/SolverPage";
import { SurvivalSheetPage } from "./pages/SurvivalSheetPage";
import { VisualLabPage } from "./pages/VisualLabPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/learning-map" element={<CourseMapPage />} />
          <Route path="/course-map" element={<CourseMapPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/modules/:topic" element={<ModuleDetailPage />} />
          <Route path="/problem-bank" element={<ProblemBankPage />} />
          <Route path="/problem/:id" element={<ProblemDetailPage />} />
          <Route path="/archetypes" element={<ArchetypesPage />} />
          <Route path="/visual-lab" element={<VisualLabPage />} />
          <Route path="/formula-sheet" element={<FormulaSheetPage />} />
          <Route path="/exam-mode" element={<ExamModePage />} />
          <Route path="/solver" element={<SolverPage />} />
          <Route path="/survival-sheet" element={<SurvivalSheetPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
