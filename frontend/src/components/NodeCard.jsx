import { Trash2 } from "lucide-react";
import HelpIcon from "./HelpIcon";
import MiniKBCard from "./MiniKBCard";
import { findItemByTitle } from "../data/knowledgeUtils";

export default function NodeCard({
  definition,
  values,
  onChange,
  onRemove,
  onOpenKBDetail,
}) {
  const Icon = definition.icon;

  const isFieldVisible = (field) => {
    if (!field.showWhen) return true;
    return values[field.showWhen.field] === field.showWhen.value;
  };

  const handleFieldChange = (fieldId, value) => {
    onChange(definition.id, fieldId, value);
  };

  return (
    <div className="w-80 shrink-0 bg-node-bg border border-node-border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Card header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-node-border">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-cream-dark">
            <Icon size={15} className="text-ink-light" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink leading-tight">
              {definition.label}
            </h3>
            <p className="text-xs text-ink-muted">{definition.description}</p>
          </div>
        </div>
        <button
          onClick={() => onRemove(definition.id)}
          className="p-1.5 rounded hover:bg-red-50 text-ink-muted hover:text-danger transition-colors"
          title="Remove node"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Card fields */}
      <div className="px-4 py-3 space-y-3">
        {definition.fields.map((field) => {
          if (!isFieldVisible(field)) return null;

          const currentValue = values[field.id] ?? field.default;
          const kbItem =
            field.type === "select" ? findItemByTitle(currentValue) : null;

          return (
            <div key={field.id}>
              {/* Label row */}
              <div className="flex items-center mb-1">
                <label className="text-xs font-medium text-ink-light">
                  {field.label}
                </label>
                <HelpIcon tooltip={field.tooltip} />
              </div>

              {/* Control */}
              {field.type === "select" && (
                <>
                  <select
                    value={currentValue}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    className="w-full text-xs border border-node-border rounded px-2.5 py-1.5 bg-cream/50 text-ink focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent transition-colors appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238a8a7a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 8px center",
                      paddingRight: "28px",
                    }}
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {kbItem && (
                    <MiniKBCard item={kbItem} onClick={onOpenKBDetail} />
                  )}
                </>
              )}

              {field.type === "toggle" && (
                <button
                  type="button"
                  role="switch"
                  aria-checked={currentValue}
                  onClick={() =>
                    handleFieldChange(field.id, !currentValue)
                  }
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    currentValue ? "bg-accent" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                      currentValue
                        ? "translate-x-[18px]"
                        : "translate-x-[3px]"
                    }`}
                  />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
