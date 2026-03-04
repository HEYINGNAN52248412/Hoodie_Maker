import { useState } from "react";
import { Copy } from "lucide-react";

import { ITEMS, CATEGORIES } from "../data/knowledgeItems";
import ImageWithFallback from "./ImageWithFallback";
import KBDetailModal from "./KBDetailModal";

/* ── Component ───────────────────────────────────── */

export default function KnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    activeCategory === "All"
      ? ITEMS
      : ITEMS.filter((item) => item.category === activeCategory);

  const handleCopy = (e, item) => {
    e.stopPropagation();
    const specs = `${item.title}\n${item.tags.join(" · ")}\n${item.shortDesc}`;
    navigator.clipboard.writeText(specs);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <main className="flex-1 min-h-screen bg-cream overflow-y-auto">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-ink tracking-tight">
            Knowledge Base
          </h1>
          <p className="mt-2 text-ink-muted text-base">
            Standardized materials, hardware, and silhouettes for your tech
            packs.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:bg-zinc-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              {/* Image */}
              <div className="h-48 bg-zinc-100 overflow-hidden">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 relative">
                <h3 className="text-sm font-bold text-ink leading-snug">
                  {item.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-1 rounded-md bg-zinc-100 text-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="mt-2.5 text-sm text-zinc-500 leading-relaxed line-clamp-2">
                  {item.shortDesc}
                </p>

                {/* Copy button */}
                <button
                  onClick={(e) => handleCopy(e, item)}
                  title="Copy Specs"
                  className={`absolute bottom-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                    copiedId === item.id
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-zinc-100 text-zinc-400 opacity-0 group-hover:opacity-100 hover:bg-zinc-200 hover:text-zinc-600"
                  }`}
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <KBDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </main>
  );
}
