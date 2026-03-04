import ImageWithFallback from "./ImageWithFallback";

export default function MiniKBCard({ item, onClick }) {
  return (
    <div
      onClick={() => onClick(item)}
      className="mt-1.5 rounded-lg border border-zinc-200 overflow-hidden cursor-pointer hover:shadow-md transition-all group bg-white"
    >
      {/* Image */}
      <div className="h-28 bg-zinc-100 overflow-hidden">
        <ImageWithFallback
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="px-2.5 py-2">
        <p className="text-xs font-semibold text-ink leading-snug truncate">
          {item.title}
        </p>
        <div className="flex flex-wrap gap-1 mt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
