import { useEffect, useState } from "react";
import { X, Trash2, AlertCircle, ChevronDown, ChevronRight } from "lucide-react";

export default function IssueDrawer({ issues, onClearAll, onClose }) {
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-start"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Drawer panel */}
      <div
        className="relative w-full max-w-md bg-white border-r border-zinc-200 shadow-2xl flex flex-col animate-fade-in-slide ml-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
          <div className="flex items-center gap-2.5">
            <AlertCircle size={18} className="text-red-500" />
            <h2 className="text-sm font-bold text-ink">
              Issues{" "}
              <span className="text-ink-muted font-normal">
                ({issues.length})
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-1">
            {issues.length > 0 && (
              <button
                onClick={onClearAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={13} />
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-100 transition-colors text-ink-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Issue list */}
        <div className="flex-1 overflow-y-auto">
          {issues.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-ink-muted py-20">
              <AlertCircle size={32} className="opacity-20 mb-3" />
              <p className="text-sm">No issues recorded</p>
              <p className="text-xs mt-1 opacity-60">
                Errors will appear here automatically
              </p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100">
              {[...issues].reverse().map((issue) => {
                const isOpen = expandedId === issue.id;
                const date = new Date(issue.timestamp);
                const time = date.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });

                return (
                  <div key={issue.id} className="group">
                    <button
                      onClick={() =>
                        setExpandedId(isOpen ? null : issue.id)
                      }
                      className="w-full text-left px-5 py-4 hover:bg-zinc-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {isOpen ? (
                            <ChevronDown size={14} className="text-ink-muted" />
                          ) : (
                            <ChevronRight size={14} className="text-ink-muted" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                            <p className="text-sm font-medium text-ink truncate">
                              {issue.title}
                            </p>
                          </div>
                          <p className="text-xs text-ink-muted line-clamp-2">
                            {issue.detailedMessage}
                          </p>
                          <p className="text-xs text-ink-muted/60 mt-1.5">
                            {time}
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Expanded technical detail */}
                    {isOpen && (
                      <div className="px-5 pb-4 pl-12">
                        <div className="bg-zinc-900 text-zinc-300 rounded-lg p-4 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap break-all">
                          {issue.technicalStack}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
