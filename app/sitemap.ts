import type { MetadataRoute } from "next";
import { docsPages } from "@/content/docs-pages";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        absoluteUrl("/images/app-preview.png"),
        absoluteUrl("/images/forest.jpg"),
      ],
    },
    {
      url: absoluteUrl("/docs"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/politica-de-privacidade"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/termos-de-uso"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return pages.concat(
    docsPages.map((page) => ({
      url: absoluteUrl(`/docs/${page.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );
}
