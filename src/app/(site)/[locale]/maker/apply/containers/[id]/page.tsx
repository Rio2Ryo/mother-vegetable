import { notFound } from 'next/navigation';
import CloseTabButton from '@/components/maker-apply/CloseTabButton';
import { getMakerContainerDetail } from '@/lib/maker-apply-details';

export default async function MakerContainerDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params;
  const container = getMakerContainerDetail(id);
  if (!container) notFound();

  return (
    <main className="min-h-screen bg-[#010100] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-[#25C760]">Container Detail</p>
        <h1 className="mt-3 text-4xl font-black md:text-6xl">{container.name}</h1>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {container.photos.map((photo) => (
            <figure key={photo.src} className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
              <img src={photo.src} alt={`${container.name}の写真`} className="h-80 w-full object-cover" />
              <figcaption className="p-5 text-sm leading-7 text-gray-300">{photo.memo}</figcaption>
            </figure>
          ))}
        </section>

        <section className="mt-10 rounded-[2rem] border border-[#25C760]/25 bg-[#1C1D1D] p-6 md:p-8">
          <h2 className="text-2xl font-black text-[#25C760]">基本情報</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Detail label="容器使用OKジャンル" value={container.okGenres.join(' / ')} />
            <Detail label="容器の素材（本体）" value={container.bodyMaterial} />
            <Detail label="容器の素材（ふた）" value={container.lidMaterial} />
            <Detail label="容器の色" value={container.colors.join(' / ')} />
            <Detail label="表面加工" value={container.finish.join(' / ')} />
            <Detail label="蓋の有無" value={container.hasLid ? '有' : '無'} />
            <Detail label="蓋の色" value={container.lidColors.join(' / ')} />
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-2xl font-black text-[#25C760]">体積 / 寸法 / ラベルの大きさ</h2>
          <div className="mt-6 space-y-4">
            {container.capacitySpecs.map((spec) => (
              <div key={spec.capacity} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-xl font-black">{spec.capacity}</p>
                <p className="mt-2 text-sm text-gray-300">寸法・形状: {spec.dimensions}</p>
                <p className="mt-1 text-sm text-gray-300">ラベルサイズ: {spec.labelSize}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 flex justify-center pb-10">
          <CloseTabButton />
        </div>
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#25C760]">{label}</p>
      <p className="mt-2 text-base font-bold text-white">{value}</p>
    </div>
  );
}
