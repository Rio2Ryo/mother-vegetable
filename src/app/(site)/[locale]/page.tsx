import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import ProductsSection from '@/components/home/ProductsSection';
import NewsSection from '@/components/home/NewsSection';
import TrustSection from '@/components/home/TrustSection';
import FoodFunctionSection from '@/components/home/FoodFunctionSection';
import CosmeticFunctionSection from '@/components/home/CosmeticFunctionSection';
import TwoOnlyOnesSection from '@/components/home/TwoOnlyOnesSection';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <HeroSection />
      <section className="bg-black py-12 md:py-24">
        <div className="max-w-[1500px] mx-auto px-5">
          <ProductsSection />
          <NewsSection />
          <TrustSection />
          <FoodFunctionSection />
          <CosmeticFunctionSection />
          <TwoOnlyOnesSection />
        </div>
      </section>
    </>
  );
}
