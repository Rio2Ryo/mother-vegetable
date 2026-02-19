import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReferralTracker from '@/components/ReferralTracker';
import '../../globals.css';

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
      <head>
        <title>Mother Vegetable</title>
        <link rel="icon" href="/Images/favicon.png" />
      </head>
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
