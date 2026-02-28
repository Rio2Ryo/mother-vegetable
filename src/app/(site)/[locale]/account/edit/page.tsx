'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';

export default function EditProfilePage() {
  const { status: authStatus } = useSession();
  const router = useRouter();
  const t = useTranslations('account');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && authStatus === 'unauthenticated') {
      router.push('/login');
    }
  }, [mounted, authStatus, router]);

  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    async function fetchProfile() {
      try {
        const res = await fetch('/api/user/profile');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setName(data.name || '');
        setEmail(data.email || '');
        setImage(data.image || '');
      } catch {
        setError(t('errorUpdateFailed'));
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [authStatus, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSaving(true);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, image: image || null }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(t('errorUpdateFailed'));
      }
    } catch {
      setError(t('errorUpdateFailed'));
    } finally {
      setSaving(false);
    }
  };

  if (!mounted || authStatus === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-[#25C760] text-lg">{t('loadingOrders')}</div>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-lg mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl font-bold mb-8">{t('editProfile')}</h1>

        {success && (
          <div className="mb-4 p-3 bg-[#25C760]/20 border border-[#25C760] rounded-lg text-[#25C760] text-sm font-medium">
            {t('profileUpdated')}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          {/* Avatar preview */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full border-2 border-[#25C760] overflow-hidden flex items-center justify-center bg-[#25C760]/20">
              {image ? (
                <img src={image} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#25C760] text-2xl font-bold">
                  {(name?.[0] || email?.[0] || '?').toUpperCase()}
                </span>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#25C760] font-semibold text-sm mb-1">{t('name')}:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
              />
            </div>

            <div>
              <label className="block text-gray-500 font-semibold text-sm mb-1">{t('email')}:</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3 py-2 bg-gray-800 border-2 border-gray-700 rounded-[5px] text-gray-400 text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[#25C760] font-semibold text-sm mb-1">{t('avatarUrl')}:</label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-black border-2 border-[#25C760] rounded-[5px] text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#25C760] text-black font-bold py-2 rounded-[5px] cursor-pointer hover:bg-[#1ea84e] transition-colors disabled:opacity-50"
              >
                {saving ? t('saving') : t('save')}
              </button>
              <Link
                href="/account"
                className="flex-1 text-center border-2 border-gray-600 text-gray-300 font-bold py-2 rounded-[5px] hover:border-gray-400 transition-colors no-underline"
              >
                {t('cancel')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
