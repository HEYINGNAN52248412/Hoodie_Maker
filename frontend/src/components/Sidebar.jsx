import { Plus, Check } from "lucide-react";
import nodeDefinitions from "../data/nodeDefinitions";

export default function Sidebar({ installedIds, onAddNode }) {
  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-node-bg border-l border-node-border flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-node-border">
        <h2 className="text-xs font-bold uppercase tracking-widest text-ink-muted">
          Node Palette
        </h2>
        <p className="text-xs text-ink-muted mt-0.5">
          Click to install on canvas
        </p>
      </div>

      {/* Node list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5">
        {nodeDefinitions.map((def) => {
          const installed = installedIds.includes(def.id);
          const Icon = def.icon;

          return (
            <button
              key={def.id}
              onClick={() => !installed && onAddNode(def.id)}
              disabled={installed}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-left transition-all group ${
                installed
                  ? "bg-cream-dark/60 opacity-60 cursor-default"
                  : "hover:bg-cream-dark cursor-pointer"
              }`}
            >
              <div
                className={`flex items-center justify-center w-7 h-7 rounded ${
                  installed ? "bg-green-100" : "bg-cream-dark group-hover:bg-cream"
                }`}
              >
                {installed ? (
                  <Check size={14} className="text-green-600" />
                ) : (
                  <Icon size={14} className="text-ink-light" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-ink truncate">
                  {def.label}
                </div>
                <div className="text-xs text-ink-muted truncate">
                  {def.description}
                </div>
              </div>
              {!installed && (
                <Plus
                  size={14}
                  className="text-ink-muted shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-node-border">
        <p className="text-xs text-ink-muted text-center">
          {installedIds.length} / {nodeDefinitions.length} installed
        </p>
      </div>
    </aside>
  );
}
