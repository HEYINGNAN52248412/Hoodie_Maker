import { X, Download, Loader2, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toJpeg } from "html-to-image";
import { jsPDF } from "jspdf";

const CAPTURE_OPTS = { quality: 0.8, pixelRatio: 1.5, backgroundColor: "#ffffff" };
const PDF_MARGIN = 12; // mm

/** Load an image data URL and return the HTMLImageElement */
function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/** Selectors for atomic block-level elements that should never be sliced */
const BLOCK_SELECTOR = "h1, h2, h3, h4, h5, h6, p, li, tr, table, img, hr, blockquote, pre, .force-break";

/** Safety buffer (element-px) added below each element's bottom to protect
 *  letter descenders and line-height overshoot from being clipped. */
const DESCENDER_BUFFER = 5;

/**
 * Deep-query every atomic block element inside `root`, measure its position
 * via getBoundingClientRect (works regardless of nesting), then return the
 * midpoint of each gap between consecutive elements — offset by a small
 * descender buffer so 'g', 'p', 'y' tails are never clipped.
 */
function collectBreakPoints(root) {
  const rootRect = root.getBoundingClientRect();
  const els = root.querySelectorAll(BLOCK_SELECTOR);

  // Measure every element's top/bottom relative to root
  const boxes = [];
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.height <= 0) continue;
    boxes.push({
      top: r.top - rootRect.top,
      bottom: r.bottom - rootRect.top,
    });
  }
  boxes.sort((a, b) => a.top - b.top);

  // Deduplicate overlapping boxes (nested elements like li > p)
  const merged = [];
  for (const box of boxes) {
    const prev = merged[merged.length - 1];
    if (prev && box.top < prev.bottom) {
      // Overlapping or nested — extend the previous box
      prev.bottom = Math.max(prev.bottom, box.bottom);
    } else {
      merged.push({ ...box });
    }
  }

  // Build break points at gap midpoints + descender buffer
  const points = [];
  for (let i = 0; i < merged.length - 1; i++) {
    const gapStart = merged[i].bottom + DESCENDER_BUFFER;
    const gapEnd = merged[i + 1].top;
    // Only use this gap if the buffer still leaves us inside the gap
    if (gapStart < gapEnd) {
      points.push(Math.round((gapStart + gapEnd) / 2));
    } else {
      // Gap too small — cut right after the element + buffer
      points.push(Math.round(merged[i].bottom + DESCENDER_BUFFER));
    }
  }
  // Final fallback: last element's bottom + buffer
  if (merged.length > 0) {
    points.push(Math.round(merged[merged.length - 1].bottom + DESCENDER_BUFFER));
  }

  return points;
}

/**
 * Build a PDF from `element`.
 *
 * Strategy — "whole image + safe crop":
 *  1. Read the DOM to find safe break-point Y positions (gaps between children).
 *  2. Capture the ENTIRE element as one JPEG — preserves all CSS context perfectly.
 *  3. Draw the full JPEG onto an off-screen canvas, then for each page crop a
 *     horizontal strip whose bottom aligns with a safe break point.
 *  4. Add each cropped strip as a separate JPEG page in jsPDF.
 *
 * Result: pixel-perfect formatting, no text/table slicing, ~1 MB file size.
 */
async function buildPdf(element) {
  // --- 1. Measure safe break points BEFORE capture ---
  const breakPoints = collectBreakPoints(element);
  const elementW = element.offsetWidth;
  const elementH = element.scrollHeight;

  // --- 2. Capture the whole element as one JPEG ---
  const dataUrl = await toJpeg(element, CAPTURE_OPTS);
  const fullImg = await loadImage(dataUrl);
  const imgW = fullImg.naturalWidth;
  const imgH = fullImg.naturalHeight;

  // --- 3. Coordinate mapping ---
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageW = pdf.internal.pageSize.getWidth() - PDF_MARGIN * 2;
  const pageH = pdf.internal.pageSize.getHeight() - PDF_MARGIN * 2;

  const pxToMm = pageW / elementW;       // element-px  → PDF mm
  const pxToImg = imgW / elementW;        // element-px  → image-px  (≈ pixelRatio)
  const pageHPx = pageH / pxToMm;         // page height in element-px

  // --- 4. Determine safe page-break Y positions (in element-px) ---
  const sliceStarts = [0];
  let cursor = 0;

  while (cursor + pageHPx < elementH) {
    const maxY = cursor + pageHPx;
    // Find the LAST gap-midpoint that fits within this page
    let bestBreak = -1;
    for (const bp of breakPoints) {
      if (bp > cursor && bp <= maxY) bestBreak = bp;
    }
    const next = bestBreak > cursor ? bestBreak : Math.round(maxY); // fallback: hard cut
    sliceStarts.push(next);
    cursor = next;
  }

  // --- 5. Convert all slice boundaries to integer image-px ONCE ---
  //     Sequential conversion guarantees: imgSlices[i+1].start === imgSlices[i].end
  //     No overlap, no gaps, no independent rounding drift.
  const imgSlices = [];
  for (let i = 0; i < sliceStarts.length; i++) {
    const endPx = i < sliceStarts.length - 1 ? sliceStarts[i + 1] : elementH;
    const srcY = Math.floor(sliceStarts[i] * pxToImg);
    const srcEnd = Math.floor(endPx * pxToImg);
    imgSlices.push({ srcY, srcH: srcEnd - srcY, elH: endPx - sliceStarts[i] });
  }

  // --- 6. Blit full image onto a source canvas (one-time cost) ---
  const srcCanvas = document.createElement("canvas");
  srcCanvas.width = imgW;
  srcCanvas.height = imgH;
  srcCanvas.getContext("2d").drawImage(fullImg, 0, 0);

  // --- 7. Crop each slice and add to PDF ---
  for (let i = 0; i < imgSlices.length; i++) {
    if (i > 0) pdf.addPage();

    const { srcY, srcH, elH } = imgSlices[i];
    if (srcH <= 0) continue;

    // Crop this horizontal strip — all values are integers, no sub-pixel bleed
    const strip = document.createElement("canvas");
    strip.width = imgW;
    strip.height = srcH;
    strip.getContext("2d").drawImage(
      srcCanvas,
      0, srcY, imgW, srcH,   // source rect (integer px)
      0, 0, imgW, srcH,       // dest rect   (integer px)
    );

    const stripUrl = strip.toDataURL("image/jpeg", 0.8);
    const stripHMm = elH * pxToMm;

    pdf.addImage(stripUrl, "JPEG", PDF_MARGIN, PDF_MARGIN, pageW, stripHMm);
  }

  return pdf;
}

export default function TechPackModal({ markdown, generatedAt, onClose, onPdfBlob, pdfUploadStatus }) {
  const contentRef = useRef(null);
  const hasUploadedRef = useRef(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Auto-generate PDF blob and send to parent for cloud upload — fires ONCE per modal open
  useEffect(() => {
    if (!onPdfBlob || hasUploadedRef.current) return;

    const timer = setTimeout(async () => {
      if (hasUploadedRef.current) return;
      hasUploadedRef.current = true;

      try {
        const element = contentRef.current;
        if (!element) return;

        const pdf = await buildPdf(element);
        const blob = pdf.output("blob");
        onPdfBlob(blob);
      } catch (err) {
        console.error("Auto PDF blob generation failed:", err);
        setPdfError("Auto-upload failed — you can still download manually.");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [onPdfBlob]);

  const handleDownloadPdf = async () => {
    const element = contentRef.current;
    if (!element) return;

    setIsGeneratingPdf(true);
    setPdfError(null);
    try {
      const pdf = await buildPdf(element);
      const timestamp = new Date().toISOString().slice(0, 10);
      pdf.save(`Tech_Pack_Draft_${timestamp}.pdf`);
    } catch (err) {
      console.error("PDF download failed:", err);
      setPdfError("PDF generation failed. Try again or copy the text manually.");
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
          <div className="flex items-center gap-3">
            <p className="text-xs text-ink-muted">
              Auto Factory — Generated{" "}
              {new Date(generatedAt || Date.now()).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            {pdfUploadStatus === "uploading" && (
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
                <Loader2 size={12} className="animate-spin" />
                Uploading PDF…
              </span>
            )}
            {pdfUploadStatus === "done" && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700">
                <CheckCircle size={12} />
                PDF saved
              </span>
            )}
            {pdfUploadStatus === "error" && (
              <span className="inline-flex items-center gap-1.5 text-xs text-danger">
                <AlertTriangle size={12} />
                Upload failed
              </span>
            )}
            {pdfError && (
              <span className="inline-flex items-center gap-1.5 text-xs text-danger">
                <AlertTriangle size={12} />
                {pdfError}
              </span>
            )}
          </div>
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
