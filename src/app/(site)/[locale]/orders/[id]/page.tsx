'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  street?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface OrderDetail {
  id: string;
  status: string;
  total: number;
  currency: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export default function OrderDetailPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('orderDetail');
  const tAccount = useTranslations('account');
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  const orderId = params.id as string;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && authStatus === 'unauthenticated') {
      router.push('/login');
    }
  }, [mounted, authStatus, router]);

  useEffect(() => {
    if (authStatus !== 'authenticated' || !orderId) return;
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) throw new Error('Not found');
        const data: OrderDetail = await res.json();
        setOrder(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [authStatus, orderId]);

  if (!mounted || authStatus === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-[#25C760] text-lg">{t('loading')}</div>
      </div>
    );
  }

  if (!session) return null;

  function statusColor(s: string) {
    switch (s) {
      case 'confirmed': case 'shipped': case 'delivered':
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
    try { return tAccount(key as Parameters<typeof tAccount>[0]); } catch { return s; }
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
          <Link href="/account" className="text-[#25C760] text-sm hover:underline mb-6 inline-block">
            &larr; {t('backToAccount')}
          </Link>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center">
            <p className="text-gray-400">{t('orderNotFound')}</p>
          </div>
        </div>
      </div>
    );
  }

  const addr = order.shippingAddress;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Link href="/account" className="text-[#25C760] text-sm hover:underline mb-6 inline-block">
          &larr; {t('backToAccount')}
        </Link>

        <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

        {/* Order header */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-gray-400 text-xs">{t('orderId')}</p>
              <p className="text-white font-mono text-sm">{order.id}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">{t('date')}</p>
              <p className="text-white text-sm">{new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
              {statusLabel(order.status)}
            </span>
          </div>
        </div>

        {/* Items */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-[#25C760] mb-4">{t('items')}</h2>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-800/50 pb-3 last:border-0">
                <div className="flex items-center gap-3">
                  {item.image && (
                    <div className="w-12 h-12 rounded bg-gray-800 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="text-white text-sm font-medium">{item.name}</p>
                    <p className="text-gray-500 text-xs">{t('quantity')}: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-white text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between">
            <span className="text-white font-semibold">{t('total')}</span>
            <span className="text-[#25C760] font-bold text-lg">${order.total.toFixed(2)} {order.currency}</span>
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-[#25C760] mb-4">{t('shippingAddress')}</h2>
          <div className="text-gray-300 text-sm space-y-1">
            <p className="text-white font-medium">{addr.firstName} {addr.lastName}</p>
            {(addr.address || addr.street) && <p>{addr.address || addr.street}</p>}
            <p>{addr.city}, {addr.state} {addr.zip}</p>
            <p>{addr.country}</p>
            {addr.phone && <p>{addr.phone}</p>}
            {addr.email && <p className="text-gray-500">{addr.email}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
