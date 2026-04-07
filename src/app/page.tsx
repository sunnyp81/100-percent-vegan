"use client";

import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/schema";

export default function HomePage() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const response = await fetch("/api/recent");
        const data = (await response.json()) as any;
        setRecentProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching recent products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecent();
  }, []);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
            <Leaf className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Is it vegan?
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Check thousands of UK supermarket products instantly. Search by name
            or barcode.
          </p>

          {/* Search Bar */}
          <div className="mt-8 flex justify-center">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
          <p className="mt-1 text-gray-600">
            The latest products checked for vegan status
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : recentProducts.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-gray-600">
            No products yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {recentProducts.map((product) => (
              <ProductCard key={product.barcode} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
