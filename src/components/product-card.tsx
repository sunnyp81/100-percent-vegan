import Link from "next/link";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import type { Product } from "@/lib/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const getStatusColor = () => {
    switch (product.veganStatus) {
      case "YES":
        return "text-green-600";
      case "NO":
        return "text-red-600";
      case "MAYBE":
        return "text-amber-600";
    }
  };

  const getStatusIcon = () => {
    switch (product.veganStatus) {
      case "YES":
        return <CheckCircle className="h-5 w-5" />;
      case "NO":
        return <XCircle className="h-5 w-5" />;
      case "MAYBE":
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  return (
    <Link href={`/product/${product.barcode}`}>
      <div className="group rounded-lg border border-gray-200 bg-white p-4 transition hover:border-green-300 hover:shadow-md">
        {/* Image placeholder */}
        <div className="mb-3 h-32 rounded bg-gray-100 group-hover:bg-gray-200" />

        {/* Content */}
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
            {product.name}
          </h3>
          {product.brand && (
            <p className="text-xs text-gray-500">{product.brand}</p>
          )}

          {/* Verdict badge */}
          <div className={`flex items-center gap-1 pt-2 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-xs font-medium">
              {product.veganStatus === "YES"
                ? "Vegan"
                : product.veganStatus === "NO"
                  ? "Not Vegan"
                  : "Maybe"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
