import { ChevronRight } from "lucide-react";

export default function Connector() {
  return (
    <div className="flex items-center px-1 shrink-0">
      <div className="connector-line-h w-8" />
      <ChevronRight size={16} className="text-connector -ml-1" />
    </div>
  );
}
