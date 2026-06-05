'use client';

export default function CloseTabButton({ label = '× 閉じて元の画面に戻る' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (window.opener) window.close();
        else window.history.back();
      }}
      className="rounded-full bg-[#25C760] px-8 py-4 text-base font-black text-black transition hover:bg-[#2ed86e]"
    >
      {label}
    </button>
  );
}
