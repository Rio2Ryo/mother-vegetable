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

type ContainerVariant = {
  id: string;
  name: string;
  capacity: string;
  color: string;
  shape: string;
  spec: string;
  material: string;
  image: string;
  labelSize: { widthMm: number; heightMm: number };
};

type ContainerItem = {
  id: string;
  name: string;
  capacity: string;
  tags: string[];
  note: string;
  image: string;
  variants: ContainerVariant[];
};

const rawMaterials: RawMaterial[] = [
  { id: 'kawazu-salt', name: '河津の平釜塩', region: '河津町', category: '食品向け', tags: ['調味料', '海の素材'], story: '海水を平釜で炊き上げた、土地の味が伝わるミネラル塩。', image: '/images/maker-apply/raw-materials/kawazu-salt.webp' },
  { id: 'kushimoto-miso', name: '串本の金山寺味噌', region: '串本町', category: '食品向け', tags: ['発酵食品', 'ごはんのお供', '常温'], story: '地域の米と麹で丁寧に仕込む、昔ながらの金山寺味噌。', image: '/images/maker-apply/raw-materials/kushimoto-kinzanji-miso.webp' },
  { id: 'izu-onsen', name: '伊豆の温泉化粧水', region: '伊豆市', category: '化粧品向け', tags: ['スキンケア', '水素材', '保湿感', '観光地'], story: 'やわらかな質感の温泉水を活かした、化粧水やミストのベースに。', image: '/images/maker-apply/raw-materials/izu-onsen-toner.webp' },
  { id: 'minami-toner', name: '南伊豆ハーブ化粧水', region: '南伊豆町', category: '化粧品向け', tags: ['化粧水', 'ハーブ', 'スキンケア', '香り'], story: '小さな農園で育つハーブを活かした、やさしい化粧水素材。', image: '/images/maker-apply/raw-materials/minami-izu-herb-toner.webp' },
  { id: 'wakayama-shampoo', name: '紀州ゆずシャンプー', region: '和歌山県', category: '化粧品向け', tags: ['ヘアケア', '柑橘', '香り', 'バス用品'], story: 'ゆずの香りを活かした、地域色のあるヘアケア素材。', image: '/images/maker-apply/raw-materials/kishu-yuzu-shampoo.webp' },
  { id: 'hokkaido-lip', name: '北海道ミルクリップ', region: '北海道', category: '化粧品向け', tags: ['リップ', '乾燥ケア', '乳素材'], story: '北海道らしいミルク感をテーマにしたリップ素材。', image: '/images/maker-apply/raw-materials/hokkaido-milk-lip.webp' },
  { id: 'komeko-pack', name: '米麹フェイスパック', region: '新潟県', category: '化粧品向け', tags: ['米麹', 'フェイスパック', '発酵', '美容'], story: '米どころの麹文化を美容アイテムに展開できる素材。', image: '/images/maker-apply/raw-materials/komeko-face-pack.webp' },
  { id: 'shizuoka-wasabi', name: '静岡わさび塩', region: '静岡県', category: '食品向け', tags: ['調味料', 'わさび', '土産', '粉末'], story: '静岡のわさびを活かした、ふりかけ系コラボに向く素材。', image: '/images/maker-apply/raw-materials/shizuoka-wasabi-salt.webp' },
  { id: 'olive-oil', name: '小豆島オリーブオイル', region: '小豆島', category: '食品・化粧品向け', tags: ['オイル', '食品', '美容'], story: '食品にも美容にも展開しやすい、地域性の強いオイル素材。', image: '/images/maker-apply/raw-materials/shodoshima-olive-oil.webp' },
];

const containers: ContainerItem[] = [
  {
    id: 'pouch',
    name: 'もみもみパウチ',
    capacity: '30g〜120g',
    tags: ['食品向け', '化粧品向け', '軽量', '詰替'],
    note: '味噌・パック・ジェル系に向く柔らかい容器。',
    image: '/images/maker-apply/photos/container-pouch.svg',
    variants: [
      { id: 'pouch-30-clear', name: '小型クリアパウチ', capacity: '30g', color: '透明', shape: 'スタンド小型', spec: 'スクリューキャップ', material: '食品・化粧品対応フィルム', image: '/images/maker-apply/photos/container-pouch.svg', labelSize: { widthMm: 70, heightMm: 80 } },
      { id: 'pouch-50-white', name: '白マットパウチ', capacity: '50g', color: '白マット', shape: 'スタンド標準', spec: 'スパウト付き', material: '遮光フィルム', image: '/images/maker-apply/photos/container-pouch.svg', labelSize: { widthMm: 80, heightMm: 90 } },
      { id: 'pouch-80-kraft', name: 'クラフト調パウチ', capacity: '80g', color: 'クラフト', shape: '横広スタンド', spec: 'チャック付き', material: '食品対応フィルム', image: '/images/maker-apply/photos/container-pouch.svg', labelSize: { widthMm: 95, heightMm: 85 } },
      { id: 'pouch-100-black', name: '黒マットパウチ', capacity: '100g', color: '黒マット', shape: 'スクエア', spec: 'スパウト付き', material: '遮光フィルム', image: '/images/maker-apply/photos/container-pouch.svg', labelSize: { widthMm: 100, heightMm: 100 } },
      { id: 'pouch-120-clear', name: '大容量クリアパウチ', capacity: '120g', color: '透明', shape: '縦長スタンド', spec: 'スパウト付き', material: '食品・化粧品対応フィルム', image: '/images/maker-apply/photos/container-pouch.svg', labelSize: { widthMm: 100, heightMm: 120 } },
    ],
  },
  {
    id: 'spray',
    name: 'スプレーボトル',
    capacity: '30ml〜200ml',
    tags: ['化粧品向け', 'ミスト', '液体'],
    note: '化粧水・温泉水・ヘアミストにおすすめ。',
    image: '/images/maker-apply/photos/container-spray.svg',
    variants: [
      { id: 'spray-30-clear-push', name: '30ml クリアミスト', capacity: '30ml', color: '透明', shape: 'スリム円柱', spec: 'プッシュミスト', material: 'PET', image: '/images/maker-apply/photos/container-spray.svg', labelSize: { widthMm: 32, heightMm: 58 } },
      { id: 'spray-50-clear-push', name: '50ml クリアミスト', capacity: '50ml', color: '透明', shape: '丸型', spec: 'プッシュミスト', material: 'PET', image: '/images/maker-apply/photos/container-spray.svg', labelSize: { widthMm: 40, heightMm: 72 } },
      { id: 'spray-50-amber-push', name: '50ml 遮光ブラウン', capacity: '50ml', color: '遮光ブラウン', shape: '丸型', spec: 'プッシュミスト', material: '遮光PET', image: '/images/maker-apply/photos/container-spray.svg', labelSize: { widthMm: 40, heightMm: 72 } },
      { id: 'spray-80-frost-push', name: '80ml フロストボトル', capacity: '80ml', color: '半透明フロスト', shape: '肩丸型', spec: 'プッシュミスト', material: 'PET', image: '/images/maker-apply/photos/container-spray.svg', labelSize: { widthMm: 45, heightMm: 82 } },
      { id: 'spray-100-white-push', name: '100ml 白ボトル', capacity: '100ml', color: '白', shape: '丸型', spec: 'プッシュミスト', material: 'HDPE', image: '/images/maker-apply/photos/container-spray.svg', labelSize: { widthMm: 48, heightMm: 90 } },
      { id: 'spray-100-black-push', name: '100ml 黒マット', capacity: '100ml', color: '黒マット', shape: '丸型', spec: 'プッシュミスト', material: 'HDPE', image: '/images/maker-apply/photos/container-spray.svg', labelSize: { widthMm: 48, heightMm: 90 } },
      { id: 'spray-120-amber-trigger', name: '120ml 遮光トリガー', capacity: '120ml', color: '遮光ブラウン', shape: '肩丸型', spec: 'トリガースプレー', material: '遮光PET', image: '/images/maker-apply/photos/container-spray.svg', labelSize: { widthMm: 52, heightMm: 95 } },
      { id: 'spray-150-clear-trigger', name: '150ml クリアトリガー', capacity: '150ml', color: '透明', shape: 'ワイド円柱', spec: 'トリガースプレー', material: 'PET', image: '/images/maker-apply/photos/container-spray.svg', labelSize: { widthMm: 58, heightMm: 105 } },
      { id: 'spray-150-white-trigger', name: '150ml 白トリガー', capacity: '150ml', color: '白', shape: 'ワイド円柱', spec: 'トリガースプレー', material: 'HDPE', image: '/images/maker-apply/photos/container-spray.svg', labelSize: { widthMm: 58, heightMm: 105 } },
      { id: 'spray-200-amber-trigger', name: '200ml 遮光大容量', capacity: '200ml', color: '遮光ブラウン', shape: 'ワイド円柱', spec: 'トリガースプレー', material: '遮光PET', image: '/images/maker-apply/photos/container-spray.svg', labelSize: { widthMm: 65, heightMm: 115 } },
    ],
  },
  {
    id: 'soy',
    name: '醤油差しボトル',
    capacity: '80ml〜300ml',
    tags: ['食品向け', '液体', '卓上'],
    note: '醤油・ポン酢・ドレッシング系に向く容器。',
    image: '/images/maker-apply/photos/container-soy.svg',
    variants: [
      { id: 'soy-80-clear', name: '80ml 卓上クリア', capacity: '80ml', color: '透明', shape: '丸型卓上', spec: '細口キャップ', material: 'ガラス', image: '/images/maker-apply/photos/container-soy.svg', labelSize: { widthMm: 45, heightMm: 65 } },
      { id: 'soy-120-amber', name: '120ml 遮光ガラス', capacity: '120ml', color: '遮光ブラウン', shape: '丸型', spec: '細口キャップ', material: '遮光ガラス', image: '/images/maker-apply/photos/container-soy.svg', labelSize: { widthMm: 50, heightMm: 78 } },
      { id: 'soy-180-clear', name: '180ml スリムボトル', capacity: '180ml', color: '透明', shape: 'スリム円柱', spec: '液だれ防止口', material: 'ガラス', image: '/images/maker-apply/photos/container-soy.svg', labelSize: { widthMm: 55, heightMm: 92 } },
      { id: 'soy-300-amber', name: '300ml 遮光ボトル', capacity: '300ml', color: '遮光ブラウン', shape: 'ワイド円柱', spec: 'スクリューキャップ', material: '遮光ガラス', image: '/images/maker-apply/photos/container-soy.svg', labelSize: { widthMm: 70, heightMm: 110 } },
    ],
  },
  {
    id: 'shaker',
    name: 'ふりかけシェイカー',
    capacity: '20g〜120g',
    tags: ['食品向け', '粉末', '卓上'],
    note: '塩・スパイス・粉末Achieveコラボに。',
    image: '/images/maker-apply/photos/container-shaker.svg',
    variants: [
      { id: 'shaker-20-clear', name: '20g ミニシェイカー', capacity: '20g', color: '透明', shape: '小型円柱', spec: '3穴キャップ', material: 'PET', image: '/images/maker-apply/photos/container-shaker.svg', labelSize: { widthMm: 36, heightMm: 48 } },
      { id: 'shaker-50-clear', name: '50g 標準シェイカー', capacity: '50g', color: '透明', shape: '円柱', spec: '7穴キャップ', material: 'PET', image: '/images/maker-apply/photos/container-shaker.svg', labelSize: { widthMm: 50, heightMm: 70 } },
      { id: 'shaker-80-white', name: '80g 白キャップ', capacity: '80g', color: '透明＋白', shape: 'ワイド円柱', spec: '広口キャップ', material: 'PET', image: '/images/maker-apply/photos/container-shaker.svg', labelSize: { widthMm: 58, heightMm: 78 } },
      { id: 'shaker-120-black', name: '120g 黒キャップ', capacity: '120g', color: '透明＋黒', shape: 'ワイド円柱', spec: '広口キャップ', material: 'PET', image: '/images/maker-apply/photos/container-shaker.svg', labelSize: { widthMm: 66, heightMm: 90 } },
    ],
  },
  {
    id: 'jar',
    name: 'ガラスジャー',
    capacity: '50g〜300g',
    tags: ['食品向け', '化粧品向け', '高級感'],
    note: '味噌・バーム・クリーム系に使いやすい容器。',
    image: '/images/maker-apply/photos/container-jar.svg',
    variants: [
      { id: 'jar-50-clear', name: '50g クリアジャー', capacity: '50g', color: '透明', shape: '低型丸', spec: 'スクリュー蓋', material: 'ガラス', image: '/images/maker-apply/photos/container-jar.svg', labelSize: { widthMm: 48, heightMm: 50 } },
      { id: 'jar-80-amber', name: '80g 遮光ジャー', capacity: '80g', color: '遮光ブラウン', shape: '丸型', spec: 'スクリュー蓋', material: '遮光ガラス', image: '/images/maker-apply/photos/container-jar.svg', labelSize: { widthMm: 60, heightMm: 80 } },
      { id: 'jar-120-frost', name: '120g フロストジャー', capacity: '120g', color: '半透明フロスト', shape: '丸型', spec: 'アルミ蓋', material: 'ガラス', image: '/images/maker-apply/photos/container-jar.svg', labelSize: { widthMm: 68, heightMm: 82 } },
      { id: 'jar-200-clear', name: '200g ワイドジャー', capacity: '200g', color: '透明', shape: '広口ワイド', spec: 'スクリュー蓋', material: 'ガラス', image: '/images/maker-apply/photos/container-jar.svg', labelSize: { widthMm: 78, heightMm: 92 } },
      { id: 'jar-300-amber', name: '300g 遮光ワイド', capacity: '300g', color: '遮光ブラウン', shape: '広口ワイド', spec: 'スクリュー蓋', material: '遮光ガラス', image: '/images/maker-apply/photos/container-jar.svg', labelSize: { widthMm: 90, heightMm: 105 } },
    ],
  },
  {
    id: 'lip',
    name: 'リップスティック',
    capacity: '3g〜15g',
    tags: ['化粧品向け', 'リップ', '携帯'],
    note: 'リップ・スティックバーム専用。食品不可。',
    image: '/images/maker-apply/photos/container-lipstick.svg',
    variants: [
      { id: 'lip-3-white', name: '3g 白スティック', capacity: '3g', color: '白', shape: '細身スティック', spec: '繰り出し式', material: 'PP', image: '/images/maker-apply/photos/container-lipstick.svg', labelSize: { widthMm: 24, heightMm: 42 } },
      { id: 'lip-5-clear', name: '5g クリアキャップ', capacity: '5g', color: '白＋透明', shape: '標準スティック', spec: '繰り出し式', material: 'PP', image: '/images/maker-apply/photos/container-lipstick.svg', labelSize: { widthMm: 28, heightMm: 55 } },
      { id: 'lip-8-black', name: '8g 黒マット', capacity: '8g', color: '黒マット', shape: '太型スティック', spec: '繰り出し式', material: 'PP', image: '/images/maker-apply/photos/container-lipstick.svg', labelSize: { widthMm: 34, heightMm: 58 } },
      { id: 'lip-15-jar', name: '15g ミニバーム容器', capacity: '15g', color: '透明', shape: 'ミニジャー', spec: '指塗りタイプ', material: 'PET', image: '/images/maker-apply/photos/container-jar.svg', labelSize: { widthMm: 40, heightMm: 36 } },
    ],
  },
];

const logos = [
  { id: 'logo-1', name: 'Mother Vegetable ロゴ A', src: '/images/maker-apply/logo-1.png' },
  { id: 'logo-2', name: 'Mother Vegetable ロゴ B', src: '/images/maker-apply/logo-2.png' },
  { id: 'logo-3', name: 'Mother Vegetable ロゴ C', src: '/images/maker-apply/logo-3.png' },
  { id: 'logo-4', name: 'Mother Vegetable ロゴ D', src: '/images/maker-apply/logo-4.png' },
];

const regions = ['河津町', '串本町', '伊豆市', '南伊豆町', '和歌山県', '北海道', '新潟県', '静岡県', '小豆島'];
const categories = ['食品向け', '化粧品向け', '食品・化粧品向け'];
const tagOptions = ['発酵食品', '調味料', 'スキンケア', 'ヘアケア', '粉末', '液体'];

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function MakerApplyFlow({ locale }: { locale: string }) {
  const [query, setQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [rawMaterialId, setRawMaterialId] = useState('');
  const [containerId, setContainerId] = useState('');
  const [containerVariantId, setContainerVariantId] = useState('');
  const [capacity, setCapacity] = useState('');
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [logoId, setLogoId] = useState(logos[0].id);
  const [logoX, setLogoX] = useState(50);
  const [logoY, setLogoY] = useState(36);
  const [logoScale, setLogoScale] = useState(100);
  const [madeMarkX, setMadeMarkX] = useState(50);
  const [madeMarkY, setMadeMarkY] = useState(86);
  const [madeMarkScale, setMadeMarkScale] = useState(100);
  const [labelBg, setLabelBg] = useState('#101010');
  const [designMode, setDesignMode] = useState<'manual' | 'ai'>('manual');
  const [makerStory, setMakerStory] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [aiConcept, setAiConcept] = useState('');
  const [designMemo, setDesignMemo] = useState('');
  const [productName, setProductName] = useState('');
  const [desiredPrice, setDesiredPrice] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agreements, setAgreements] = useState<string[]>([]);
  const containerSection = useRef<HTMLElement>(null);
  const containerVariantSection = useRef<HTMLDivElement>(null);
  const designSection = useRef<HTMLElement>(null);
  const detailSection = useRef<HTMLElement>(null);
  const confirmSection = useRef<HTMLElement>(null);

  const selectedRaw = rawMaterials.find((item) => item.id === rawMaterialId) ?? rawMaterials[0];
  const selectedContainer = containers.find((item) => item.id === containerId) ?? containers[0];
  const selectedLogo = logos.find((item) => item.id === logoId) ?? logos[0];
  const selectedContainerVariant = selectedContainer.variants.find((item) => item.id === containerVariantId) ?? selectedContainer.variants[0];
  const selectedLabelSize = selectedContainerVariant.labelSize;

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

  function jumpTo(ref: React.RefObject<HTMLElement | HTMLDivElement | null>, delay = 80) {
    window.setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), delay);
  }

  function getPointerPercent(event: React.PointerEvent<HTMLDivElement>, relativeTo: HTMLElement = event.currentTarget) {
    const rect = relativeTo.getBoundingClientRect();
    const x = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((event.clientY - rect.top) / rect.height) * 100);
    return {
      x: Math.min(95, Math.max(5, x)),
      y: Math.min(95, Math.max(5, y)),
    };
  }

  function onPreviewPointer(event: React.PointerEvent<HTMLDivElement>) {
    const point = getPointerPercent(event);
    setLogoX(point.x);
    setLogoY(point.y);
  }

  function onMadeMarkPointer(event: React.PointerEvent<HTMLDivElement>) {
    event.stopPropagation();
    const labelArea = event.currentTarget.parentElement;
    if (!labelArea) return;
    const point = getPointerPercent(event, labelArea);
    setMadeMarkX(point.x);
    setMadeMarkY(point.y);
  }

  function generateAiLabelDesign() {
    const name = productName.trim() || selectedRaw.name;
    const audience = targetAudience.trim() || '地域の背景や作り手の想いに共感してくれる人';
    const story = makerStory.trim() || selectedRaw.story;
    const suggestedBg = selectedRaw.category.includes('化粧品') ? '#15231d' : '#101010';
    setDesignMode('ai');
    if (!productName.trim()) setProductName(name);
    setLabelBg(suggestedBg);
    setLogoX(50);
    setLogoY(16);
    setLogoScale(74);
    setMadeMarkX(50);
    setMadeMarkY(90);
    setMadeMarkScale(78);
    setAiConcept(`${name}は、${audience}に届けたい商品です。${story} 余白を活かした上品な黒基調で、素材名・地域性・自然感が一目で伝わるラベルにします。`);
    setDesignMemo(`AI提案: ${name} / 対象: ${audience} / ストーリー: ${story}`);
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
          <h1 className="mt-4 text-4xl font-black md:text-6xl">いますぐあなたの夢を叶えよう</h1>
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
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 border-b border-white/10 pb-6">
            <p className="text-sm font-bold text-[#25C760]">STEP 01</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">Japanese Raw Materialを選ぶ</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 lg:sticky lg:top-24">
              <h3 className="text-xl font-black">検索・絞り込み</h3>
              <label className="mt-5 block text-sm font-bold text-gray-300">地域・素材名で検索</label>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="例：河津町、味噌、化粧水" className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
              <FilterGroup title="地域" items={regions} selected={selectedRegions} onChange={(item) => setSelectedRegions(toggle(selectedRegions, item))} />
              <FilterGroup title="用途" items={categories} selected={selectedCategories} onChange={(item) => setSelectedCategories(toggle(selectedCategories, item))} />
              <FilterGroup title="特徴タグ" items={tagOptions} selected={selectedTags} onChange={(item) => setSelectedTags(toggle(selectedTags, item))} />
          </aside>

          <div>
            <div className="mb-6 flex justify-end">
              <p className="text-sm text-gray-400">{filteredMaterials.length}件</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredMaterials.map((item) => (
                <label key={item.id} className={`group cursor-pointer overflow-hidden rounded-[1.75rem] border bg-white/[0.035] transition ${rawMaterialId === item.id ? 'border-[#25C760] shadow-[0_0_24px_rgba(37,199,96,0.25)]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                  <input type="radio" name="rawMaterial" value={item.id} checked={rawMaterialId === item.id} onChange={() => { setRawMaterialId(item.id); setContainerId(''); setContainerVariantId(''); setCapacity(''); setDetailOpen(false); setConfirmOpen(false); jumpTo(containerSection); }} className="sr-only" />
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
        </div>
      </section>

      {rawMaterialId && (
      <section ref={containerSection} className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold text-[#25C760]">STEP 02</p>
          <h2 className="mt-2 text-3xl font-black">どんな容器を使いたいですか？</h2>
          <p className="mt-4 max-w-3xl text-gray-300">選んだ素材に合わせて、まず容器の形状を1つ選んでください。形状を選ぶと、次にサイズ・色・仕様の候補が表示されます。</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {containers.map((item) => (
              <label key={item.id} className={`cursor-pointer rounded-[1.75rem] border bg-white/[0.04] p-6 transition ${containerId === item.id ? 'border-[#25C760] shadow-[0_0_24px_rgba(37,199,96,0.22)]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                <input type="radio" name="container" value={item.id} checked={containerId === item.id} onChange={() => { setContainerId(item.id); setContainerVariantId(''); setCapacity(''); setDetailOpen(false); setConfirmOpen(false); jumpTo(containerVariantSection, 120); }} className="sr-only" />
                <div className="relative -mx-6 -mt-6 h-44 overflow-hidden rounded-t-[1.75rem] bg-white/5"><img src={item.image} alt={`${item.name}の容器写真`} className="h-full w-full object-cover transition duration-500 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" /></div>
                <h3 className="mt-5 text-2xl font-black">{item.name}</h3>
                <p className="mt-1 text-sm font-bold text-[#25C760]">目安容量: {item.capacity}</p>
                <p className="mt-2 inline-flex rounded-full border border-[#25C760]/35 px-3 py-1 text-xs font-bold text-[#25C760]">{item.variants.length}候補から選択</p>
                <p className="mt-4 text-sm leading-6 text-gray-300">{item.note}</p>
                <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">{tag}</span>)}</div>
              </label>
            ))}
          </div>
          {containerId && (
          <div ref={containerVariantSection} className="mt-12 scroll-mt-24 rounded-[2rem] border border-[#25C760]/25 bg-[#25C760]/[0.04] p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold text-[#25C760]">容器の詳細仕様</p>
                <h3 className="mt-2 text-2xl font-black">{selectedContainer.name}の候補を選ぶ</h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300">
                  容量、色、形状、スプレー方式、遮光素材などを写真と数字で確認して選べます。写真は仮登録画像なので、正式な容器写真に差し替え可能です。
                </p>
              </div>
              <span className="rounded-full border border-[#25C760]/35 px-4 py-2 text-sm font-bold text-[#25C760]">{selectedContainer.variants.length}候補</span>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {selectedContainer.variants.map((variant) => (
                <label key={variant.id} className={`cursor-pointer overflow-hidden rounded-[1.5rem] border bg-black/35 transition ${containerVariantId === variant.id ? 'border-[#25C760] shadow-[0_0_22px_rgba(37,199,96,0.22)]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                  <input
                    type="radio"
                    name="containerVariant"
                    value={variant.id}
                    checked={containerVariantId === variant.id}
                    onChange={() => { setContainerVariantId(variant.id); setCapacity(variant.capacity); setDetailOpen(false); setConfirmOpen(false); jumpTo(designSection); }}
                    className="sr-only"
                  />
                  <div className="relative h-36 overflow-hidden bg-white/5">
                    <img src={variant.image} alt={`${variant.name}の容器写真`} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-black">{variant.name}</h4>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-300">
                      <Spec label="容量" value={variant.capacity} />
                      <Spec label="色" value={variant.color} />
                      <Spec label="形状" value={variant.shape} />
                      <Spec label="仕様" value={variant.spec} />
                      <Spec label="素材" value={variant.material} />
                      <Spec label="ラベル" value={`${variant.labelSize.widthMm}×${variant.labelSize.heightMm}mm`} />
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          )}

          {containerVariantId && (
          <div className="mt-8 max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <label className="text-sm font-bold text-gray-300">希望内容量・容量</label>
            <input value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="例：100ml / 80g / 30包" className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
          </div>
          )}
        </div>
      </section>
      )}

      {containerVariantId && (
      <section ref={designSection} className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-bold text-[#25C760]">STEP 03</p>
            <h2 className="mt-2 text-3xl font-black">ロゴとラベルデザイン</h2>
            <p className="mt-4 max-w-3xl text-gray-300">最初に使うMother Vegetableロゴを選びます。自分で調整することも、商品名・ストーリーからAIにラベル案を作ってもらうこともできます。Made in Japanマークは必ず入ります。</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {logos.map((logo) => (
                <label key={logo.id} className={`cursor-pointer rounded-3xl border bg-white/[0.04] p-4 transition ${logoId === logo.id ? 'border-[#25C760]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                  <input type="radio" name="logo" value={logo.id} checked={logoId === logo.id} onChange={() => setLogoId(logo.id)} className="sr-only" />
                  <div className="flex h-32 items-center justify-center rounded-2xl bg-black p-4"><img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" /></div>
                  <p className="mt-3 text-sm font-bold">{logo.name}</p>
                </label>
              ))}
            </div>
            <div className="mt-8 rounded-[2rem] border border-[#25C760]/25 bg-[#25C760]/[0.05] p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-bold text-[#25C760]">AIラベル提案</p>
                  <h3 className="mt-2 text-2xl font-black">デザインが苦手な人はAIに任せる</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-300">
                    先に選んだMother Vegetableロゴと、必須のMade in Japanマークを使って、商品名・使ってほしい人・ストーリーからラベル案を作ります。
                  </p>
                </div>
                <div className="rounded-full border border-[#25C760]/35 px-4 py-2 text-xs font-bold text-[#25C760]">ロゴ選択後に作成</div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="text-sm font-bold text-gray-300">この商品をどんな人に使ってもらいたいですか？
                  <textarea value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} rows={4} placeholder="例：自然素材が好きな人、地域の物語を大切にする人、毎日の食卓を少し特別にしたい人" className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
                </label>
                <label className="text-sm font-bold text-gray-300">作り手・商品のストーリー
                  <textarea value={makerStory} onChange={(e) => setMakerStory(e.target.value)} rows={4} placeholder="例：河津の海水を丁寧に炊き上げ、土地の記憶が伝わる塩にしたい" className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
                </label>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" onClick={generateAiLabelDesign} className="rounded-full bg-[#25C760] px-6 py-3 font-black text-black">AIにラベル案を作ってもらう</button>
                <button type="button" onClick={() => setDesignMode('manual')} className="rounded-full border border-white/20 px-6 py-3 font-bold text-white hover:border-[#25C760]">自分で調整する</button>
              </div>
              {aiConcept && (
                <div className="mt-5 rounded-3xl border border-white/10 bg-black/35 p-5 text-sm leading-7 text-gray-200">
                  <p className="font-black text-[#25C760]">AI提案コンセプト</p>
                  <p className="mt-2">{aiConcept}</p>
                </div>
              )}
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
              <textarea value={designMemo} onChange={(e) => setDesignMemo(e.target.value)} rows={5} placeholder="例：黒背景に白文字、素材名を大きく、地域の物語が伝わる上品な雰囲気にしたい" className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
            </label>
            <button type="button" onClick={() => { setDetailOpen(true); setConfirmOpen(false); jumpTo(detailSection); }} className="mt-8 rounded-full bg-[#25C760] px-8 py-4 font-black text-black">商品情報へ進む</button>
          </div>

          <div className="rounded-[2rem] border border-[#25C760]/30 bg-white/[0.04] p-6">
            <h3 className="text-xl font-black">ラベル配置プレビュー</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#25C760]">
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">{selectedContainer.name}</span>
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">{selectedContainerVariant.name}</span>
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">ラベル範囲: 横{selectedLabelSize.widthMm}mm × 縦{selectedLabelSize.heightMm}mm</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-gray-400">
              容器を変えると、この作業エリアの縦横比もラベル範囲に合わせて変わります。
            </p>
            <div className="mt-5 rounded-[2rem] border border-white/10 bg-black/35 p-5">
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-black">完成イメージプレビュー</h4>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-gray-300">{designMode === 'ai' ? 'AI提案' : '手動デザイン'}</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-gray-400">実写容器写真が登録されたら、この容器画像を差し替えて完成イメージを確認できます。</p>
              <div className="relative mt-4 flex min-h-72 items-center justify-center overflow-hidden rounded-[1.5rem] bg-white/[0.04] p-6">
                <img src={selectedContainerVariant.image} alt={`${selectedContainerVariant.name}の完成イメージ`} className="max-h-64 max-w-[78%] object-contain opacity-70" />
                <div className="absolute left-1/2 top-1/2 w-[42%] max-w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/30 p-3 text-center shadow-[0_0_20px_rgba(0,0,0,0.55)]" style={{ background: labelBg }}>
                  <img src={selectedLogo.src} alt="selected logo" className="mx-auto h-8 object-contain" />
                  <p className="mt-4 text-lg font-black leading-tight">{productName || selectedRaw.name}</p>
                  <p className="mt-2 text-[10px] leading-4 text-white/70">{aiConcept ? 'AI STORY LABEL' : selectedRaw.name}</p>
                  <div className="mt-6 flex justify-center"><StaticMadeInJapanMark /></div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex min-h-[540px] items-center justify-center rounded-[2rem] border border-white/10 bg-black/35 p-5">
              <div
                onPointerDown={onPreviewPointer}
                onPointerMove={(e) => e.buttons === 1 && onPreviewPointer(e)}
                className="relative w-full max-w-[360px] cursor-crosshair overflow-hidden rounded-[1.35rem] border-2 border-dashed border-[#25C760]/70 shadow-[0_0_28px_rgba(37,199,96,0.18)]"
                style={{
                  aspectRatio: `${selectedLabelSize.widthMm} / ${selectedLabelSize.heightMm}`,
                  maxHeight: 500,
                  background: labelBg,
                }}
              >
                <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-white/20 px-3 py-1 text-[10px] text-white/70">LABEL AREA</div>
                <img src={selectedLogo.src} alt="selected logo" className="absolute -translate-x-1/2 -translate-y-1/2 object-contain" style={{ left: `${logoX}%`, top: `${logoY}%`, width: `${logoScale * 2}px`, maxWidth: '82%', maxHeight: '180px' }} />
                <div className="absolute left-1/2 top-[58%] w-[78%] -translate-x-1/2 text-center">
                  <p className="text-xl font-black md:text-2xl">{productName || 'PRODUCT NAME'}</p>
                  <p className="mt-2 text-xs text-white/70 md:text-sm">{selectedRaw.name} × Mother Vegetable</p>
                  {aiConcept && <p className="mx-auto mt-3 max-w-[82%] text-[10px] leading-4 text-white/65">{aiConcept}</p>}
                </div>
                <MadeInJapanMark
                  x={madeMarkX}
                  y={madeMarkY}
                  scale={madeMarkScale}
                  onPointerDown={onMadeMarkPointer}
                  onPointerMove={(e) => e.buttons === 1 && onMadeMarkPointer(e)}
                />
              </div>
            </div>
            <div className="mt-5 grid gap-4 text-sm text-gray-300">
              <label>ロゴ横位置: {logoX}%<input type="range" min="10" max="90" value={logoX} onChange={(e) => setLogoX(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
              <label>ロゴ縦位置: {logoY}%<input type="range" min="12" max="72" value={logoY} onChange={(e) => setLogoY(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
              <label>ロゴサイズ: {logoScale}%<input type="range" min="45" max="150" value={logoScale} onChange={(e) => setLogoScale(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
                <p className="font-bold text-white">Made in Japanマーク</p>
                <p className="mt-1 text-xs leading-5 text-gray-400">マークをドラッグ、または下のスライダーで位置とサイズを調整できます。背景は透過です。</p>
                <div className="mt-4 grid gap-3">
                  <label>横位置: {madeMarkX}%<input type="range" min="8" max="92" value={madeMarkX} onChange={(e) => setMadeMarkX(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
                  <label>縦位置: {madeMarkY}%<input type="range" min="12" max="94" value={madeMarkY} onChange={(e) => setMadeMarkY(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
                  <label>サイズ: {madeMarkScale}%<input type="range" min="45" max="160" value={madeMarkScale} onChange={(e) => setMadeMarkScale(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {detailOpen && (
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
          <button type="button" onClick={() => { setConfirmOpen(true); jumpTo(confirmSection); }} className="mt-8 rounded-full bg-[#25C760] px-8 py-4 font-black text-black">確認画面へ進む</button>
        </div>
      </section>
      )}

      {confirmOpen && (
      <section ref={confirmSection} className="px-6 py-16 pb-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#25C760]/30 bg-[#25C760]/[0.06] p-6 md:p-10">
          <p className="text-sm font-bold text-[#25C760]">STEP 05</p>
          <h2 className="mt-2 text-3xl font-black">あなたの希望内容はこれでいいですか？</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Summary label="素材" value={`${selectedRaw.name}（${selectedRaw.region}）`} />
            <Summary label="容器・内容量" value={`${selectedContainer.name} / ${selectedContainerVariant.name} / ${capacity}`} />
            <Summary label="容器仕様" value={`${selectedContainerVariant.color} / ${selectedContainerVariant.shape} / ${selectedContainerVariant.spec} / ${selectedContainerVariant.material}`} />
            <Summary label="ラベル範囲" value={`横${selectedLabelSize.widthMm}mm × 縦${selectedLabelSize.heightMm}mm`} />
            <Summary label="ロゴ" value={`${selectedLogo.name} / 位置 ${logoX}%・${logoY}% / サイズ ${logoScale}%`} />
            <Summary label="Made in Japan" value={`位置 ${madeMarkX}%・${madeMarkY}% / サイズ ${madeMarkScale}%`} />
            <Summary label="デザイン方法" value={designMode === 'ai' ? `AI提案 / ${aiConcept || '未生成'}` : `手動調整 / ${designMemo || 'メモ未入力'}`} />
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
      )}
    </form>
  );
}



function StaticMadeInJapanMark() {
  return (
    <div className="w-[82px] text-center text-white">
      <div className="mx-auto flex h-5 w-9 items-center justify-center border border-white bg-transparent">
        <span className="block h-3 w-3 rounded-full bg-[#ed1b2f]" />
      </div>
      <div className="mt-1 whitespace-nowrap font-serif text-[9px] font-black leading-none tracking-[0.02em]">MADE IN JAPAN</div>
    </div>
  );
}

function MadeInJapanMark({
  x,
  y,
  scale,
  onPointerDown,
  onPointerMove,
}: {
  x: number;
  y: number;
  scale: number;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      className="absolute z-10 w-[128px] cursor-grab select-none text-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] active:cursor-grabbing"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale / 100})`,
        transformOrigin: 'center',
        touchAction: 'none',
      }}
      aria-label="Made in Japanマーク"
    >
      <div className="mx-auto flex h-8 w-14 items-center justify-center border-[2px] border-white bg-transparent">
        <span className="block h-4 w-4 rounded-full bg-[#ed1b2f]" />
      </div>
      <div className="mt-2 whitespace-nowrap font-serif text-[15px] font-black leading-none tracking-[0.04em]">MADE IN JAPAN</div>
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


function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#25C760]">{label}</p>
      <p className="mt-1 font-bold text-gray-100">{value}</p>
    </div>
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
