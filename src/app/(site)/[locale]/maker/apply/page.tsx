import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import MakerApplyFlow from '@/components/maker-apply/MakerApplyFlow';

export const metadata: Metadata = {
  title: 'Makerアイデア提案｜Mazavege Shop',
  description: 'Japanese Raw Material、容器、ロゴ、商品名を選んでMazavege Makerのアイデアを提案できます。',
};

export default async function MakerApplyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MakerApplyFlow locale={locale} />;
}
