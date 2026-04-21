import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ProductsSection from '@/components/home/ProductsSection';
import ProductsSkeleton from '@/components/home/ProductsSkeleton';
import NewsSection from '@/components/home/NewsSection';
import JackpotMeter from '@/components/home/JackpotMeter';

export const metadata: Metadata = {
  title: 'Mother Vegetable - Natural Health Products',
  description:
    'Discover Mother Vegetable — a complete product line delivering 48 essential nutrients from nature. Food supplements, cosmetics, and pet health products for your whole family.',
  openGraph: {
    title: 'Mother Vegetable - Natural Health Products',
    description:
      'Discover Mother Vegetable — a complete product line delivering 48 essential nutrients from nature. Food supplements, cosmetics, and pet health products for your whole family.',
  },
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <HeroSection />
      <section className="bg-black py-12 md:py-24">
        <div className="max-w-[1500px] mx-auto px-5">
          <Suspense fallback={<ProductsSkeleton />}>
            <ProductsSection />
          </Suspense>
        </div>
      </section>
      <section className="bg-black py-12 md:py-24">
        <div className="max-w-3xl mx-auto px-5">
          <JackpotMeter />
        </div>
      </section>
      <section className="bg-black py-12 md:py-24">
        <div className="max-w-[1500px] mx-auto px-5">
          <NewsSection />
        </div>
      </section>
    </>
  );
}
