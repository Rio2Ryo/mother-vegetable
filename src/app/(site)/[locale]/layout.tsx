import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import ReferralTracker from '@/components/ReferralTracker';
import AuthProvider from '@/components/AuthProvider';
import '../../globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  weight: ['400', '500', '700'],
});

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
  alternates: {
    canonical: APP_URL,
    languages: {
      en: `${APP_URL}/en`,
      ja: `${APP_URL}/ja`,
      zh: `${APP_URL}/zh`,
    },
  },
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
    <html lang={locale} className={`${inter.variable} ${notoSansJp.variable}`}>
      <body className="bg-black text-white font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Mother Vegetable',
              url: APP_URL,
              logo: `${APP_URL}/Images/favicon.png`,
              description:
                'Premium health supplements derived from nature, born from Earth\'s life force 3.5 billion years ago.',
              sameAs: [],
            }),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-emerald-600 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            <Suspense fallback={null}>
              <ReferralTracker />
            </Suspense>
            <Header />
            <main id="main-content" role="main">{children}</main>
            <Footer />
            <ChatBot />
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
