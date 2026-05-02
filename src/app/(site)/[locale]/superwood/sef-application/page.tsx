'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export default function ScaleSefApplicationPage() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const isZh = locale === 'zh';
  const t = (en: string, ja: string, zh: string) => (isJa ? ja : isZh ? zh : en);

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    quantity: '1',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="w-16 h-16 rounded-full bg-[#25c760]/15 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25c760" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {t('Inquiry Received', '申し込み相談を受け付けました', '咨询申请已提交')}
          </h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            {t(
              'Thank you. Our team will confirm the installation details and contact you before any payment procedure.',
              'ありがとうございます。設置条件・内容を確認したうえで、決済前に担当者からご連絡します。',
              '谢谢。我们会先确认设置条件和内容，并在付款流程前与您联系。',
            )}
          </p>
          <Link href="/superwood" className="inline-block px-8 py-3 rounded-full bg-[#25c760] text-black font-semibold hover:bg-[#1da84e] transition-colors no-underline">
            {t('Back to Super Wood', 'Super Woodに戻る', '返回Super Wood')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative px-6 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#25c760]/10 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-[#25c760] text-sm font-semibold tracking-[0.2em] uppercase mb-4">1/100 Scale SEF</p>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-5">
            {t('SEF Application Consultation', 'SEF申し込み相談', 'SEF申请咨询')}
          </h1>
          <p className="text-gray-300 leading-relaxed">
            {t(
              'This is a high-value, custom item. It is not purchased through the normal cart. Please submit an inquiry first so we can confirm conditions and guide the application process.',
              '150万円の高額・個別対応商品です。通常カート購入ではなく、まず設置条件・購入意向を確認してから専用手続きへ進みます。',
              '这是高价定制商品，不通过普通购物车购买。请先提交咨询，我们会确认条件后引导申请流程。',
            )}
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto border border-[#25c760]/30 rounded-2xl bg-[#0d1f12] p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
            <div className="rounded-xl bg-black/30 border border-[#25c760]/20 p-4">
              <p className="text-[#25c760] font-bold mb-1">STEP 1</p>
              <p className="text-sm text-gray-300">{t('Inquiry', '相談申込', '提交咨询')}</p>
            </div>
            <div className="rounded-xl bg-black/30 border border-[#25c760]/20 p-4">
              <p className="text-[#25c760] font-bold mb-1">STEP 2</p>
              <p className="text-sm text-gray-300">{t('Confirmation', '条件確認', '条件确认')}</p>
            </div>
            <div className="rounded-xl bg-black/30 border border-[#25c760]/20 p-4">
              <p className="text-[#25c760] font-bold mb-1">STEP 3</p>
              <p className="text-sm text-gray-300">{t('Dedicated Procedure', '専用手続き', '专用流程')}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-300 mb-2">{t('Name', '氏名', '姓名')} <span className="text-red-400">*</span></label>
              <input id="name" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-black/40 border border-[#25c760]/30 text-white focus:outline-none focus:border-[#25c760]" />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm text-gray-300 mb-2">{t('Company / Organization', '会社名・団体名', '公司/组织')}</label>
              <input id="company" name="company" value={form.company} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-black/40 border border-[#25c760]/30 text-white focus:outline-none focus:border-[#25c760]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 mb-2">{t('Email', 'メールアドレス', '邮箱')} <span className="text-red-400">*</span></label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-black/40 border border-[#25c760]/30 text-white focus:outline-none focus:border-[#25c760]" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-gray-300 mb-2">{t('Phone', '電話番号', '电话')}</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-black/40 border border-[#25c760]/30 text-white focus:outline-none focus:border-[#25c760]" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="location" className="block text-sm text-gray-300 mb-2">{t('Installation Area', '設置予定エリア', '预计设置地区')}</label>
                <input id="location" name="location" value={form.location} onChange={handleChange} placeholder={t('e.g. Tokyo', '例: 東京都', '例如: 东京')} className="w-full px-4 py-3 rounded-lg bg-black/40 border border-[#25c760]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#25c760]" />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm text-gray-300 mb-2">{t('Units', '希望口数', '数量')}</label>
                <select id="quantity" name="quantity" value={form.quantity} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-black/40 border border-[#25c760]/30 text-white focus:outline-none focus:border-[#25c760]">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="相談">{t('Consult first', '相談して決めたい', '先咨询')}</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-gray-300 mb-2">{t('Message', '相談内容', '咨询内容')}</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 rounded-lg bg-black/40 border border-[#25c760]/30 text-white focus:outline-none focus:border-[#25c760]" />
            </div>
            <button type="submit" className="w-full px-8 py-3 rounded-full bg-[#25c760] text-black font-semibold hover:bg-[#1da84e] transition-colors">
              {t('Submit Consultation', '申し込み相談を送信', '提交咨询')}
            </button>
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              {t(
                'Payment will not be made on this page. The dedicated payment or contract process will be provided after confirmation.',
                'このページでは決済は行いません。確認後に専用の決済または契約手続きをご案内します。',
                '本页不会付款。确认后我们会提供专用付款或合同流程。',
              )}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
