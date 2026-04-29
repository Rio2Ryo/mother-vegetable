'use client';

import { useCartStore } from '@/store/cart';
import { useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCT_PRICES_JPY, REFERRAL_DISCOUNT_RATE } from '@/lib/stripe';

export default function CartPanel() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } =
    useCartStore();
  const router = useRouter();
  const t = useTranslations('cart');
  const locale = useLocale();
  const isJa = locale === 'ja';

  // Resolve price for each item in the user's locale currency.
  // For JA, look up the canonical JPY price by productId (priceJpy in catalog);
  // fall back to the stored USD price if the product is not in the JPY map.
  const resolvedItems = items.map((item) => {
    const jpyBase = PRODUCT_PRICES_JPY[item.productId];
    if (isJa && jpyBase != null) {
      const hadDiscount = item.discountedPrice != null && item.discountedPrice < item.price;
      const jpyEffective = hadDiscount
        ? Math.round(jpyBase * (1 - REFERRAL_DISCOUNT_RATE))
        : jpyBase;
      return { item, currency: 'JPY' as const, unit: jpyEffective };
    }
    return {
      item,
      currency: 'USD' as const,
      unit: item.discountedPrice ?? item.price,
    };
  });

  const subtotal = resolvedItems.reduce((sum, { unit, item }) => sum + unit * item.quantity, 0);
  const subtotalCurrency = isJa && resolvedItems.every(r => r.currency === 'JPY') ? 'JPY' : 'USD';
  const fmt = (currency: 'JPY' | 'USD', amount: number) =>
    currency === 'JPY' ? `¥${Math.round(amount).toLocaleString()}` : `USD ${amount.toFixed(2)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-[10] backdrop-blur-[2px]"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 w-full sm:w-[85%] md:w-[40%] h-[100dvh] bg-black border-l border-[#25C760] shadow-[-5px_0_30px_rgba(0,0,0,0.5)] z-[11] overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Title - Green gradient header bar */}
            <div className="w-full h-[55px] bg-gradient-to-r from-[#25C760] to-[#3C8063] text-white uppercase font-semibold shadow-[0_2px_10px_rgba(37,199,96,0.3)] flex items-center justify-between px-5">
              <h5 className="m-0 text-base">{t('title')} ({items.length})</h5>
              <button
                onClick={closeCart}
                className="text-white text-xl cursor-pointer bg-transparent border-none hover:scale-110 transition-transform duration-200"
                aria-label="Close cart"
              >
                &#10005;
              </button>
            </div>

            {/* Cart items */}
            <div className="p-4 sm:p-6 overflow-y-auto h-[calc(100dvh-210px-env(safe-area-inset-bottom))] mt-2 pb-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="text-xl mb-3 text-[#25C760]">{t('empty')}</span>
                  <button
                    onClick={closeCart}
                    className="mt-3 bg-gradient-to-r from-[#25C760] to-[#3C8063] text-white font-semibold border-none rounded-[5px] px-6 py-3 cursor-pointer hover:opacity-90 hover:shadow-[0_4px_15px_rgba(37,199,96,0.4)] transition-all duration-300"
                  >
                    {t('continueShopping')}
                  </button>
                </div>
              ) : (
                resolvedItems.map(({ item, currency, unit }, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="flex gap-3 sm:gap-4 p-3 mb-3 border border-[rgba(37,199,96,0.15)] rounded-lg shadow-[0_2px_7px_rgba(0,0,0,0.2)] hover:border-[#25C760] transition-all duration-200"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center relative bg-[#0d1f12] border border-[#25C760]/20 rounded-md overflow-hidden">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.name}
                          width={70}
                          height={70}
                          className="object-contain w-full h-full"
                          onError={(e) => {
                            // Fallback to MVT coin if remote URL fails to load
                            (e.currentTarget as HTMLImageElement).src = '/cdn/mvt_coin.png';
                          }}
                        />
                      ) : (
                        <span className="text-[#25C760] font-bold text-xs text-center px-1 leading-tight">
                          {item.name.slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <span className="font-bold text-[#25C760] text-sm mb-2 truncate">{item.name}</span>
                      <span className="text-[#25C760] text-sm font-bold">
                        {fmt(currency, unit * item.quantity)}
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-white text-sm mr-1">{t('qty')}</span>
                        <div className="flex items-center border border-[#25C760] rounded-[5px]">
                          <button
                            className="px-2 text-[#25C760] bg-transparent border-none cursor-pointer text-lg hover:bg-[#25C760] hover:text-black transition-colors duration-200 rounded-l-[4px] min-w-[32px] min-h-[32px]"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-3 text-white text-sm">{item.quantity}</span>
                          <button
                            className="px-2 text-[#25C760] bg-transparent border-none cursor-pointer text-lg hover:bg-[#25C760] hover:text-black transition-colors duration-200 rounded-r-[4px] min-w-[32px] min-h-[32px]"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="ml-2 bg-transparent border-none cursor-pointer text-[#25C760] hover:text-red-500 transition-colors duration-200 min-w-[32px] min-h-[32px] flex items-center justify-center"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Checkout */}
            {items.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 pb-[calc(1rem+env(safe-area-inset-bottom))] bg-black border-t border-[rgba(37,199,96,0.2)]">
                <div className="flex justify-end items-end mb-3">
                  <span className="text-sm font-bold text-white mr-3">{t('subtotal')}</span>
                  <span className="text-xl font-bold text-[#25C760]">
                    {fmt(subtotalCurrency, subtotal)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    router.push('/checkout');
                  }}
                  className="w-full bg-gradient-to-r from-[#25C760] to-[#3C8063] text-white font-semibold border-none rounded-[5px] py-3 cursor-pointer hover:shadow-[0_4px_20px_rgba(37,199,96,0.5)] hover:opacity-95 transition-all duration-300 active:scale-[0.98] min-h-[48px]"
                >
                  {t('checkout')}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
