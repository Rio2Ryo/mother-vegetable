'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function DealerApplyPage() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const isZh = locale === 'zh';

  const t = (en: string, ja: string, zh: string) => (isJa ? ja : isZh ? zh : en);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    postalCode: '',
    address: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission to be wired later
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(37,199,96,0.15)] flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25C760" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {t(
              'Application Submitted',
              'お申し込みを受け付けました',
              '申请已提交',
            )}
          </h1>
          <p className="text-gray-300 mb-8">
            {t(
              'Thank you for your interest in becoming a Mother Vegetable dealer. We will review your application and contact you within 5 business days.',
              'マザーベジタブル代理店へのご関心ありがとうございます。内容を確認のうえ、5営業日以内にご連絡いたします。',
              '感谢您有兴趣成为Mother Vegetable经销商。我们将审核您的申请，并在5个工作日内与您联系。',
            )}
          </p>
          <Link
            href="/dealer"
            className="inline-block bg-[#25C760] text-black font-bold py-3 px-8 rounded-lg hover:bg-[#1da34d] transition-colors duration-300 no-underline"
          >
            {t('Back to Mazavege Dealer page', 'Mazavege Dealer 解説ページに戻る', '返回Mazavege Dealer说明页面')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(37,199,96,0.08)] to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            {t('Mazavege Dealer Application Page', 'Mazavege Dealer 申し込みページ', 'Mazavege Dealer申请页面')}
          </h1>
          <p className="text-base text-gray-300">
            {t(
              'Fill out the form below to apply for the Mazavege Dealer Program.',
              '以下のフォームにご記入のうえ、Mazavege Dealer プログラムにお申し込みください。',
              '请填写以下表单，申请Mazavege Dealer计划。',
            )}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 px-6">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                {t('Full Name', '氏名', '姓名')} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(37,199,96,0.3)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#25C760] transition-colors"
                placeholder={t('Your full name', '氏名を入力', '请输入姓名')}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                {t('Email', 'メールアドレス', '电子邮件')} <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(37,199,96,0.3)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#25C760] transition-colors"
                placeholder="sample@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                {t('Phone', '電話番号', '电话号码')} <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(37,199,96,0.3)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#25C760] transition-colors"
                placeholder={t('+1 234 567 8900', '+81 90 1234 5678', '+86 138 0000 0000')}
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">
                {t('Company Name', '会社名', '公司名称')} <span className="text-xs text-gray-500">{t('(optional)', '（任意）', '（选填）')}</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(37,199,96,0.3)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#25C760] transition-colors"
                placeholder={t('Your company name', '会社名を入力', '请输入公司名称')}
              />
            </div>

            {/* Postal Code */}
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-300 mb-2">
                {t('Postal Code', '郵便番号', '邮政编码')} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(37,199,96,0.3)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#25C760] transition-colors"
                placeholder={t('e.g. 100-0001', '例：100-0001', '例如：100-0001')}
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                {t('Address', '住所', '地址')} <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(37,199,96,0.3)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#25C760] transition-colors"
                placeholder={t('Your address', '住所を入力', '请输入地址')}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                {t('Message', 'メッセージ', '留言')}
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(37,199,96,0.3)] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#25C760] transition-colors resize-vertical"
                placeholder={t(
                  'Tell us about your business and why you want to become a dealer...',
                  'ビジネスの概要や代理店をご希望の理由をお聞かせください...',
                  '请介绍您的业务以及成为经销商的原因...',
                )}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#25C760] text-black font-bold py-3 px-8 rounded-lg text-lg hover:bg-[#1da34d] transition-colors duration-300 cursor-pointer"
            >
              {t('Apply as a Mazavege Dealer', 'Mazavege Dealer に申し込む', '申请成为Mazavege Dealer')}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/dealer"
              className="text-[#25C760] hover:underline text-sm no-underline"
            >
              {t('Back to Mazavege Dealer page', 'Mazavege Dealer 解説ページに戻る', '返回Mazavege Dealer说明页面')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
