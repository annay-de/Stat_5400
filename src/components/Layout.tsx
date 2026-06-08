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
import { NavLink, useLocation } from "react-router-dom";

const navSections = [
  {
    label: "Study",
    items: [
      { to: "/", label: "Dashboard", icon: Home },
      { to: "/learning-map", label: "Learning Map", icon: Map },
      { to: "/modules", label: "Modules", icon: BookOpen },
      { to: "/visual-lab", label: "Visual Lab", icon: FlaskConical },
    ],
  },
  {
    label: "Practice",
    items: [
      { to: "/problem-bank", label: "Problem Bank", icon: ClipboardList },
      { to: "/archetypes", label: "Archetypes", icon: Workflow },
      { to: "/exam-mode", label: "Exam Mode", icon: Timer },
      { to: "/solver", label: "Solver", icon: Calculator },
    ],
  },
  {
    label: "Reference",
    items: [
      { to: "/formula-sheet", label: "Formulae", icon: Sigma },
      { to: "/survival-sheet", label: "Survival Sheet", icon: Brain },
    ],
  },
];

const mobileNavItems = navSections.flatMap((section) => section.items);

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[270px_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-screen border-r border-white/70 bg-surface/80 px-4 py-5 shadow-soft backdrop-blur-xl lg:block">
        <NavLink to="/" className="focus-ring flex items-center gap-3 rounded px-2 py-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-md border border-white/30 bg-accent-hero text-white shadow-colour">
            <Sigma size={22} />
          </div>
          <div>
            <div className="font-sans text-xl font-semibold leading-tight">Stats Lab</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-graphite">Mastery cockpit</div>
          </div>
        </NavLink>

        <div className="mt-7 space-y-6">
          {navSections.map((section) => (
            <nav key={section.label}>
              <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">
                {section.label}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <DesktopNavItem key={item.to} item={item} pathname={location.pathname} />
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div className="absolute bottom-5 left-4 right-4 rounded-md border border-teal/20 bg-quiet-band p-3 text-xs leading-5 text-graphite shadow-soft">
          <div className="font-semibold text-forest">One-week path</div>
          Start with the dashboard, then move from modules to problem bank to exam mode.
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 border-b border-white/70 bg-surface/90 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between gap-4 px-4 py-3">
          <NavLink to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/30 bg-accent-hero text-white shadow-colour">
              <Sigma size={22} />
            </div>
            <div>
              <div className="font-sans text-lg font-semibold leading-tight">Stats Lab</div>
              <div className="text-xs uppercase tracking-[0.18em] text-graphite">Statistics Mastery</div>
            </div>
          </NavLink>
        </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-white/70 px-3 py-2">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `focus-ring flex shrink-0 items-center gap-2 rounded px-3 py-2 text-sm ${
                    isActive ? "bg-accent-hero text-white shadow-colour" : "bg-white/70 text-graphite hover:bg-white"
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

        <main className="mx-auto max-w-[1280px] px-4 py-6 md:px-6 md:py-8 xl:px-8">{children}</main>
      </div>
    </div>
  );
}

function DesktopNavItem({
  item,
  pathname,
}: {
  item: { to: string; label: string; icon: React.ComponentType<{ size?: number }> };
  pathname: string;
}) {
  const Icon = item.icon;
  const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);

  return (
    <NavLink
      to={item.to}
      className={`focus-ring flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
        active
          ? "bg-accent-hero text-white shadow-colour"
          : "text-graphite hover:bg-ocean/10 hover:text-ink"
      }`}
    >
      <Icon size={17} />
      <span>{item.label}</span>
    </NavLink>
  );
}
