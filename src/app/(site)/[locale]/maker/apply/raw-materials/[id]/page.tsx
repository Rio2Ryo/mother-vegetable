import { notFound } from 'next/navigation';
import CloseTabButton from '@/components/maker-apply/CloseTabButton';
import { getMakerContainerDetail, getMakerRawMaterialDetail } from '@/lib/maker-apply-details';

export default async function MakerRawMaterialDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params;
  const material = getMakerRawMaterialDetail(id);
  if (!material) notFound();
  const allowedContainers = material.allowedContainerIds.map(getMakerContainerDetail).filter(Boolean);
  const isFood = material.genre1.includes('食品');
  const isCosmetic = material.genre1.includes('化粧品');
  const nutrition = getNutritionFacts(material.genre2);

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
            <Detail label="他商品との組み合わせの可否" value={material.mixRule} />
            <Detail label="形状の特徴・備考" value={material.shapeNotes} />
          </div>
        </section>

        {isFood && (
          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-2xl font-black text-[#25C760]">食品表示情報</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Detail label="販売者" value={material.producer} />
              <Detail label="製造所" value={`${material.productionArea} 製造所`} />
              <Detail label="内容量" value={material.maxProductionPerUnit} />
              <Detail label="1つ当たりの最大製造可能量" value={material.maxProductionPerUnit} />
              <Detail label="原材料名" value={material.ingredients} />
            </div>
            <NutritionFacts nutrition={nutrition} />
          </section>
        )}

        {isCosmetic && (
          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-2xl font-black text-[#25C760]">化粧品表示情報</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Detail label="全成分" value={material.ingredients} />
              <Detail label="内容量" value={material.maxProductionPerUnit} />
              <Detail label="1つ当たりの最大製造可能量" value={material.maxProductionPerUnit} />
              <Detail label="製造販売元 会社名" value={material.producer} />
              <Detail label="製造販売元 住所" value={`${material.productionArea}（詳細住所は商品ごとに記載）`} />
              <Detail label="製造番号または製造記号（ロット番号）" value="商品ごとに記載" />
              <Detail label="使用方法" value={getCosmeticUsage(material.genre2)} />
              <Detail label="使用上の注意" value="お肌に異常が生じていないかよく注意して使用してください。傷・はれもの・湿しん等、異常のある部位には使用しないでください。" />
            </div>
          </section>
        )}

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


type Nutrition = {
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
  saltEquivalent: string;
};

function NutritionFacts({ nutrition }: { nutrition: Nutrition }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#25C760]">栄養成分表示（100g当たり）</p>
      <div className="mt-4 grid gap-3 text-sm text-white md:grid-cols-2">
        <NutritionRow label="熱量" value={`${nutrition.calories} kcal`} />
        <NutritionRow label="たんぱく質" value={`${nutrition.protein} g`} />
        <NutritionRow label="脂質" value={`${nutrition.fat} g`} />
        <NutritionRow label="炭水化物" value={`${nutrition.carbs} g`} />
        <NutritionRow label="食塩相当量" value={`${nutrition.saltEquivalent} g`} />
      </div>
    </div>
  );
}

function NutritionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.04] px-4 py-3">
      <span className="text-gray-300">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  );
}

function getNutritionFacts(genre2: string): Nutrition {
  if (genre2.includes('塩')) return { calories: '0', protein: '0', fat: '0', carbs: '0', saltEquivalent: '92.0' };
  if (genre2.includes('味噌')) return { calories: '210', protein: '9.5', fat: '5.0', carbs: '31.0', saltEquivalent: '9.8' };
  if (genre2.includes('オイル')) return { calories: '900', protein: '0', fat: '100.0', carbs: '0', saltEquivalent: '0' };
  return { calories: '-', protein: '-', fat: '-', carbs: '-', saltEquivalent: '-' };
}

function getCosmeticUsage(genre2: string) {
  if (genre2.includes('化粧水')) return '適量を手またはコットンに取り、肌になじませてください。';
  if (genre2.includes('シャンプー')) return '髪と地肌をよく濡らした後、適量を手に取り泡立てて洗い、その後よくすすいでください。';
  if (genre2.includes('リップ')) return '適量を唇に直接塗布してください。';
  if (genre2.includes('フェイスパック')) return '適量を顔全体にのばし、使用後は水またはぬるま湯で洗い流してください。';
  if (genre2.includes('オイル')) return '適量を手に取り、肌や髪になじませてください。';
  return '適量を取り、使用部位になじませてください。';
}
