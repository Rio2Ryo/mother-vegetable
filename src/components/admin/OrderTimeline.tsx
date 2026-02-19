import type { OrderStatus } from "@/types/admin";
import { Check, Package, Truck, Home, XCircle } from "lucide-react";

const STEPS: { status: OrderStatus; label: string; icon: typeof Check }[] = [
  { status: "pending", label: "Pending", icon: Package },
  { status: "processing", label: "Processing", icon: Check },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: Home },
];

const STATUS_ORDER: OrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
];

interface Props {
  currentStatus: OrderStatus;
}

export default function OrderTimeline({ currentStatus }: Props) {
  if (currentStatus === "cancelled") {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-700">
        <XCircle className="h-6 w-6" />
        <div>
          <p className="text-sm font-semibold">Order Cancelled</p>
          <p className="text-xs text-red-500">
            This order has been cancelled and will not be processed further.
          </p>
        </div>
      </div>
    );
  }

  const currentIdx = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="flex items-start justify-between">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const done = idx <= currentIdx;
        const isLast = idx === STEPS.length - 1;

        return (
          <div key={step.status} className="flex flex-1 items-start">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                  done
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  done ? "text-emerald-700" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div className="mt-4 flex-1 px-2">
                <div
                  className={`h-0.5 w-full ${
                    idx < currentIdx ? "bg-emerald-600" : "bg-gray-200"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
