import { DynamicPageView } from '@/components/DynamicPageView';
import pagesDataRaw from '@/data/scraped/rahuri_pages.json';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const slugKey = slugArray.length > 0 ? slugArray[slugArray.length - 1] : '';
  const pages = pagesDataRaw as Record<string, any>;
  const page = pages[slugKey];

  if (page?.title) {
    return {
      title: `${page.title.en} | MPKV Rahuri`,
      description: page.hero?.subheadline?.en || 'Mahatma Phule Krishi Vidyapeeth, Rahuri Central Headquarters.',
    };
  }

  return {
    title: 'MPKV Rahuri - Central Campus',
    description: 'Mahatma Phule Krishi Vidyapeeth, Rahuri Central Headquarters.',
  };
}

export default async function CatchAllPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const slugKey = slugArray.length > 0 ? slugArray[slugArray.length - 1] : '';
  const fullPath = slugArray.join('/');

  return <DynamicPageView slug={slugKey} path={fullPath} />;
}
