import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductsListing from '@/components/products/ProductsListing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  await params;

  return {
    title: 'Mazavege Shop｜Mother Vegetable',
    description: 'Mother Vegetableの商品を、商品名・地域・ストーリーから検索できるMazavege Shopです。',
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductsListing />;
}
