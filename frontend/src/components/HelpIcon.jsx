import { HelpCircle } from "lucide-react";
import { useState, useRef } from "react";

export default function HelpIcon({ tooltip }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setShowTooltip(true), 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setShowTooltip(false);
  };

  return (
    <span className="relative inline-flex items-center ml-1.5">
      <span
        className="text-ink-muted hover:text-accent transition-colors p-0.5 rounded-full hover:bg-cream-dark"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={`Help: ${tooltip}`}
      >
        <HelpCircle size={14} />
      </span>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-40 pointer-events-none">
          <div className="bg-zinc-900 text-zinc-100 text-xs rounded-lg px-3 py-2 w-64 leading-relaxed shadow-xl whitespace-normal">
            {tooltip}
          </div>
          <div className="w-2 h-2 bg-zinc-900 rotate-45 mx-auto -mt-1" />
        </div>
      )}
    </span>
  );
}
