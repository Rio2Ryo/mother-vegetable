import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReferralTracker from '@/components/ReferralTracker';
import '../../globals.css';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://mother-vegetable.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'Mother Vegetable — Premium Health Supplements',
    template: '%s | Mother Vegetable',
  },
  description:
    'Mother Vegetable offers premium health supplements derived from nature. Achieve capsules for daily wellness, Confidence cream for skin vitality. Free worldwide shipping.',
  metadataBase: new URL(APP_URL),
  icons: { icon: '/Images/favicon.png' },
  openGraph: {
    type: 'website',
    siteName: 'Mother Vegetable',
    title: 'Mother Vegetable — Premium Health Supplements',
    description:
      'Premium health supplements derived from nature. Achieve capsules for daily wellness, Confidence cream for skin vitality.',
    url: APP_URL,
    images: [
      {
        url: '/cdn/products_achieve_10001.png',
        width: 800,
        height: 800,
        alt: 'Mother Vegetable Achieve',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mother Vegetable — Premium Health Supplements',
    description:
      'Premium health supplements derived from nature. Free worldwide shipping.',
    images: ['/cdn/products_achieve_10001.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-black text-white">
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <ReferralTracker />
          </Suspense>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
