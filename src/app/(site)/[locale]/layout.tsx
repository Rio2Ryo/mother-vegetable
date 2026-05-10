import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FurusatoNouzeiBanner from '@/components/FurusatoNouzeiBanner';
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
    default: 'Mother Vegetable｜次世代の健康・サステナブルブランド',
    template: '%s｜Mother Vegetable',
  },
  description:
    '48種類の必須栄養素を1度に摂取できるMother Vegetable。Achieve（フレッシュドライプロテイン）・Confidence（コラーゲンクリーム）・MV養殖魚など、地球と人を同時に育てるサステナブルプロダクトをお届けします。',
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
    title: 'Mother Vegetable｜地球と人を、同時に育てる',
    description:
      '48種の必須栄養素をまるごと摂取。Achieve・Confidenceから始まる、新しい健康とサステナブルのスタンダード。みんなの購入が実物のSEFを建てる「MV Growth Meter」も連動中。',
    url: APP_URL,
    images: [
      {
        url: '/Images/Assets/General/og-logo.png',
        width: 1200,
        height: 630,
        alt: 'Mother Vegetable',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mother Vegetable｜地球と人を、同時に育てる',
    description:
      '48種の必須栄養素を1度に摂れる、サステナブルな次世代健康ブランド。',
    images: ['/Images/Assets/General/og-logo.png'],
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
            <FurusatoNouzeiBanner />
            <Footer />
            <ChatBot />
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
