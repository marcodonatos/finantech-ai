
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  positive?: boolean;
}

export default function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  positive = true,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <Icon size={21} />
        </div>
      </div>

      <h3 className="mt-4 text-2xl font-bold text-slate-900">
        {value}
      </h3>

      <div className="mt-2 flex items-center gap-2 text-xs">
        {positive ? (
          <TrendingUp size={15} className="text-emerald-600" />
        ) : (
          <TrendingDown size={15} className="text-red-500" />
        )}

        <span className="text-slate-500">{description}</span>
      </div>
    </div>
  );
}
