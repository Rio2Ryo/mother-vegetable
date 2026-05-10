import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { EventProductPage, eventProducts } from '../ath/eventProducts';

export async function generateMetadata(): Promise<Metadata> {
  const product = eventProducts.wn;

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: '/wn' },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      images: [product.image],
    },
  };
}

export default async function WnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EventProductPage product={eventProducts.wn} />;
}
