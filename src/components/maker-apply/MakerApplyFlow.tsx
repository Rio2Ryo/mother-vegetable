'use client';

import { useMemo, useRef, useState } from 'react';

type RawMaterial = {
  id: string;
  name: string;
  region: string;
  category: '食品向け' | '化粧品向け' | '食品・化粧品向け';
  tags: string[];
  story: string;
  image: string;
};

type ContainerItem = {
  id: string;
  name: string;
  capacity: string;
  tags: string[];
  note: string;
  image: string;
};

const rawMaterials: RawMaterial[] = [
  { id: 'kawazu-salt', name: '河津の平釜塩', region: '河津町', category: '食品向け', tags: ['調味料', '海の素材', '道の駅', '小ロット向け'], story: '海水を平釜で炊き上げた、土地の味が伝わるミネラル塩。', image: '/images/maker-apply/photos/salt.jpg' },
  { id: 'kushimoto-miso', name: '串本の米味噌', region: '串本町', category: '食品向け', tags: ['発酵食品', 'ごはんのお供', '地域工房', '常温'], story: '地域の米と麹で丁寧に仕込む、昔ながらの味噌。', image: '/images/maker-apply/photos/miso.jpg' },
  { id: 'izu-onsen', name: '伊豆の温泉水', region: '伊豆市', category: '化粧品向け', tags: ['スキンケア', '水素材', '保湿感', '観光地'], story: 'やわらかな質感の温泉水。化粧水やミストのベースに。', image: '/images/maker-apply/photos/material-water.svg' },
  { id: 'minami-toner', name: '南伊豆ハーブ化粧水', region: '南伊豆町', category: '化粧品向け', tags: ['化粧水', 'ハーブ', 'スキンケア', '香り'], story: '小さな農園で育つハーブを活かした、やさしい化粧水素材。', image: '/images/maker-apply/photos/material-herb.svg' },
  { id: 'wakayama-shampoo', name: '紀州ゆずシャンプー', region: '和歌山県', category: '化粧品向け', tags: ['ヘアケア', '柑橘', '香り', 'バス用品'], story: 'ゆずの香りを活かした、地域色のあるヘアケア素材。', image: '/images/maker-apply/photos/material-yuzu.svg' },
  { id: 'hokkaido-lip', name: '北海道ミルクリップ', region: '北海道', category: '化粧品向け', tags: ['リップ', '乾燥ケア', '乳素材', 'ギフト'], story: '北海道らしいミルク感をテーマにしたリップ素材。', image: '/images/maker-apply/photos/material-lip.svg' },
  { id: 'komeko-pack', name: '米麹フェイスパック', region: '新潟県', category: '化粧品向け', tags: ['米麹', 'フェイスパック', '発酵', '美容'], story: '米どころの麹文化を美容アイテムに展開できる素材。', image: '/images/maker-apply/photos/koji.jpg' },
  { id: 'shizuoka-wasabi', name: '静岡わさび塩', region: '静岡県', category: '食品向け', tags: ['調味料', 'わさび', '土産', '粉末'], story: '静岡のわさびを活かした、ふりかけ系コラボに向く素材。', image: '/images/maker-apply/photos/material-wasabi.svg' },
  { id: 'olive-oil', name: '小豆島オリーブオイル', region: '小豆島', category: '食品・化粧品向け', tags: ['オイル', '食品', '美容', 'ギフト'], story: '食品にも美容にも展開しやすい、地域性の強いオイル素材。', image: '/images/maker-apply/photos/material-olive.svg' },
];

const containers: ContainerItem[] = [
  { id: 'pouch', name: 'もみもみパウチ', capacity: '30g〜120g', tags: ['食品向け', '化粧品向け', '軽量', '詰替'], note: '味噌・パック・ジェル系に向く柔らかい容器。', image: '/images/maker-apply/photos/container-pouch.svg' },
  { id: 'spray', name: 'スプレーボトル', capacity: '50ml〜150ml', tags: ['化粧品向け', 'ミスト', '液体'], note: '化粧水・温泉水・ヘアミストにおすすめ。', image: '/images/maker-apply/photos/container-spray.svg' },
  { id: 'soy', name: '醤油差しボトル', capacity: '80ml〜200ml', tags: ['食品向け', '液体', '卓上'], note: '醤油・ポン酢・ドレッシング系に向く容器。', image: '/images/maker-apply/photos/container-soy.svg' },
  { id: 'shaker', name: 'ふりかけシェイカー', capacity: '20g〜80g', tags: ['食品向け', '粉末', '卓上'], note: '塩・スパイス・粉末Achieveコラボに。', image: '/images/maker-apply/photos/container-shaker.svg' },
  { id: 'jar', name: 'ガラスジャー', capacity: '80g〜250g', tags: ['食品向け', '化粧品向け', '高級感'], note: '味噌・バーム・クリーム系に使いやすい容器。', image: '/images/maker-apply/photos/container-jar.svg' },
  { id: 'lip', name: 'リップスティック', capacity: '3g〜8g', tags: ['化粧品向け', 'リップ', '携帯'], note: 'リップ・スティックバーム専用。食品不可。', image: '/images/maker-apply/photos/container-lipstick.svg' },
];

const logos = [
  { id: 'logo-1', name: 'Mother Vegetable ロゴ A', src: '/images/maker-apply/logo-1.png' },
  { id: 'logo-2', name: 'Mother Vegetable ロゴ B', src: '/images/maker-apply/logo-2.png' },
  { id: 'logo-3', name: 'Mother Vegetable ロゴ C', src: '/images/maker-apply/logo-3.png' },
  { id: 'logo-4', name: 'Mother Vegetable ロゴ D', src: '/images/maker-apply/logo-4.png' },
];

const regions = ['河津町', '串本町', '伊豆市', '南伊豆町', '和歌山県', '北海道', '新潟県', '静岡県', '小豆島'];
const categories = ['食品向け', '化粧品向け', '食品・化粧品向け'];
const tagOptions = ['道の駅', '発酵食品', '調味料', 'スキンケア', 'ヘアケア', '粉末', '液体', 'ギフト', '地域工房', '小ロット向け'];

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function MakerApplyFlow({ locale }: { locale: string }) {
  const [query, setQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [rawMaterialId, setRawMaterialId] = useState(rawMaterials[0].id);
  const [containerId, setContainerId] = useState(containers[0].id);
  const [capacity, setCapacity] = useState('100ml / 100g');
  const [logoId, setLogoId] = useState(logos[0].id);
  const [logoX, setLogoX] = useState(50);
  const [logoY, setLogoY] = useState(36);
  const [logoScale, setLogoScale] = useState(100);
  const [labelBg, setLabelBg] = useState('#101010');
  const [designMemo, setDesignMemo] = useState('');
  const [productName, setProductName] = useState('');
  const [desiredPrice, setDesiredPrice] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agreements, setAgreements] = useState<string[]>([]);
  const containerSection = useRef<HTMLElement>(null);
  const designSection = useRef<HTMLElement>(null);
  const detailSection = useRef<HTMLElement>(null);
  const confirmSection = useRef<HTMLElement>(null);

  const selectedRaw = rawMaterials.find((item) => item.id === rawMaterialId) ?? rawMaterials[0];
  const selectedContainer = containers.find((item) => item.id === containerId) ?? containers[0];
  const selectedLogo = logos.find((item) => item.id === logoId) ?? logos[0];

  const filteredMaterials = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rawMaterials.filter((item) => {
      const text = [item.name, item.region, item.category, item.story, ...item.tags].join(' ').toLowerCase();
      return (!q || text.includes(q))
        && (selectedRegions.length === 0 || selectedRegions.includes(item.region))
        && (selectedCategories.length === 0 || selectedCategories.includes(item.category))
        && (selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag)));
    });
  }, [query, selectedRegions, selectedCategories, selectedTags]);

  const canSubmit = productName && applicantName && email && phone && address && agreements.length === 4;

  function jumpTo(ref: React.RefObject<HTMLElement | null>) {
    window.setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  function onPreviewPointer(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setLogoX(Math.round(((event.clientX - rect.left) / rect.width) * 100));
    setLogoY(Math.round(((event.clientY - rect.top) / rect.height) * 100));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    window.location.href = `/${locale}/maker/apply/thanks`;
  }

  return (
    <form onSubmit={submit} className="bg-black text-white">
      <section className="relative overflow-hidden px-6 py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,199,96,0.18),transparent_46%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#25C760]">Mazavege Maker Application</p>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">何と何を組み合わせたいですか？</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            まずはJapanese Raw Materialを1つ選び、容器・ロゴ・商品名を決めてアイデアを送信します。審査OKになるまで費用は発生しません。
          </p>
          <div className="mx-auto mt-8 grid max-w-4xl gap-3 text-left md:grid-cols-3">
            {['審査OKまで支払い不要', '初回100個分の製造費を支援', '2週間以内に審査結果を連絡'].map((item) => (
              <div key={item} className="rounded-2xl border border-[#25C760]/30 bg-[#25C760]/10 p-4 text-sm font-bold text-[#25C760]">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-black">検索・絞り込み</h2>
            <label className="mt-5 block text-sm font-bold text-gray-300">地域・素材名で検索</label>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="例：河津町、味噌、化粧水" className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
            <FilterGroup title="地域" items={regions} selected={selectedRegions} onChange={(item) => setSelectedRegions(toggle(selectedRegions, item))} />
            <FilterGroup title="用途" items={categories} selected={selectedCategories} onChange={(item) => setSelectedCategories(toggle(selectedCategories, item))} />
            <FilterGroup title="特徴タグ" items={tagOptions} selected={selectedTags} onChange={(item) => setSelectedTags(toggle(selectedTags, item))} />
          </aside>

          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#25C760]">STEP 01</p>
                <h2 className="mt-2 text-3xl font-black">Japanese Raw Materialを選ぶ</h2>
              </div>
              <p className="text-sm text-gray-400">{filteredMaterials.length}件</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredMaterials.map((item) => (
                <label key={item.id} className={`group cursor-pointer overflow-hidden rounded-[1.75rem] border bg-white/[0.035] transition ${rawMaterialId === item.id ? 'border-[#25C760] shadow-[0_0_24px_rgba(37,199,96,0.25)]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                  <input type="radio" name="rawMaterial" value={item.id} checked={rawMaterialId === item.id} onChange={() => { setRawMaterialId(item.id); jumpTo(containerSection); }} className="sr-only" />
                  <div className="relative h-44 overflow-hidden bg-white/5"><img src={item.image} alt={`${item.name}の素材写真`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" /></div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-black">{item.name}</h3>
                        <p className="mt-1 text-sm text-[#25C760]">{item.region} / {item.category}</p>
                      </div>
                      <span className="rounded-full border border-[#25C760]/40 px-3 py-1 text-xs font-bold text-[#25C760]">選択</span>
                    </div>
                    <p className="mt-4 min-h-16 text-sm leading-6 text-gray-300">{item.story}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">{tag}</span>)}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={containerSection} className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold text-[#25C760]">STEP 02</p>
          <h2 className="mt-2 text-3xl font-black">どんな容器を使いたいですか？</h2>
          <p className="mt-4 max-w-3xl text-gray-300">選んだ素材に合わせて、容器を1つ選んでください。内容量もここで入力します。</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {containers.map((item) => (
              <label key={item.id} className={`cursor-pointer rounded-[1.75rem] border bg-white/[0.04] p-6 transition ${containerId === item.id ? 'border-[#25C760] shadow-[0_0_24px_rgba(37,199,96,0.22)]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                <input type="radio" name="container" value={item.id} checked={containerId === item.id} onChange={() => { setContainerId(item.id); jumpTo(designSection); }} className="sr-only" />
                <div className="relative -mx-6 -mt-6 h-44 overflow-hidden rounded-t-[1.75rem] bg-white/5"><img src={item.image} alt={`${item.name}の容器写真`} className="h-full w-full object-cover transition duration-500 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" /></div>
                <h3 className="mt-5 text-2xl font-black">{item.name}</h3>
                <p className="mt-1 text-sm font-bold text-[#25C760]">目安容量: {item.capacity}</p>
                <p className="mt-4 text-sm leading-6 text-gray-300">{item.note}</p>
                <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">{tag}</span>)}</div>
              </label>
            ))}
          </div>
          <div className="mt-8 max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <label className="text-sm font-bold text-gray-300">希望内容量・容量</label>
            <input value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="例：100ml / 80g / 30包" className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
          </div>
        </div>
      </section>

      <section ref={designSection} className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-bold text-[#25C760]">STEP 03</p>
            <h2 className="mt-2 text-3xl font-black">ロゴとラベルデザイン</h2>
            <p className="mt-4 max-w-3xl text-gray-300">Mother Vegetableロゴを選び、配置したい位置をプレビュー上でクリック/ドラッグしてください。Made in Japanマークはラベル下部に必ず入ります。</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {logos.map((logo) => (
                <label key={logo.id} className={`cursor-pointer rounded-3xl border bg-white/[0.04] p-4 transition ${logoId === logo.id ? 'border-[#25C760]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                  <input type="radio" name="logo" value={logo.id} checked={logoId === logo.id} onChange={() => setLogoId(logo.id)} className="sr-only" />
                  <div className="flex h-32 items-center justify-center rounded-2xl bg-black p-4"><img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" /></div>
                  <p className="mt-3 text-sm font-bold">{logo.name}</p>
                </label>
              ))}
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-gray-300">背景色
                <input type="color" value={labelBg} onChange={(e) => setLabelBg(e.target.value)} className="mt-3 h-12 w-full rounded-xl bg-black" />
              </label>
              <label className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-gray-300">希望デザインがある場合
                <input type="file" className="mt-3 block w-full text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#25C760] file:px-4 file:py-2 file:font-bold file:text-black" />
              </label>
            </div>
            <label className="mt-5 block rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-gray-300">デザイン希望メモ
              <textarea value={designMemo} onChange={(e) => setDesignMemo(e.target.value)} rows={5} placeholder="例：黒背景に金文字、ロゴは中央上、和紙っぽい質感にしたい" className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
            </label>
            <button type="button" onClick={() => jumpTo(detailSection)} className="mt-8 rounded-full bg-[#25C760] px-8 py-4 font-black text-black">商品情報へ進む</button>
          </div>

          <div className="rounded-[2rem] border border-[#25C760]/30 bg-white/[0.04] p-6">
            <h3 className="text-xl font-black">ラベル配置プレビュー</h3>
            <div onPointerDown={onPreviewPointer} onPointerMove={(e) => e.buttons === 1 && onPreviewPointer(e)} className="relative mt-5 h-[520px] cursor-crosshair overflow-hidden rounded-[2rem] border border-white/10" style={{ background: labelBg }}>
              <div className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full border border-white/20 px-4 py-1 text-xs text-white/70">{selectedContainer.name}</div>
              <img src={selectedLogo.src} alt="selected logo" className="absolute -translate-x-1/2 -translate-y-1/2 object-contain" style={{ left: `${logoX}%`, top: `${logoY}%`, width: `${logoScale * 2}px`, maxWidth: '82%', maxHeight: '180px' }} />
              <div className="absolute left-1/2 top-[58%] w-[78%] -translate-x-1/2 text-center">
                <p className="text-2xl font-black">{productName || 'PRODUCT NAME'}</p>
                <p className="mt-2 text-sm text-white/70">{selectedRaw.name} × Mother Vegetable</p>
              </div>
              <MadeInJapanMark />
            </div>
            <div className="mt-5 grid gap-4 text-sm text-gray-300">
              <label>ロゴ横位置: {logoX}%<input type="range" min="10" max="90" value={logoX} onChange={(e) => setLogoX(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
              <label>ロゴ縦位置: {logoY}%<input type="range" min="12" max="72" value={logoY} onChange={(e) => setLogoY(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
              <label>ロゴサイズ: {logoScale}%<input type="range" min="45" max="150" value={logoScale} onChange={(e) => setLogoScale(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
            </div>
          </div>
        </div>
      </section>

      <section ref={detailSection} className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold text-[#25C760]">STEP 04</p>
          <h2 className="mt-2 text-3xl font-black">商品名・希望価格・連絡先</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Input label="希望商品名" value={productName} onChange={setProductName} placeholder="例：Kawazu Mineral Salt Achieve" />
            <Input label="希望販売価格" value={desiredPrice} onChange={setDesiredPrice} placeholder="例：税込 2,980円" note="販売価格は希望通りにならない場合があります。最終価格はMother Vegetable社が決定します。" />
            <Input label="お名前" value={applicantName} onChange={setApplicantName} placeholder="山田 太郎" />
            <Input label="メールアドレス" value={email} onChange={setEmail} placeholder="example@example.com" type="email" />
            <Input label="電話番号" value={phone} onChange={setPhone} placeholder="090-0000-0000" />
            <Input label="住所" value={address} onChange={setAddress} placeholder="東京都..." />
          </div>
          <button type="button" onClick={() => jumpTo(confirmSection)} className="mt-8 rounded-full bg-[#25C760] px-8 py-4 font-black text-black">確認画面へ進む</button>
        </div>
      </section>

      <section ref={confirmSection} className="px-6 py-16 pb-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#25C760]/30 bg-[#25C760]/[0.06] p-6 md:p-10">
          <p className="text-sm font-bold text-[#25C760]">STEP 05</p>
          <h2 className="mt-2 text-3xl font-black">あなたの希望内容はこれでいいですか？</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Summary label="素材" value={`${selectedRaw.name}（${selectedRaw.region}）`} />
            <Summary label="容器・内容量" value={`${selectedContainer.name} / ${capacity}`} />
            <Summary label="ロゴ" value={`${selectedLogo.name} / 位置 ${logoX}%・${logoY}% / サイズ ${logoScale}%`} />
            <Summary label="商品名・希望価格" value={`${productName || '未入力'} / ${desiredPrice || '未入力'}`} />
            <Summary label="お名前" value={applicantName || '未入力'} />
            <Summary label="連絡先" value={`${email || '未入力'} / ${phone || '未入力'}`} />
          </div>
          <div className="mt-8 space-y-3 rounded-3xl border border-white/10 bg-black/40 p-6">
            {[
              '審査OKになるまで月額200ドル（または月額30,000円＋税）の支払いは発生しないことを確認しました。',
              '審査OK後、Maker登録と支払い手続きへ進むことを確認しました。',
              '初回100個分の製造費はMazavege社が支援し、101個以上は販売価格の30%で製造可能であることを確認しました。',
              '8週間で完売できなかった場合、売れ残り分をMakerロイヤリティ10%を差し引いた金額で買い取る条件を確認しました。',
            ].map((item) => (
              <label key={item} className="flex gap-3 text-sm leading-6 text-gray-300">
                <input type="checkbox" checked={agreements.includes(item)} onChange={() => setAgreements(toggle(agreements, item))} className="mt-1 h-5 w-5 accent-[#25C760]" />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <button type="submit" disabled={!canSubmit} className="mt-8 rounded-full bg-[#25C760] px-10 py-4 font-black text-black transition disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300">送信する</button>
          <p className="mt-4 text-sm text-gray-400">送信後、控えメールが届きます。審査結果は原則2週間以内にメールでご連絡します。</p>
        </div>
      </section>
    </form>
  );
}


function MadeInJapanMark() {
  return (
    <div className="absolute bottom-6 left-1/2 w-[74%] -translate-x-1/2 text-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
      <div className="mx-auto flex h-14 w-24 items-center justify-center border-[5px] border-white bg-transparent">
        <span className="block h-7 w-7 rounded-full bg-[#ed1b2f]" />
      </div>
      <div className="mt-3 font-serif text-2xl font-black tracking-[0.12em] md:text-3xl">MADE IN JAPAN</div>
    </div>
  );
}

function FilterGroup({ title, items, selected, onChange }: { title: string; items: string[]; selected: string[]; onChange: (item: string) => void }) {
  return (
    <div className="mt-6">
      <p className="text-sm font-black text-white">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-3 text-sm text-gray-300">
            <input type="checkbox" checked={selected.includes(item)} onChange={() => onChange(item)} className="h-4 w-4 accent-[#25C760]" />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, note, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; note?: string; type?: string }) {
  return (
    <label className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-gray-300">
      {label}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
      {note && <span className="mt-2 block text-xs leading-5 text-gray-500">{note}</span>}
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#25C760]">{label}</p>
      <p className="mt-2 text-gray-200">{value}</p>
    </div>
  );
}
