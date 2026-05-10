import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { EventProductPage, getEventProduct } from '../ath/eventProducts';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const product = getEventProduct('ti', locale);

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: '/ti' },
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      images: [product.image],
    },
  };
}

export default async function TiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EventProductPage product={getEventProduct('ti', locale)} locale={locale} />;
}
