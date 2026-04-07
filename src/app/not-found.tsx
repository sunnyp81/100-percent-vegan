import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <SearchX className="mb-4 h-12 w-12 text-gray-400" />
      <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
      <p className="mt-2 text-gray-600">
        We couldn&apos;t find what you&apos;re looking for. The product may not
        be in our database yet.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700"
      >
        Back to Home
      </Link>
    </main>
  );
}
