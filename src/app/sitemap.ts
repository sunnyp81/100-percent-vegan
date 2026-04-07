import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // For now, just static pages
  // Once deployed on CF, this will be replaced with a dynamic version
  // that queries D1 for all published product barcodes

  return [
    {
      url: "https://100percentvegan.co.uk",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: "https://100percentvegan.co.uk/about-100-percent-vegan",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
