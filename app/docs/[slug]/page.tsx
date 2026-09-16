import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { docsPages, getDocsPage } from "@/content/docs-pages";
import DocsPageShell from "@/components/docs/DocsPageShell";

export function generateStaticParams() {
  return docsPages.map((page) => ({ slug: page.slug }));
}

type DocsRouteProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: DocsRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocsPage(slug);
  if (!page) return {};
  const path = `/docs/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${page.title} | Komorebi`,
      description: page.description,
      url: path,
      type: "article",
    },
  };
}

export default async function DocsPageRoute({ params }: DocsRouteProps) {
  const { slug } = await params;
  const page = getDocsPage(slug);
  if (!page) notFound();
  return <DocsPageShell page={page} />;
}
