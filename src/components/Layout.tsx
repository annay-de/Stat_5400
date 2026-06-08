import {
  BookOpen,
  Brain,
  Calculator,
  ClipboardList,
  FlaskConical,
  Home,
  Map,
  Sigma,
  Timer,
  Workflow,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/course-map", label: "Course Map", icon: Map },
  { to: "/modules", label: "Modules", icon: BookOpen },
  { to: "/archetypes", label: "Archetypes", icon: Workflow },
  { to: "/visual-lab", label: "Visual Lab", icon: FlaskConical },
  { to: "/problem-bank", label: "Problem Bank", icon: ClipboardList },
  { to: "/formula-sheet", label: "Formulae", icon: Sigma },
  { to: "/exam-mode", label: "Exam Mode", icon: Timer },
  { to: "/solver", label: "Solver", icon: Calculator },
  { to: "/survival-sheet", label: "Survival", icon: Brain },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-ink/15 bg-ink text-paper">
              <Sigma size={22} />
            </div>
            <div>
              <div className="font-serif text-lg font-semibold leading-tight">ECO 5400</div>
              <div className="text-xs uppercase tracking-[0.18em] text-graphite">Statistics Exam Mastery Lab</div>
            </div>
          </NavLink>
          <nav className="hidden items-center gap-1 overflow-x-auto lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `focus-ring flex items-center gap-2 rounded px-3 py-2 text-sm transition ${
                      isActive
                        ? "bg-ink text-paper"
                        : "text-graphite hover:bg-white/70 hover:text-ink"
                    }`
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-ink/10 px-3 py-2 lg:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `focus-ring flex shrink-0 items-center gap-2 rounded px-3 py-2 text-sm ${
                    isActive ? "bg-ink text-paper" : "bg-white/60 text-graphite"
                  }`
                }
              >
                <Icon size={15} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 md:py-8">{children}</main>
    </div>
  );
}
