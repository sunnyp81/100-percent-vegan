export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-8 text-center text-sm text-gray-500">
        <p>
          100% Vegan UK helps shoppers identify vegan-friendly products in UK
          supermarkets. Verdicts are based on published ingredient lists and
          should not replace medical or dietary advice.
        </p>
        <p className="mt-3">
          &copy; {new Date().getFullYear()} 100% Vegan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
