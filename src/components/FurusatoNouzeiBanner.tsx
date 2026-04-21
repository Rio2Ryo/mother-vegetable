'use client';

import { useTranslations } from 'next-intl';

export default function FurusatoNouzeiBanner() {
  const t = useTranslations('products');

  return (
    <div className="w-full bg-gradient-to-r from-emerald-900/60 via-green-800/50 to-teal-900/60">
      <div className="max-w-4xl mx-auto px-5 py-8 md:py-10 text-center">
        <p className="text-lg md:text-2xl font-bold text-white/90 mb-2">
          {'\u{1F3E0}'} {t('furusatoNouzei')} &mdash; {t('comingSoon')}
        </p>
        <p className="text-sm md:text-base text-white/50">
          {t('furusatoNouzeiDesc')}
        </p>
      </div>
    </div>
  );
}
