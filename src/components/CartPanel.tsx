'use client';

import { useCartStore } from '@/store/cart';

export default function CartPanel() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } =
    useCartStore();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[10]"
          onClick={closeCart}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[40%] h-screen bg-black border-l border-[#25C760] shadow-[-5px_0_30px_rgba(0,0,0,0.5)] z-[10] transition-transform duration-700 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Title */}
        <div className="w-full h-[55px] bg-gradient-to-r from-[#25C760] to-[#3C8063] text-white uppercase font-semibold shadow-[0_2px_10px_rgba(37,199,96,0.3)] flex items-center justify-between px-5">
          <h5 className="m-0 text-base">My Cart ({items.length})</h5>
          <button onClick={closeCart} className="text-white text-xl cursor-pointer bg-transparent border-none">
            ✕
          </button>
        </div>

        {/* Cart items */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-200px)] mt-2">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <span className="text-xl mb-3 text-[#25C760]">Your cart is empty</span>
              <button
                onClick={closeCart}
                className="mt-3 bg-gradient-to-r from-[#25C760] to-[#3C8063] text-white font-semibold border-none rounded-[5px] px-6 py-3 cursor-pointer hover:opacity-90 transition-all duration-300"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 mb-3 border border-[rgba(139,133,133,0.2)] rounded-[5px] shadow-[0_2px_7px_rgba(139,133,133,0.2)]"
              >
                <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="max-h-[70px] object-contain" />
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <span className="font-bold text-[#25C760] text-sm mb-2">{item.name}</span>
                  <span className="text-[#25C760] text-sm font-bold">
                    {item.currency} {(item.price * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-white text-sm mr-1">Qty:</span>
                    <div className="flex items-center border border-[#25C760] rounded-[5px]">
                      <button
                        className="px-2 text-[#25C760] bg-transparent border-none cursor-pointer text-lg"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="px-3 text-white text-sm">{item.quantity}</span>
                      <button
                        className="px-2 text-[#25C760] bg-transparent border-none cursor-pointer text-lg"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="ml-2 bg-transparent border-none cursor-pointer text-[#25C760]"
                      onClick={() => removeItem(item.id)}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-black border-t border-[rgba(37,199,96,0.2)]">
            <div className="flex justify-end items-end mb-3">
              <span className="text-sm font-bold text-white mr-3">Subtotal:</span>
              <span className="text-xl font-bold text-[#25C760]">
                USD {totalPrice().toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-gradient-to-r from-[#25C760] to-[#3C8063] text-white font-semibold border-none rounded-[5px] py-3 cursor-pointer hover:opacity-90 transition-all duration-300">
              CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
}
