import { getTranslator } from "@/lib/i18n/translate";
import { pageMetadata, resolveLocale } from "@/lib/i18n/metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { docsPages, getDocsPage } from "@/content/docs-pages";
import DocsPageShell from "@/components/docs/DocsPageShell";

export function generateStaticParams() {
  return docsPages.map((page) => ({ slug: page.slug }));
}

type DocsRouteProps = { params: Promise<{ slug: string; locale: string }> };

export async function generateMetadata({
  params,
}: DocsRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const page = getDocsPage(slug);
  if (!page) return {};
  const path = `/docs/${page.slug}`;
  const t = getTranslator(locale);
  const metadata = pageMetadata(locale, path, t(page.title), t(page.description));
  return { ...metadata, openGraph: { ...metadata.openGraph, type: "article" } };
}

export default async function DocsPageRoute({ params }: DocsRouteProps) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const page = getDocsPage(slug);
  if (!page) notFound();
  return <DocsPageShell page={page} locale={locale} />;
}
