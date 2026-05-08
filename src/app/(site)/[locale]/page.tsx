import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import LpHeroSection from '@/components/home/lp/LpHeroSection';
import LpAboutSection from '@/components/home/lp/LpAboutSection';
import LpProductsSection from '@/components/home/lp/LpProductsSection';
import LpStorySection from '@/components/home/lp/LpStorySection';
import LpCommerceSection from '@/components/home/lp/LpCommerceSection';
import ProductsListing from '@/components/products/ProductsListing';
import { getLpLocale, lpCopy } from '@/components/home/lp/lpCopy';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const copy = lpCopy[getLpLocale(locale)];

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lpLocale = getLpLocale(locale);
  return (
    <main>
      <LpHeroSection locale={lpLocale} />
      <LpAboutSection locale={lpLocale} />
      <LpProductsSection locale={lpLocale} />
      <LpStorySection locale={lpLocale} />
      <LpCommerceSection locale={lpLocale} />
      <ProductsListing embedded />
    </main>
  );
}
