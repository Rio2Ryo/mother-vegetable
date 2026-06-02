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
    id: 'trigger-spray',
    name: 'トリガータイプスプレー',
    capacity: '100ml〜300ml',
    tags: ['化粧品向け', 'ミスト', '液体'],
    note: '温泉化粧水・ヘアミスト・除菌系など、しっかり噴霧したい液体向け。',
    image: '/images/maker-apply/containers/trigger-spray.webp',
    variants: [
      { id: 'trigger-spray-100', name: '100ml トリガータイプ', capacity: '100ml', color: '透明', shape: '丸型', spec: 'トリガースプレー', material: 'PET', image: '/images/maker-apply/containers/trigger-spray.webp', labelSize: { widthMm: 50, heightMm: 88 } },
      { id: 'trigger-spray-200', name: '200ml トリガータイプ', capacity: '200ml', color: '透明', shape: 'ワイド円柱', spec: 'トリガースプレー', material: 'PET', image: '/images/maker-apply/containers/trigger-spray.webp', labelSize: { widthMm: 62, heightMm: 108 } },
      { id: 'trigger-spray-300', name: '300ml トリガータイプ', capacity: '300ml', color: '透明', shape: 'ワイド円柱', spec: 'トリガースプレー', material: 'PET', image: '/images/maker-apply/containers/trigger-spray.webp', labelSize: { widthMm: 72, heightMm: 125 } },
    ],
  },
  {
    id: 'push-spray',
    name: 'プッシュタイプスプレー',
    capacity: '30ml〜120ml',
    tags: ['化粧品向け', 'ミスト', '携帯'],
    note: '化粧水・香り系・持ち歩きミストに向く、片手で使いやすいスプレー容器。',
    image: '/images/maker-apply/containers/push-spray.webp',
    variants: [
      { id: 'push-spray-30', name: '30ml プッシュタイプ', capacity: '30ml', color: '透明', shape: 'スリム円柱', spec: 'プッシュミスト', material: 'PET', image: '/images/maker-apply/containers/push-spray.webp', labelSize: { widthMm: 32, heightMm: 58 } },
      { id: 'push-spray-50', name: '50ml プッシュタイプ', capacity: '50ml', color: '透明', shape: '丸型', spec: 'プッシュミスト', material: 'PET', image: '/images/maker-apply/containers/push-spray.webp', labelSize: { widthMm: 40, heightMm: 72 } },
      { id: 'push-spray-120', name: '120ml プッシュタイプ', capacity: '120ml', color: '透明', shape: '肩丸型', spec: 'プッシュミスト', material: 'PET', image: '/images/maker-apply/containers/push-spray.webp', labelSize: { widthMm: 52, heightMm: 95 } },
    ],
  },
  {
    id: 'soy-ponzu',
    name: '醤油ポン酢用ボトル',
    capacity: '100ml〜300ml',
    tags: ['食品向け', '液体', '卓上'],
    note: '醤油・ポン酢・ドレッシングなど、液体調味料に向く容器。',
    image: '/images/maker-apply/containers/soy-ponzu-bottle.webp',
    variants: [
      { id: 'soy-ponzu-100', name: '100ml 卓上ボトル', capacity: '100ml', color: '透明', shape: '丸型卓上', spec: '細口キャップ', material: 'PET/ガラス', image: '/images/maker-apply/containers/soy-ponzu-bottle.webp', labelSize: { widthMm: 46, heightMm: 68 } },
      { id: 'soy-ponzu-180', name: '180ml 卓上ボトル', capacity: '180ml', color: '透明', shape: 'スリム円柱', spec: '液だれ防止口', material: 'PET/ガラス', image: '/images/maker-apply/containers/soy-ponzu-bottle.webp', labelSize: { widthMm: 55, heightMm: 92 } },
      { id: 'soy-ponzu-300', name: '300ml 卓上ボトル', capacity: '300ml', color: '透明', shape: 'ワイド円柱', spec: 'スクリューキャップ', material: 'PET/ガラス', image: '/images/maker-apply/containers/soy-ponzu-bottle.webp', labelSize: { widthMm: 70, heightMm: 110 } },
    ],
  },
  {
    id: 'powder-shaker',
    name: '粉末用シェイカー',
    capacity: '20g〜120g',
    tags: ['食品向け', '粉末', '卓上'],
    note: '塩・わさび塩・スパイス・粉末素材に向く振り出し容器。',
    image: '/images/maker-apply/containers/powder-shaker.webp',
    variants: [
      { id: 'powder-shaker-20', name: '20g 粉末用シェイカー', capacity: '20g', color: '透明', shape: '小型円柱', spec: '3穴キャップ', material: 'PET', image: '/images/maker-apply/containers/powder-shaker.webp', labelSize: { widthMm: 36, heightMm: 48 } },
      { id: 'powder-shaker-50', name: '50g 粉末用シェイカー', capacity: '50g', color: '透明', shape: '円柱', spec: '7穴キャップ', material: 'PET', image: '/images/maker-apply/containers/powder-shaker.webp', labelSize: { widthMm: 50, heightMm: 70 } },
      { id: 'powder-shaker-120', name: '120g 粉末用シェイカー', capacity: '120g', color: '透明', shape: 'ワイド円柱', spec: '広口キャップ', material: 'PET', image: '/images/maker-apply/containers/powder-shaker.webp', labelSize: { widthMm: 66, heightMm: 90 } },
    ],
  },
  {
    id: 'glass-container',
    name: 'ガラス容器',
    capacity: '50g〜300g',
    tags: ['食品向け', '化粧品向け', '高級感'],
    note: '味噌・クリーム・バーム・オイル系に使いやすい高級感のある容器。',
    image: '/images/maker-apply/containers/glass-container.webp',
    variants: [
      { id: 'glass-container-50', name: '50g ガラス容器', capacity: '50g', color: '透明', shape: '低型丸', spec: 'スクリュー蓋', material: 'ガラス', image: '/images/maker-apply/containers/glass-container.webp', labelSize: { widthMm: 48, heightMm: 50 } },
      { id: 'glass-container-120', name: '120g ガラス容器', capacity: '120g', color: '透明', shape: '丸型', spec: 'スクリュー蓋', material: 'ガラス', image: '/images/maker-apply/containers/glass-container.webp', labelSize: { widthMm: 68, heightMm: 82 } },
      { id: 'glass-container-300', name: '300g ガラス容器', capacity: '300g', color: '透明', shape: '広口ワイド', spec: 'スクリュー蓋', material: 'ガラス', image: '/images/maker-apply/containers/glass-container.webp', labelSize: { widthMm: 90, heightMm: 105 } },
    ],
  },
  {
    id: 'shampoo-bottle',
    name: 'シャンプーボトル',
    capacity: '200ml〜500ml',
    tags: ['化粧品向け', 'ヘアケア', '液体'],
    note: 'シャンプー・トリートメント・ボディソープなどのヘアケア/バス用品向け。',
    image: '/images/maker-apply/containers/shampoo-bottle.webp',
    variants: [
      { id: 'shampoo-bottle-200', name: '200ml シャンプーボトル', capacity: '200ml', color: '透明', shape: '角丸ボトル', spec: 'ポンプ', material: 'PET/HDPE', image: '/images/maker-apply/containers/shampoo-bottle.webp', labelSize: { widthMm: 65, heightMm: 110 } },
      { id: 'shampoo-bottle-300', name: '300ml シャンプーボトル', capacity: '300ml', color: '透明', shape: '角丸ボトル', spec: 'ポンプ', material: 'PET/HDPE', image: '/images/maker-apply/containers/shampoo-bottle.webp', labelSize: { widthMm: 75, heightMm: 125 } },
      { id: 'shampoo-bottle-500', name: '500ml シャンプーボトル', capacity: '500ml', color: '透明', shape: '大型ボトル', spec: 'ポンプ', material: 'PET/HDPE', image: '/images/maker-apply/containers/shampoo-bottle.webp', labelSize: { widthMm: 88, heightMm: 145 } },
    ],
  },
  {
    id: 'dropper-bottle',
    name: 'ドロッパーボトル',
    capacity: '15ml〜50ml',
    tags: ['化粧品向け', 'オイル', '美容'],
    note: '美容オイル・エッセンス・香り系素材など、少量ずつ使う液体向け。',
    image: '/images/maker-apply/containers/dropper-bottle.webp',
    variants: [
      { id: 'dropper-bottle-15', name: '15ml ドロッパー', capacity: '15ml', color: '透明', shape: '小型円柱', spec: 'スポイト', material: 'ガラス', image: '/images/maker-apply/containers/dropper-bottle.webp', labelSize: { widthMm: 28, heightMm: 50 } },
      { id: 'dropper-bottle-30', name: '30ml ドロッパー', capacity: '30ml', color: '透明', shape: '丸型', spec: 'スポイト', material: 'ガラス', image: '/images/maker-apply/containers/dropper-bottle.webp', labelSize: { widthMm: 38, heightMm: 68 } },
      { id: 'dropper-bottle-50', name: '50ml ドロッパー', capacity: '50ml', color: '透明', shape: '丸型', spec: 'スポイト', material: 'ガラス', image: '/images/maker-apply/containers/dropper-bottle.webp', labelSize: { widthMm: 45, heightMm: 78 } },
    ],
  },
  {
    id: 'can-container',
    name: '缶容器',
    capacity: '20g〜120g',
    tags: ['食品向け', '化粧品向け', '粉末'],
    note: '粉末・茶葉・バーム・ギフト向けなど、保存性と見た目を両立した容器。',
    image: '/images/maker-apply/containers/can-container.webp',
    variants: [
      { id: 'can-container-20', name: '20g 缶容器', capacity: '20g', color: 'シルバー', shape: '小型丸缶', spec: 'かぶせ蓋', material: 'アルミ/スチール', image: '/images/maker-apply/containers/can-container.webp', labelSize: { widthMm: 42, heightMm: 32 } },
      { id: 'can-container-60', name: '60g 缶容器', capacity: '60g', color: 'シルバー', shape: '丸缶', spec: 'かぶせ蓋', material: 'アルミ/スチール', image: '/images/maker-apply/containers/can-container.webp', labelSize: { widthMm: 58, heightMm: 45 } },
      { id: 'can-container-120', name: '120g 缶容器', capacity: '120g', color: 'シルバー', shape: '大型丸缶', spec: 'スクリュー蓋', material: 'アルミ/スチール', image: '/images/maker-apply/containers/can-container.webp', labelSize: { widthMm: 72, heightMm: 58 } },
    ],
  },
  {
    id: 'lipstick',
    name: 'リップスティック',
    capacity: '3g〜15g',
    tags: ['化粧品向け', 'リップ', '携帯'],
    note: 'リップ・スティックバーム専用。食品不可。',
    image: '/images/maker-apply/containers/lipstick.webp',
    variants: [
      { id: 'lipstick-3', name: '3g リップスティック', capacity: '3g', color: '白', shape: '細身スティック', spec: '繰り出し式', material: 'PP', image: '/images/maker-apply/containers/lipstick.webp', labelSize: { widthMm: 24, heightMm: 42 } },
      { id: 'lipstick-5', name: '5g リップスティック', capacity: '5g', color: '白', shape: '標準スティック', spec: '繰り出し式', material: 'PP', image: '/images/maker-apply/containers/lipstick.webp', labelSize: { widthMm: 28, heightMm: 55 } },
      { id: 'lipstick-8', name: '8g リップスティック', capacity: '8g', color: '黒マット', shape: '太型スティック', spec: '繰り出し式', material: 'PP', image: '/images/maker-apply/containers/lipstick.webp', labelSize: { widthMm: 34, heightMm: 58 } },
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
const containerColorOptions = ['透明', '黒遮光', '白マット'];
const lidColorOptions = ['白', '黒', '木目'];

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
  const [containerColor, setContainerColor] = useState('');
  const [lidColor, setLidColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [capacityConfirmed, setCapacityConfirmed] = useState(false);
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
  const [labelDesignChoice, setLabelDesignChoice] = useState<'manual' | 'ai' | ''>('');
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
  const containerColorSection = useRef<HTMLDivElement>(null);
  const lidColorSection = useRef<HTMLDivElement>(null);
  const designSection = useRef<HTMLElement>(null);
  const detailSection = useRef<HTMLElement>(null);
  const confirmSection = useRef<HTMLElement>(null);

  const selectedRaw = rawMaterials.find((item) => item.id === rawMaterialId) ?? rawMaterials[0];
  const selectedContainer = containers.find((item) => item.id === containerId) ?? containers[0];
  const selectedLogo = logos.find((item) => item.id === logoId) ?? logos[0];
  const selectedContainerVariant = selectedContainer.variants.find((item) => item.id === containerVariantId) ?? selectedContainer.variants[0];
  const selectedLabelSize = selectedContainerVariant.labelSize;
  const capacityOptions = selectedContainer.variants.filter((variant, index, variants) => variants.findIndex((item) => item.capacity === variant.capacity) === index).slice(0, 3);
  const isContainerDetailComplete = Boolean(containerVariantId && containerColor && lidColor);
  const isDesignStepOpen = isContainerDetailComplete && capacityConfirmed;

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
                  <input type="radio" name="rawMaterial" value={item.id} checked={rawMaterialId === item.id} onChange={() => { setRawMaterialId(item.id); setContainerId(''); setContainerVariantId(''); setContainerColor(''); setLidColor(''); setCapacity(''); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); jumpTo(containerSection); }} className="sr-only" />
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
                <input type="radio" name="container" value={item.id} checked={containerId === item.id} onChange={() => { setContainerId(item.id); setContainerVariantId(''); setContainerColor(''); setLidColor(''); setCapacity(''); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); jumpTo(containerVariantSection, 120); }} className="sr-only" />
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
                <h3 className="mt-2 text-2xl font-black">{selectedContainer.name}の仕様を選ぶ</h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300">
                  容量・容器色・蓋色を順番に選びます。
                </p>
              </div>
              <span className="rounded-full border border-[#25C760]/35 px-4 py-2 text-sm font-bold text-[#25C760]">3ステップ</span>
            </div>

            <div className="mt-8 space-y-8">
              <ChoiceGroup title="1. 容量を選ぶ" note="容量を選ぶと、ラベルのサイズも決定します。">
                {capacityOptions.map((variant) => (
                  <TextChoice
                    key={variant.id}
                    name="containerCapacity"
                    checked={containerVariantId === variant.id}
                    onChange={() => { setContainerVariantId(variant.id); setCapacity(variant.capacity); setContainerColor(''); setLidColor(''); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); }}
                    title={variant.capacity}
                    detail={`ラベル範囲: 横${variant.labelSize.widthMm}mm × 縦${variant.labelSize.heightMm}mm`}
                  />
                ))}
              </ChoiceGroup>

              {containerVariantId && (
                <div ref={containerColorSection} className="scroll-mt-24">
                <ChoiceGroup title="2. 容器の色を選ぶ">
                  {containerColorOptions.map((color) => (
                    <TextChoice
                      key={color}
                      name="containerColor"
                      checked={containerColor === color}
                      onChange={() => { setContainerColor(color); setLidColor(''); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); }}
                      title={color}
                    />
                  ))}
                </ChoiceGroup>
                </div>
              )}

              {containerVariantId && containerColor && (
                <div ref={lidColorSection} className="scroll-mt-24">
                <ChoiceGroup title="3. 蓋の色を選ぶ">
                  {lidColorOptions.map((color) => (
                    <TextChoice
                      key={color}
                      name="lidColor"
                      checked={lidColor === color}
                      onChange={() => { setLidColor(color); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); }}
                      title={color}
                    />
                  ))}
                </ChoiceGroup>
                </div>
              )}
            </div>
          </div>
          )}

          {isContainerDetailComplete && (
          <div className="mt-8 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <label className="text-sm font-bold text-gray-300">
                希望内容量
                <input value={capacity} onChange={(e) => { setCapacity(e.target.value); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); }} placeholder="例：100ml / 80g / 30包" className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760] md:min-w-[260px]" />
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#25C760]/30 bg-[#25C760]/10 p-4 text-sm font-bold leading-6 text-gray-100">
                <input type="checkbox" checked={capacityConfirmed} onChange={(e) => { setCapacityConfirmed(e.target.checked); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); if (e.target.checked) jumpTo(designSection, 120); }} className="mt-1 h-5 w-5 accent-[#25C760]" />
                <span>この容量でOKであればチェック</span>
              </label>
            </div>
          </div>
          )}
        </div>
      </section>
      )}

      {isDesignStepOpen && (
      <section ref={designSection} className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-bold text-[#25C760]">STEP 03</p>
            <h2 className="mt-2 text-3xl font-black">ラベルデザイン</h2>
            <p className="mt-4 max-w-3xl text-gray-300">まず、ラベルの作り方を選んでください。自分で細かく調整することも、理念や思いを入力してAIにラベル案を作らせることもできます。Made in Japanマークは必ず入ります。</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <button type="button" onClick={() => { setLabelDesignChoice('manual'); setDesignMode('manual'); }} className={`rounded-[2rem] border p-6 text-left transition ${labelDesignChoice === 'manual' ? 'border-[#25C760] bg-[#25C760]/15 shadow-[0_0_24px_rgba(37,199,96,0.2)]' : 'border-white/10 bg-white/[0.04] hover:border-[#25C760]/50'}`}>
                <span className="text-sm font-black text-[#25C760]">1</span>
                <span className="mt-2 block text-xl font-black text-white">自分でラベルをデザインする</span>
                <span className="mt-3 block text-sm leading-6 text-gray-300">ロゴとMade in Japanマークの位置はプレビュー上でドラッグし、サイズはバーで調整します。</span>
              </button>
              <button type="button" onClick={() => { setLabelDesignChoice('ai'); setDesignMode('ai'); }} className={`rounded-[2rem] border p-6 text-left transition ${labelDesignChoice === 'ai' ? 'border-[#25C760] bg-[#25C760]/15 shadow-[0_0_24px_rgba(37,199,96,0.2)]' : 'border-white/10 bg-white/[0.04] hover:border-[#25C760]/50'}`}>
                <span className="text-sm font-black text-[#25C760]">2</span>
                <span className="mt-2 block text-xl font-black text-white">理念や思いを入力してAIによるラベルの自動生成をする</span>
                <span className="mt-3 block text-sm leading-6 text-gray-300">届けたい人や商品のストーリーを入力し、AIにラベル案を作らせます。</span>
              </button>
            </div>

            {labelDesignChoice && (
            <div className="mt-8">
              <p className="text-sm font-bold text-gray-300">Mother Vegetableロゴを選ぶ</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {logos.map((logo) => (
                  <label key={logo.id} className={`cursor-pointer rounded-3xl border bg-white/[0.04] p-4 transition ${logoId === logo.id ? 'border-[#25C760]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                    <input type="radio" name="logo" value={logo.id} checked={logoId === logo.id} onChange={() => setLogoId(logo.id)} className="sr-only" />
                    <div className="flex h-32 items-center justify-center rounded-2xl bg-black p-4"><img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" /></div>
                    <p className="mt-3 text-sm font-bold">{logo.name}</p>
                  </label>
                ))}
              </div>
            </div>
            )}

            {labelDesignChoice === 'ai' && (
            <div className="mt-8 rounded-[2rem] border border-[#25C760]/25 bg-[#25C760]/[0.05] p-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-bold text-[#25C760]">AIラベル提案</p>
                  <h3 className="mt-2 text-2xl font-black">デザインをAIに作成させる</h3>
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
                <button type="button" onClick={() => { setLabelDesignChoice('manual'); setDesignMode('manual'); }} className="rounded-full border border-white/20 px-6 py-3 font-bold text-white hover:border-[#25C760]">自分で調整する</button>
              </div>
              {aiConcept && (
                <div className="mt-5 rounded-3xl border border-white/10 bg-black/35 p-5 text-sm leading-7 text-gray-200">
                  <p className="font-black text-[#25C760]">AI提案コンセプト</p>
                  <p className="mt-2">{aiConcept}</p>
                </div>
              )}
            </div>
            )}

            {labelDesignChoice === 'manual' && (
            <>
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
            </>
            )}

            {labelDesignChoice && (
              <button type="button" onClick={() => { setDetailOpen(true); setConfirmOpen(false); jumpTo(detailSection); }} className="mt-8 rounded-full bg-[#25C760] px-8 py-4 font-black text-black">商品情報へ進む</button>
            )}
          </div>

          {labelDesignChoice === 'manual' && (
          <div className="rounded-[2rem] border border-[#25C760]/30 bg-white/[0.04] p-6">
            <h3 className="text-xl font-black">ラベル配置プレビュー</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#25C760]">
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">{selectedContainer.name}</span>
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">{selectedContainerVariant.capacity}</span>
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">容器色: {containerColor}</span>
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">蓋色: {lidColor}</span>
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">ラベル範囲: 横{selectedLabelSize.widthMm}mm × 縦{selectedLabelSize.heightMm}mm</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-gray-400">
              容器を変えると、この作業エリアの縦横比もラベル範囲に合わせて変わります。
            </p>
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
              <label>ロゴサイズ: {logoScale}%<input type="range" min="45" max="150" value={logoScale} onChange={(e) => setLogoScale(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
              <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
                <p className="font-bold text-white">Made in Japanマーク</p>
                <p className="mt-1 text-xs leading-5 text-gray-400">位置はマークを直接ドラッグして調整できます。背景は透過です。</p>
                <div className="mt-4 grid gap-3">
                  <label>サイズ: {madeMarkScale}%<input type="range" min="45" max="160" value={madeMarkScale} onChange={(e) => setMadeMarkScale(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
                </div>
              </div>
            </div>
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/35 p-5">
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
          </div>
          )}
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
            <Summary label="容器仕様" value={`容器色: ${containerColor} / 蓋色: ${lidColor}`} />
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



function ChoiceGroup({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-lg font-black text-white">{title}</h4>
      {note && <p className="mt-2 text-xs leading-5 text-gray-400">{note}</p>}
      <div className="mt-4 grid gap-3 md:grid-cols-3">{children}</div>
    </div>
  );
}

function TextChoice({
  name,
  checked,
  onChange,
  title,
  detail,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  detail?: string;
}) {
  return (
    <label className={`cursor-pointer rounded-2xl border p-4 transition ${checked ? 'border-[#25C760] bg-[#25C760]/15 shadow-[0_0_18px_rgba(37,199,96,0.18)]' : 'border-white/10 bg-black/35 hover:border-[#25C760]/50'}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span className="block text-base font-black text-white">{title}</span>
      {detail && <span className="mt-2 block text-xs font-bold leading-5 text-[#25C760]">{detail}</span>}
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
