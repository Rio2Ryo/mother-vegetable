import { notFound } from 'next/navigation';
import CloseTabButton from '@/components/maker-apply/CloseTabButton';
import { getMakerContainerDetail, getMakerRawMaterialDetail } from '@/lib/maker-apply-details';

export default async function MakerRawMaterialDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params;
  const material = getMakerRawMaterialDetail(id);
  if (!material) notFound();
  const allowedContainers = material.allowedContainerIds.map(getMakerContainerDetail).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#010100] px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-[#25C760]">Japanese Raw Material Detail</p>
        <h1 className="mt-3 text-4xl font-black md:text-6xl">{material.name}</h1>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <figure className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
            <img src={material.exteriorImage} alt={`${material.name}の商品外観写真`} className="h-80 w-full object-cover" />
            <figcaption className="p-5 text-sm leading-7 text-gray-300">商品外観写真</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
            <img src={material.insideImage} alt={`${material.name}の中身の写真`} className="h-80 w-full object-cover" />
            <figcaption className="p-5 text-sm leading-7 text-gray-300">商品の中身の写真</figcaption>
          </figure>
        </section>

        <section className="mt-10 rounded-[2rem] border border-[#25C760]/25 bg-[#1C1D1D] p-6 md:p-8">
          <h2 className="text-2xl font-black text-[#25C760]">基本情報</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Detail label="商品ジャンル1" value={material.genre1} />
            <Detail label="商品ジャンル2" value={material.genre2} />
            <Detail label="生産会社" value={material.producer} />
            <Detail label="生産地" value={material.productionArea} />
            <Detail label="成分" value={material.ingredients} />
            <Detail label="1つ当たりの最大製造可能量" value={material.maxProductionPerUnit} />
            <Detail label="他商品との組み合わせの可否" value={material.mixRule} />
            <Detail label="形状の特徴・備考" value={material.shapeNotes} />
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-2xl font-black text-[#25C760]">使用できる容器</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {allowedContainers.map((container) => container && (
              <div key={container.id} className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <img src={container.photos[0]?.src} alt={`${container.name}の容器写真`} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <p className="text-lg font-black">{container.name}</p>
                  <p className="mt-2 text-sm text-gray-300">使用OKジャンル: {container.okGenres.join(' / ')}</p>
                </div>
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
