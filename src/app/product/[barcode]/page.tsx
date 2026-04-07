import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VerdictBadge } from "@/components/verdict-badge";
import type { Product } from "@/lib/schema";

interface PageProps {
  params: Promise<{ barcode: string }>;
}

async function getProduct(barcode: string): Promise<Product | null> {
  try {
    // Must use absolute URL for fetch in Next.js on Cloudflare
    const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `https://100percentvegan.co.uk`;

    const response = await fetch(`${baseUrl}/api/products/${barcode}`, {
      next: { revalidate: 86400 }, // 1 day ISR
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { barcode } = await params;
  const product = await getProduct(barcode);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const verdictText =
    product.veganStatus === "YES"
      ? "is vegan"
      : product.veganStatus === "NO"
        ? "is NOT vegan"
        : "may not be vegan";

  return {
    title: `Is ${product.name} Vegan? | 100% Vegan`,
    description: `${product.name}${product.brand ? ` by ${product.brand}` : ""} — ${verdictText}. Check the full ingredient analysis.`,
    alternates: {
      canonical: `https://100percentvegan.co.uk/product/${barcode}`,
    },
    openGraph: {
      title: `Is ${product.name} Vegan?`,
      description: `Check if ${product.name} is vegan with 100% Vegan.`,
      url: `https://100percentvegan.co.uk/product/${barcode}`,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { barcode } = await params;
  const product = await getProduct(barcode);

  if (!product) {
    notFound();
  }

  const flaggedIngredients: string[] = JSON.parse(
    product.nonVeganIngredients as string
  );

  // Parse ingredients text into array
  const ingredientsList = (product.ingredientsText || "")
    .split(/,\s*/)
    .filter((i) => i.trim());

  // Highlight non-vegan ingredients
  const renderIngredients = () => {
    return ingredientsList.map((ingredient, idx) => {
      const isNonVegan = flaggedIngredients.some(
        (flag) => ingredient.toLowerCase().includes(flag.toLowerCase())
      );
      return (
        <span
          key={idx}
          className={
            isNonVegan ? "font-bold text-red-600" : "text-gray-700"
          }
        >
          {ingredient.trim()}
          {idx < ingredientsList.length - 1 ? ", " : ""}
        </span>
      );
    });
  };

  return (
    <main className="min-h-full bg-gray-50 py-12">
      <article className="mx-auto max-w-2xl px-6">
        {/* Verdict */}
        <section className="mb-8">
          <VerdictBadge status={product.veganStatus} />
        </section>

        {/* Product Info */}
        <section className="mb-8 rounded-lg bg-white p-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          {product.brand && (
            <p className="mt-2 text-lg text-gray-600">by {product.brand}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">Barcode: {product.barcode}</p>
        </section>

        {/* Flagged Ingredients */}
        {flaggedIngredients.length > 0 && (
          <section className="mb-8 rounded-lg bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              {product.veganStatus === "NO"
                ? "Non-Vegan Ingredients"
                : "Ambiguous Ingredients"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {flaggedIngredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    product.veganStatus === "NO"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Full Ingredients List */}
        <section className="rounded-lg bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Full Ingredients
          </h2>
          <p className="leading-relaxed">{renderIngredients()}</p>
        </section>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              brand: product.brand
                ? { "@type": "Brand", name: product.brand }
                : undefined,
              image: product.imageUrl,
              description: `${product.name} — ${product.veganStatus === "YES" ? "Vegan" : product.veganStatus === "NO" ? "Not Vegan" : "May Not Be Vegan"}`,
              gtin13:
                product.barcode.length === 13 ? product.barcode : undefined,
              additionalProperty: {
                "@type": "PropertyValue",
                name: "Vegan Status",
                value:
                  product.veganStatus === "YES"
                    ? "Vegan"
                    : product.veganStatus === "NO"
                      ? "Not Vegan"
                      : "Uncertain",
              },
            }),
          }}
        />
      </article>
    </main>
  );
}
