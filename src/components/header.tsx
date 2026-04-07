import Link from "next/link";
import { Leaf } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-green-700">
          <Leaf className="h-5 w-5" />
          <span>100% Vegan</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="transition hover:text-green-700">
            Home
          </Link>
          <Link
            href="/about-100-percent-vegan"
            className="transition hover:text-green-700"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
