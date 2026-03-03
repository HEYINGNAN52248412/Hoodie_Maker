import { ChevronDown } from "lucide-react";

export default function Connector() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="connector-line h-6" />
      <ChevronDown size={16} className="text-connector -mt-1" />
    </div>
  );
}
