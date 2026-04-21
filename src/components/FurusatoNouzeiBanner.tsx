'use client';

import { useTranslations } from 'next-intl';

export default function FurusatoNouzeiBanner() {
  const t = useTranslations('products');

  return (
    <div className="w-full bg-gradient-to-r from-emerald-900/60 via-green-800/50 to-teal-900/60">
      <div className="max-w-4xl mx-auto px-5 py-8 md:py-10 text-center">
        <p className="text-lg md:text-2xl font-bold text-white/90 mb-2 flex items-center justify-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block flex-shrink-0">
            <path d="M3 21V10L12 3L21 10V21H15V14H9V21H3Z" fill="#25c760" />
            <path d="M10 14H14V21H10V14Z" fill="#1a9e4a" />
          </svg>
          <span>{t('furusatoNouzei')} &mdash; {t('comingSoon')}</span>
        </p>
        <p className="text-sm md:text-base text-white/50">
          {t('furusatoNouzeiDesc')}
        </p>
      </div>
    </div>
  );
}
