import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface VerdictBadgeProps {
  status: "YES" | "NO" | "MAYBE";
}

export function VerdictBadge({ status }: VerdictBadgeProps) {
  if (status === "YES") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-600">This product is vegan</p>
            <p className="text-xs text-green-500">No animal-derived ingredients detected</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "NO") {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <XCircle className="h-8 w-8 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-600">This product is NOT vegan</p>
            <p className="text-xs text-red-500">Contains animal-derived ingredients</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-6 py-4 text-center">
      <div className="flex items-center justify-center gap-3">
        <AlertCircle className="h-8 w-8 text-amber-600" />
        <div>
          <p className="text-sm font-medium text-amber-600">This product may not be vegan</p>
          <p className="text-xs text-amber-500">Contains ambiguous ingredients</p>
        </div>
      </div>
    </div>
  );
}
