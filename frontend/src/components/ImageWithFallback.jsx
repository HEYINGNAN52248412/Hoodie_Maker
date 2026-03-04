import { useState } from "react";
import { ImageOff } from "lucide-react";

export default function ImageWithFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`${className} bg-zinc-100 flex flex-col items-center justify-center gap-2`}
      >
        <ImageOff size={28} className="text-zinc-300" />
        <span className="text-[11px] font-medium text-zinc-400 tracking-wide uppercase max-w-[80%] text-center leading-tight">
          {alt || "Image"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
