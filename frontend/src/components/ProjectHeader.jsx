import { Loader2, Check, AlertTriangle } from "lucide-react";
import EditableProjectName from "./EditableProjectName";

export default function ProjectHeader({ project, onRename, saveStatus }) {
  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <header className="sticky top-0 z-10 bg-cream/80 backdrop-blur border-b border-node-border">
      <div className="px-6 py-3 flex items-center justify-between">
        <div>
          <EditableProjectName name={project.name} onRename={onRename} />
          <p className="text-xs text-ink-muted">Created {formattedDate}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-ink-muted tabular-nums">
          {saveStatus === "saving" && (
            <span className="inline-flex items-center gap-1 text-amber-600">
              <Loader2 size={12} className="animate-spin" /> Saving…
            </span>
          )}
          {saveStatus === "saved" && (
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <Check size={12} /> Saved
            </span>
          )}
          {saveStatus === "error" && (
            <span className="inline-flex items-center gap-1 text-red-600">
              <AlertTriangle size={12} /> Save failed
            </span>
          )}
          <span>
            {project.installedIds.length} node
            {project.installedIds.length !== 1 && "s"}
          </span>
        </div>
      </div>
    </header>
  );
}
