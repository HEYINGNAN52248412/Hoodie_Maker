import { Plus, Factory, FileText } from "lucide-react";

export default function Dashboard({ projects, onCreateProject, onSelectProject }) {
  const hasProjects = projects.length > 0;

  return (
    <main className="flex-1 overflow-y-auto bg-zinc-50">
      {/* Hero — centered */}
      <div className={`flex flex-col items-center justify-center text-center px-8 animate-fade-in-slide ${hasProjects ? "pt-24 pb-14" : "min-h-screen -mt-16"}`}>
        <Factory
          size={44}
          strokeWidth={1.5}
          className="text-ink-muted/40 mb-5"
        />
        <h1 className="text-5xl font-extrabold text-ink tracking-tight leading-tight">
          Auto Factory
        </h1>
        <p className="text-base text-ink-muted mt-3 max-w-md leading-relaxed tracking-wide">
          Manufacturing documentation &amp; tech pack management
        </p>
        <button
          onClick={onCreateProject}
          className="inline-flex items-center gap-2.5 px-6 py-3 mt-8 bg-ink text-cream text-sm font-semibold rounded-xl shadow-md hover:bg-ink-light hover:shadow-lg transition-all"
        >
          <Plus size={16} />
          Create New Project
        </button>
      </div>

      {/* Project grid */}
      {hasProjects && (
        <div className="max-w-4xl mx-auto px-8 pb-16 animate-fade-in-slide">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ink-muted mb-5">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className="text-left bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-lg hover:border-zinc-300 hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-cream text-sm font-semibold shrink-0">
                    {project.name.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-sm font-semibold text-ink truncate group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-ink-muted">
                  <span>
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span>{project.installedIds.length} nodes</span>
                  {project.techPackHistory.length > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <FileText size={11} />
                      {project.techPackHistory.length}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
