import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import LpHeroSection from '@/components/home/lp/LpHeroSection';
import LpAboutSection from '@/components/home/lp/LpAboutSection';
import LpProductsSection from '@/components/home/lp/LpProductsSection';
import LpStorySection from '@/components/home/lp/LpStorySection';
import LpCommerceSection from '@/components/home/lp/LpCommerceSection';
import LpOwnerFlowSection from '@/components/home/lp/LpOwnerFlowSection';
import LpVisionSection from '@/components/home/lp/LpVisionSection';

export const metadata: Metadata = {
  title: 'Mother Vegetable Project | 生産者の想い×日本の魅力×地球最古の生命の力',
  description: '地球最古の生命力と人の想いから生まれるMother Vegetableプロジェクト。',
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <LpHeroSection />
      <LpAboutSection />
      <LpProductsSection />
      <LpStorySection />
      <LpCommerceSection />
      <LpOwnerFlowSection />
      <LpVisionSection />
    </main>
  );
}
