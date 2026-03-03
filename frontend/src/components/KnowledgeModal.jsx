import { X, BookOpen } from "lucide-react";
import { useEffect } from "react";

export default function KnowledgeModal({ title, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-node-bg border border-node-border rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-node-border">
          <div className="flex items-center gap-2.5">
            <BookOpen size={18} className="text-accent" />
            <h2 className="text-sm font-semibold text-ink">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-cream-dark transition-colors text-ink-muted hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream-dark mb-4">
            <BookOpen size={22} className="text-ink-muted" />
          </div>
          <p className="text-sm text-ink-light leading-relaxed">
            Detailed explanation coming soon.
          </p>
          <p className="text-xs text-ink-muted mt-2">
            This knowledge base entry will contain specifications, images, and supplier
            recommendations.
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-node-border bg-cream/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded bg-ink text-cream hover:bg-ink-light transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
