import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p
              className={`mt-1 text-xs font-medium ${
                trendUp ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {trend}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-emerald-50 p-2.5">
          <Icon className="h-5 w-5 text-emerald-600" />
        </div>
      </div>
    </div>
  );
}
