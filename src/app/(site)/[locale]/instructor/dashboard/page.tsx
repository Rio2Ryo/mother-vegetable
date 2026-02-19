'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useAffiliateStore } from '@/store/affiliateStore';
import { buildReferralUrl } from '@/lib/affiliate';

export default function InstructorDashboardPage() {
  const router = useRouter();
  const t = useTranslations('instructor');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const currentInstructor = useAffiliateStore((s) => s.currentInstructor);
  const logout = useAffiliateStore((s) => s.logout);
  const getDirectSalesTotal = useAffiliateStore((s) => s.getDirectSalesTotal);
  const getReferralSalesTotal = useAffiliateStore((s) => s.getReferralSalesTotal);
  const getDirectCommissionTotal = useAffiliateStore((s) => s.getDirectCommissionTotal);
  const getReferralCommissionTotal = useAffiliateStore((s) => s.getReferralCommissionTotal);
  const getTotalEarnings = useAffiliateStore((s) => s.getTotalEarnings);
  const getReferredInstructors = useAffiliateStore((s) => s.getReferredInstructors);
  const getDirectSalesCount = useAffiliateStore((s) => s.getDirectSalesCount);
  const getReferralSalesCount = useAffiliateStore((s) => s.getReferralSalesCount);
  const getDirectCommissions = useAffiliateStore((s) => s.getDirectCommissions);
  const getReferralCommissions = useAffiliateStore((s) => s.getReferralCommissions);
  const instructors = useAffiliateStore((s) => s.instructors);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !currentInstructor) {
      router.push('/instructor/login');
    }
  }, [mounted, currentInstructor, router]);

  if (!mounted || !currentInstructor) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-[#25C760] text-lg">{t('loading')}</div>
      </div>
    );
  }

  const referralUrl = buildReferralUrl(currentInstructor.referralCode);
  const directSalesTotal = getDirectSalesTotal(currentInstructor.id);
  const referralSalesTotal = getReferralSalesTotal(currentInstructor.id);
  const directCommissionTotal = getDirectCommissionTotal(currentInstructor.id);
  const referralCommissionTotal = getReferralCommissionTotal(currentInstructor.id);
  const totalEarnings = getTotalEarnings(currentInstructor.id);
  const referredInstructors = getReferredInstructors(currentInstructor.id);
  const directSalesCount = getDirectSalesCount(currentInstructor.id);
  const referralSalesCount = getReferralSalesCount(currentInstructor.id);
  const directCommissions = getDirectCommissions(currentInstructor.id);
  const referralCommissions = getReferralCommissions(currentInstructor.id);
  const allCommissions = [...directCommissions, ...referralCommissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  function handleCopy() {
    navigator.clipboard.writeText(referralUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleLogout() {
    logout();
    router.push('/instructor/login');
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              {t('dashboardTitle')}
            </h1>
            <p className="text-[#25C760] text-lg mt-1">
              {t('welcome')}, {currentInstructor.fullName}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-gray-600 text-gray-400 rounded-lg hover:border-red-500 hover:text-red-400 transition-colors text-sm"
          >
            {t('logout')}
          </button>
        </div>

        {/* Referral URL Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-[#25C760] mb-3">{t('yourReferralUrl')}</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-3 text-white/80 text-sm font-mono overflow-x-auto">
              {referralUrl}
            </div>
            <button
              onClick={handleCopy}
              className="px-6 py-3 bg-[#25C760] text-black font-semibold rounded-lg hover:bg-[#1ea84e] transition-colors whitespace-nowrap"
            >
              {copied ? t('copied') : t('copyUrl')}
            </button>
          </div>
          <p className="text-white/40 text-xs mt-2">
            {t('referralCodeLabel')}: <span className="text-[#25C760] font-mono">{currentInstructor.referralCode}</span>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* Direct Sales */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#25C760]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#25C760]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-sm text-gray-400">{t('directSales')}</h3>
            </div>
            <p className="text-2xl font-bold">{directSalesCount} {t('orders')}</p>
            <p className="text-[#25C760] text-sm mt-1">${directSalesTotal.toFixed(2)} {t('revenue')}</p>
          </div>

          {/* Referral Sales */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-sm text-gray-400">{t('referralSales')}</h3>
            </div>
            <p className="text-2xl font-bold">{referralSalesCount} {t('orders')}</p>
            <p className="text-blue-400 text-sm mt-1">${referralSalesTotal.toFixed(2)} {t('revenue')}</p>
          </div>

          {/* Total Earnings */}
          <div className="bg-gray-900 border border-[#25C760]/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#25C760]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#25C760]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-sm text-gray-400">{t('totalEarnings')}</h3>
            </div>
            <p className="text-3xl font-bold text-[#25C760]">${totalEarnings.toFixed(2)}</p>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="text-gray-400">
                {t('directCommission')}: <span className="text-white">${directCommissionTotal.toFixed(2)}</span>
              </span>
              <span className="text-gray-400">
                {t('referralCommission')}: <span className="text-white">${referralCommissionTotal.toFixed(2)}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Commission Rates Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-[#25C760] mb-3">{t('commissionRates')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#25C760]/10 flex items-center justify-center text-[#25C760] font-bold text-lg">
                25%
              </div>
              <div>
                <p className="text-white font-medium">{t('directCommission')}</p>
                <p className="text-gray-400 text-xs">{t('directCommissionDesc')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-lg">
                10%
              </div>
              <div>
                <p className="text-white font-medium">{t('referralCommission')}</p>
                <p className="text-gray-400 text-xs">{t('referralCommissionDesc')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout for tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Commissions */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-[#25C760] mb-4">{t('recentCommissions')}</h2>
            {allCommissions.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">{t('noCommissionsYet')}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left text-gray-400 pb-3 font-medium">{t('date')}</th>
                      <th className="text-left text-gray-400 pb-3 font-medium">{t('type')}</th>
                      <th className="text-right text-gray-400 pb-3 font-medium">{t('orderTotal')}</th>
                      <th className="text-right text-gray-400 pb-3 font-medium">{t('commission')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCommissions.slice(0, 10).map((c) => (
                      <tr key={c.id} className="border-b border-gray-800/50">
                        <td className="py-3 text-gray-300">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                              c.type === 'direct'
                                ? 'bg-[#25C760]/20 text-[#25C760]'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}
                          >
                            {c.type === 'direct' ? t('direct') : t('referral')}
                          </span>
                        </td>
                        <td className="py-3 text-right text-gray-300">${c.orderTotal.toFixed(2)}</td>
                        <td className="py-3 text-right font-medium text-[#25C760]">
                          +${c.commissionAmount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Referred Instructors */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-[#25C760] mb-4">{t('referredInstructors')}</h2>
            {referredInstructors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm mb-3">{t('noReferredInstructors')}</p>
                <p className="text-gray-600 text-xs">{t('shareReferralTip')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {referredInstructors.map((ri) => {
                  const riDirectSales = getDirectSalesCount(ri.id);
                  const riTotalEarnings = getTotalEarnings(ri.id);
                  const riDirectSalesTotal = getDirectSalesTotal(ri.id);
                  return (
                    <div
                      key={ri.id}
                      className="flex items-center justify-between p-3 bg-black/50 border border-gray-800 rounded-lg"
                    >
                      <div>
                        <p className="text-white font-medium text-sm">{ri.fullName}</p>
                        <p className="text-gray-500 text-xs">
                          {t('joinedOn')} {new Date(ri.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm">{riDirectSales} {t('sales')}</p>
                        <p className="text-gray-500 text-xs">${riDirectSalesTotal.toFixed(2)} {t('totalSales')}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Commission Breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-[#25C760] mb-4">{t('commissionBreakdown')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-black/50 rounded-lg">
              <p className="text-gray-400 text-xs mb-1">{t('directSales')}</p>
              <p className="text-xl font-bold">${directSalesTotal.toFixed(2)}</p>
              <p className="text-[#25C760] text-xs mt-1">x 25%</p>
            </div>
            <div className="text-center p-4 bg-black/50 rounded-lg">
              <p className="text-gray-400 text-xs mb-1">{t('directCommission')}</p>
              <p className="text-xl font-bold text-[#25C760]">${directCommissionTotal.toFixed(2)}</p>
            </div>
            <div className="text-center p-4 bg-black/50 rounded-lg">
              <p className="text-gray-400 text-xs mb-1">{t('referralSales')}</p>
              <p className="text-xl font-bold">${referralSalesTotal.toFixed(2)}</p>
              <p className="text-blue-400 text-xs mt-1">x 10%</p>
            </div>
            <div className="text-center p-4 bg-black/50 rounded-lg">
              <p className="text-gray-400 text-xs mb-1">{t('referralCommission')}</p>
              <p className="text-xl font-bold text-blue-400">${referralCommissionTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
            <span className="text-gray-400 font-medium">{t('totalEarnings')}</span>
            <span className="text-2xl font-bold text-[#25C760]">${totalEarnings.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
