"use client";

import { useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/schema";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(
    async (q: string) => {
      setQuery(q);
      if (q.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = (await response.json()) as any;
        setResults(data.products || []);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by product name or brand..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-10 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
              setIsOpen(false);
            }}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {query.length < 2 ? "Type to search" : "No products found"}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 p-2 sm:grid-cols-2">
              {results.map((product) => (
                <div key={product.barcode} onClick={() => setIsOpen(false)}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
