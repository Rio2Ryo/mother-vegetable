import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { EventProductPage, eventProducts } from './eventProducts';

export async function generateMetadata(): Promise<Metadata> {
  const product = eventProducts.ath;

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: '/ath' },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      images: [product.image],
    },
  };
}

export default async function AthPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EventProductPage product={eventProducts.ath} />;
}
