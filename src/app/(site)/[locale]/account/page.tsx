'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  status: string;
  total: number;
  currency: string;
  items: OrderItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
}

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('account');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && status === 'unauthenticated') {
      router.push('/login');
    }
  }, [mounted, status, router]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    async function fetchOrders() {
      try {
        const res = await fetch('/api/orders');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Order[] = await res.json();
        setOrders(data);
      } catch {
        setError(t('errorLoading'));
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [status, t]);

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-[#25C760] text-lg">{t('loadingOrders')}</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const user = session?.user;

  function statusColor(s: string) {
    switch (s) {
      case 'confirmed':
      case 'shipped':
      case 'delivered':
        return 'bg-[#25C760]/20 text-[#25C760]';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-700/50 text-gray-300';
    }
  }

  function statusLabel(s: string) {
    const key = `status_${s}` as `status_${string}`;
    try {
      return t(key as Parameters<typeof t>[0]);
    } catch {
      return s;
    }
  }

  function itemsSummary(items: OrderItem[]) {
    const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
    return `${totalQty} ${totalQty === 1 ? t('item') : t('itemsCount')}`;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">{t('title')}</h1>

        {/* Profile Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-[#25C760] mb-4">{t('profile')}</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#25C760]/20 flex items-center justify-center text-[#25C760] text-xl font-bold">
              {(user?.name?.[0] || user?.email?.[0] || '?').toUpperCase()}
            </div>
            <div>
              {user?.name && (
                <p className="text-white font-semibold text-lg">{user.name}</p>
              )}
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-[#25C760] mb-4">{t('orderHistory')}</h2>

          {loading && (
            <p className="text-gray-500 text-sm text-center py-8">{t('loadingOrders')}</p>
          )}

          {error && (
            <p className="text-red-400 text-sm text-center py-8">{error}</p>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-500 mb-2">{t('noOrders')}</p>
              <p className="text-gray-600 text-sm mb-6">{t('startShopping')}</p>
              <Link
                href="/product/achieve"
                className="inline-block px-6 py-3 bg-[#25C760] text-black font-semibold rounded-lg hover:bg-[#1ea84e] transition-colors"
              >
                {t('browseProducts')}
              </Link>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <>
              {/* Desktop Table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left text-gray-400 pb-3 font-medium">{t('orderId')}</th>
                      <th className="text-left text-gray-400 pb-3 font-medium">{t('date')}</th>
                      <th className="text-left text-gray-400 pb-3 font-medium">{t('items')}</th>
                      <th className="text-left text-gray-400 pb-3 font-medium">{t('status')}</th>
                      <th className="text-right text-gray-400 pb-3 font-medium">{t('total')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-800/50">
                        <td className="py-4 text-gray-300 font-mono text-xs">
                          {order.id.substring(0, 12)}...
                        </td>
                        <td className="py-4 text-gray-300">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-gray-300">
                          {itemsSummary(order.items)}
                        </td>
                        <td className="py-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                            {statusLabel(order.status)}
                          </span>
                        </td>
                        <td className="py-4 text-right font-medium text-white">
                          ${order.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-black/50 border border-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-gray-400 font-mono text-xs">
                        {order.id.substring(0, 12)}...
                      </span>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                        {statusLabel(order.status)}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-gray-500 text-xs">
                          {new Date(order.createdAt).toLocaleDateString()} · {itemsSummary(order.items)}
                        </p>
                      </div>
                      <p className="text-white font-semibold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
