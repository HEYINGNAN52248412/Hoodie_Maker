import { useEffect } from "react";
import { X } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

export default function KBDetailModal({ item, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Hero image */}
        <div className="h-72 w-full bg-zinc-100 overflow-hidden">
          <ImageWithFallback
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            {item.title}
          </h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-100 text-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <hr className="border-zinc-200 mb-5" />

          <p className="text-zinc-600 leading-relaxed">
            {item.detailedDesc}
          </p>
        </div>
      </div>
    </div>
  );
}
