import EditableProjectName from "./EditableProjectName";

export default function ProjectHeader({ project, onRename }) {
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
        <div className="text-xs text-ink-muted tabular-nums">
          {project.installedIds.length} node
          {project.installedIds.length !== 1 && "s"}
        </div>
      </div>
    </header>
  );
}
