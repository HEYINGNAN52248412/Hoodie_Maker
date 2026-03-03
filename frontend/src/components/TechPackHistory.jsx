import { FileText, Clock, Download } from "lucide-react";

export default function TechPackHistory({ history, onView }) {
  return (
    <aside className="w-72 shrink-0 h-screen sticky top-0 bg-white border-r border-zinc-200 flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-zinc-100">
        <h2 className="text-xs font-bold uppercase tracking-widest text-ink-muted flex items-center gap-1.5">
          <Clock size={12} />
          Tech Pack History
        </h2>
        <p className="text-xs text-ink-muted/60 mt-0.5">
          {history.length} version{history.length !== 1 && "s"} generated
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-ink-muted px-6 py-20">
            <FileText size={28} className="opacity-20 mb-3" />
            <p className="text-xs text-center">No tech packs generated yet</p>
            <p className="text-xs text-center opacity-50 mt-1">
              Configure nodes and hit Generate
            </p>
          </div>
        ) : (
          <div className="py-2">
            {[...history].reverse().map((entry, i) => {
              const versionNum = history.length - i;
              const date = new Date(entry.generatedAt);
              const formatted = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              const time = date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={entry.id}
                  className="group px-3 py-0.5"
                >
                  <div className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-zinc-50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText size={14} className="text-ink-muted" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-ink leading-tight">
                        Draft v{versionNum}
                      </p>
                      <p className="text-xs text-ink-muted mt-0.5">
                        {formatted} · {time}
                      </p>
                    </div>
                    <button
                      onClick={() => onView(entry)}
                      className="shrink-0 opacity-0 group-hover:opacity-100 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md bg-ink text-cream hover:bg-ink-light transition-all"
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
