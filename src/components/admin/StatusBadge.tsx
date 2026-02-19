import type { OrderStatus, InstructorStatus } from "@/types/admin";

type Status = OrderStatus | InstructorStatus;

const COLORS: Record<Status, string> = {
  pending: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
  processing: "bg-blue-50 text-blue-700 ring-blue-600/20",
  shipped: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  cancelled: "bg-red-50 text-red-700 ring-red-600/20",
  active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  inactive: "bg-gray-50 text-gray-600 ring-gray-500/20",
};

interface Props {
  status: Status;
}

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${COLORS[status] ?? "bg-gray-50 text-gray-600 ring-gray-500/20"}`}
    >
      {status}
    </span>
  );
}
