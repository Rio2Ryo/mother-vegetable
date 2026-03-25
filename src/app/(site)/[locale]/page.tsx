import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import ProductsSection from '@/components/home/ProductsSection';
import ProductsSkeleton from '@/components/home/ProductsSkeleton';

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
    </>
  );
}
