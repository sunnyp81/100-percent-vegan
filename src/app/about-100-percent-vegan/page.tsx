import type { Metadata } from "next";
import { Leaf, Heart, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About 100% Vegan — UK Vegan Product Checker",
  description:
    "Learn about 100% Vegan, a free tool helping UK shoppers identify vegan-friendly supermarket products. Born from Bostin Vegan Food in Birmingham.",
  alternates: {
    canonical: "https://100percentvegan.co.uk/about-100-percent-vegan/",
  },
  openGraph: {
    title: "About 100% Vegan — UK Vegan Product Checker",
    description:
      "A free tool helping UK shoppers identify vegan-friendly supermarket products.",
    url: "https://100percentvegan.co.uk/about-100-percent-vegan/",
    siteName: "100% Vegan",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white">
            <Leaf className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About 100% Vegan
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Helping UK shoppers make informed, compassionate choices — one
            ingredient list at a time.
          </p>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-2xl px-6 py-12 sm:py-16">
        <section className="space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">Our Story</h2>
          <p>
            100% Vegan started with a simple frustration: standing in a
            supermarket aisle, squinting at a tiny ingredients list, trying to
            figure out whether a product was actually vegan. We knew there had to
            be a better way.
          </p>
          <p>
            Our roots trace back to the vibrant vegan food scene in Birmingham,
            where we first began reviewing{" "}
            <strong>Bostin Vegan Food in Birmingham</strong> — the independent
            eateries, market stalls, and passionate producers championing
            plant-based eating in the West Midlands long before it was
            mainstream. That grassroots energy convinced us that veganism
            wasn&apos;t a trend. It was a movement worth supporting with better
            tools.
          </p>
          <p>
            What started as a local blog cataloguing Birmingham&apos;s best
            vegan finds evolved into something bigger: a free, searchable
            database that scans the ingredient lists of thousands of UK
            supermarket products and gives you a clear answer —{" "}
            <span className="font-semibold text-green-600">Yes</span>,{" "}
            <span className="font-semibold text-red-600">No</span>, or{" "}
            <span className="font-semibold text-amber-500">Maybe</span>.
          </p>
        </section>

        <hr className="my-10 border-gray-200" />

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-center">
              <ShieldCheck className="mx-auto mb-3 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-gray-900">Transparency</h3>
              <p className="mt-2 text-sm text-gray-600">
                Every verdict is based on the published ingredient list. No
                guesswork, no sponsorships.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-center">
              <Heart className="mx-auto mb-3 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-gray-900">Accessibility</h3>
              <p className="mt-2 text-sm text-gray-600">
                100% free to use, forever. No accounts, no paywalls, no ads
                getting in the way.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-center">
              <Leaf className="mx-auto mb-3 h-8 w-8 text-green-600" />
              <h3 className="font-semibold text-gray-900">Impact</h3>
              <p className="mt-2 text-sm text-gray-600">
                Every vegan choice matters. We make those choices easier for
                millions of UK shoppers.
              </p>
            </div>
          </div>
        </section>

        <hr className="my-10 border-gray-200" />

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">How It Works</h2>
          <p>
            We pull product data from open databases covering major UK
            supermarkets — Tesco, Sainsbury&apos;s, Asda, Morrisons, Aldi, Lidl,
            and more. Our algorithm scans every ingredient against a
            comprehensive list of animal-derived substances: from the obvious
            (milk, eggs, honey) to the hidden (casein, shellac, E120, isinglass).
          </p>
          <p>
            Products are classified into three categories:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <span className="font-semibold text-green-600">Vegan</span> — No
              animal-derived ingredients detected.
            </li>
            <li>
              <span className="font-semibold text-red-600">Not Vegan</span> —
              Contains one or more animal-derived ingredients, clearly
              highlighted.
            </li>
            <li>
              <span className="font-semibold text-amber-500">Maybe</span> —
              Contains ingredients that can be either plant-based or
              animal-derived (like E471 or natural flavourings). We flag these so
              you can make your own call.
            </li>
          </ul>
        </section>

        <hr className="my-10 border-gray-200" />

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-semibold text-gray-900">
            From Birmingham to the Whole UK
          </h2>
          <p>
            Birmingham&apos;s vegan scene taught us that real change happens at
            street level — in the kitchens, the corner shops, and the everyday
            choices people make at the supermarket. We&apos;re proud of our Brum
            roots and the community that inspired this project.
          </p>
          <p>
            Today, 100% Vegan serves shoppers across the entire UK, but our
            heart is still in the Midlands. If you&apos;re ever in Birmingham,
            do yourself a favour and explore the incredible{" "}
            <strong>Bostin Vegan Food</strong> the city has to offer.
          </p>
        </section>
      </article>
    </main>
  );
}
