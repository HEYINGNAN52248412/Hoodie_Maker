import { Home, BookOpen, Plus, AlertCircle } from "lucide-react";

export default function LeftNav({
  projects,
  activeView,
  onNavigateHome,
  onNavigateKnowledgeBase,
  onSelectProject,
  onCreateProject,
  issueCount,
  onOpenIssues,
}) {
  return (
    <aside className="w-20 shrink-0 h-screen sticky top-0 bg-ink flex flex-col items-center pt-5 pb-4 gap-1.5">
      {/* Home */}
      <button
        onClick={onNavigateHome}
        title="Dashboard"
        className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${
          activeView === "home"
            ? "bg-white/15 text-cream shadow-sm shadow-white/5"
            : "text-cream/50 hover:text-cream hover:bg-white/10"
        }`}
      >
        <Home size={22} />
      </button>

      {/* Knowledge Base */}
      <button
        onClick={onNavigateKnowledgeBase}
        title="Knowledge Base"
        className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all ${
          activeView === "knowledge-base"
            ? "bg-white/15 text-cream shadow-sm shadow-white/5"
            : "text-cream/50 hover:text-cream hover:bg-white/10"
        }`}
      >
        <BookOpen size={22} />
      </button>

      {/* Divider */}
      <div className="w-8 border-t border-white/10 my-2" />

      {/* Create project */}
      <button
        onClick={onCreateProject}
        title="New Project"
        className="w-11 h-11 flex items-center justify-center rounded-xl text-cream/40 hover:text-cream hover:bg-white/10 transition-all border border-dashed border-white/15 hover:border-white/30"
      >
        <Plus size={22} />
      </button>

      {/* Project list */}
      <div className="flex-1 overflow-y-auto dark-scrollbar flex flex-col items-center gap-2 mt-2 w-full px-3">
        {projects.map((project) => {
          const isActive = activeView === project.id;
          const initial = project.name.charAt(0).toUpperCase();

          return (
            <button
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              title={project.name}
              className={`w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold tracking-tight transition-all ${
                isActive
                  ? "bg-stone-200 text-ink ring-2 ring-stone-400/50 ring-offset-2 ring-offset-ink"
                  : "bg-zinc-700 text-cream/60 hover:bg-zinc-600 hover:text-cream"
              }`}
            >
              {initial}
            </button>
          );
        })}
      </div>

      {/* Bottom issue tracker button */}
      <div className="mt-auto pt-2 border-t border-white/10 w-8" />
      <button
        onClick={onOpenIssues}
        title={issueCount > 0 ? `${issueCount} issue${issueCount !== 1 ? "s" : ""}` : "No issues"}
        className={`relative w-11 h-11 flex items-center justify-center rounded-xl transition-all ${
          issueCount > 0
            ? "bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-500/30"
            : "text-cream/40 hover:text-cream hover:bg-white/10"
        }`}
      >
        <AlertCircle size={20} />
        {issueCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-red-600 text-white text-[10px] font-bold rounded-full ring-2 ring-ink px-1">
            {issueCount > 99 ? "99+" : issueCount}
          </span>
        )}
      </button>
    </aside>
  );
}
