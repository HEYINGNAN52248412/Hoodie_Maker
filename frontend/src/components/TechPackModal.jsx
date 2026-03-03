import { X, Download, Loader2, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function TechPackModal({ markdown, generatedAt, onClose }) {
  const contentRef = useRef(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleDownloadPdf = async () => {
    const element = contentRef.current;
    if (!element) return;

    setIsGeneratingPdf(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `Tech_Pack_Draft_${timestamp}.pdf`;

      await html2pdf()
        .set({
          margin: [12, 12, 12, 12],
          filename,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        })
        .from(element)
        .save();
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white border border-node-border rounded-xl shadow-2xl w-full max-w-4xl mx-4 max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-node-border bg-cream/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-ink flex items-center justify-center">
              <FileText size={16} className="text-cream" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink">
                Tech Pack — Final Draft
              </h2>
              <p className="text-xs text-ink-muted">
                AI-generated manufacturing specification
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-ink text-cream hover:bg-ink-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Generating PDF…
                </>
              ) : (
                <>
                  <Download size={14} />
                  Download Tech Pack (PDF)
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-cream-dark transition-colors text-ink-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Rendered markdown body */}
        <div className="flex-1 overflow-auto bg-white">
          <div
            ref={contentRef}
            className="prose prose-sm prose-neutral max-w-none px-10 py-8
              prose-headings:font-bold prose-headings:text-ink
              prose-h1:text-xl prose-h1:border-b prose-h1:border-node-border prose-h1:pb-3 prose-h1:mb-6
              prose-h2:text-base prose-h2:mt-8 prose-h2:mb-3
              prose-h3:text-sm prose-h3:mt-6
              prose-p:text-ink-light prose-p:leading-relaxed
              prose-table:text-xs prose-table:border-collapse
              prose-th:bg-cream prose-th:border prose-th:border-node-border prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-ink
              prose-td:border prose-td:border-node-border prose-td:px-3 prose-td:py-2 prose-td:text-ink-light
              prose-strong:text-ink prose-strong:font-semibold
              prose-li:text-ink-light
              prose-hr:border-node-border"
          >
            <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-node-border bg-cream/40 flex items-center justify-between shrink-0">
          <p className="text-xs text-ink-muted">
            Auto Factory — Generated{" "}
            {new Date(generatedAt || Date.now()).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-lg border border-node-border hover:bg-cream-dark transition-colors text-ink-light"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
