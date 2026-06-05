'use client';

export default function CloseTabButton({ label = '× 閉じて元の画面に戻る' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.close();
        window.setTimeout(() => {
          if (!window.closed) window.history.back();
        }, 120);
      }}
      className="rounded-full bg-[#25C760] px-8 py-4 text-base font-black text-black transition hover:bg-[#2ed86e]"
    >
      {label}
    </button>
  );
}
