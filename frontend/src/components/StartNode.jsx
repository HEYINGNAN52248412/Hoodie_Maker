import { Factory } from "lucide-react";

export default function StartNode() {
  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-center gap-2.5 px-5 py-3 bg-ink text-cream rounded-lg shadow-md">
        <Factory size={18} />
        <span className="text-sm font-semibold tracking-wide">
          HOODIE ORDER
        </span>
      </div>
    </div>
  );
}
