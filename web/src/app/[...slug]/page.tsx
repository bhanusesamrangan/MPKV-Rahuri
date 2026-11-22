import { DynamicPageView } from '@/components/DynamicPageView';
import { getPageData } from '@/lib/pageLoader';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const page = getPageData(slugArray);

  if (page?.title) {
    const enTitle = typeof page.title === 'object' ? page.title.en : page.title;
    const mrTitle = typeof page.title === 'object' ? page.title.mr : page.title;
    return {
      title: `${mrTitle || enTitle} | MPKV Rahuri`,
      description:
        page.hero?.subtitle?.en ||
        page.hero?.subheadline?.en ||
        'Official Portal of Mahatma Phule Krishi Vidyapeeth, Rahuri Central Headquarters.',
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
  const page = getPageData(slugArray);

  return (
    <DynamicPageView
      slug={slugArray.join('/')}
      path={slugArray.join('/')}
      initialPageData={page}
    />
  );
}
