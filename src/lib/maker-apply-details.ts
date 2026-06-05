export type MakerRawMaterialDetail = {
  id: string;
  name: string;
  exteriorImage: string;
  insideImage: string;
  genre1: string;
  genre2: string;
  producer: string;
  productionArea: string;
  ingredients: string;
  maxProductionPerUnit: string;
  mixRule: '1個のみ' | '複数可能';
  priorityFeatured: boolean;
  shapeNotes: string;
  allowedContainerIds: string[];
};

export type MakerContainerPhoto = {
  src: string;
  memo: string;
};

export type MakerContainerCapacity = {
  capacity: string;
  dimensions: string;
  labelSize: string;
};

export type MakerContainerDetail = {
  id: string;
  name: string;
  photos: MakerContainerPhoto[];
  okGenres: string[];
  bodyMaterial: string;
  lidMaterial: string;
  capacitySpecs: MakerContainerCapacity[];
  colors: string[];
  finish: string[];
  hasLid: boolean;
  lidColors: string[];
};

export const makerContainerDetails: MakerContainerDetail[] = [
  {
    id: 'trigger-spray',
    name: 'トリガータイプスプレー',
    photos: [{ src: '/images/maker-apply/containers/trigger-spray.webp', memo: '100ml〜300mlの噴霧タイプ容器。液体・ミスト系の検討用写真。' }],
    okGenres: ['化粧品', '雑貨', '液体'],
    bodyMaterial: 'PET',
    lidMaterial: 'プラ / トリガーヘッド',
    capacitySpecs: [
      { capacity: '100ml', dimensions: '丸型 / 小型', labelSize: '横50mm × 縦88mm' },
      { capacity: '200ml', dimensions: 'ワイド円柱', labelSize: '横62mm × 縦108mm' },
      { capacity: '300ml', dimensions: 'ワイド円柱', labelSize: '横72mm × 縦125mm' },
    ],
    colors: ['透明', '黒遮光', '白マット'],
    finish: ['通常', 'マット'],
    hasLid: true,
    lidColors: ['白', '黒', '透明'],
  },
  {
    id: 'push-spray',
    name: 'プッシュタイプスプレー',
    photos: [{ src: '/images/maker-apply/containers/push-spray.webp', memo: '携帯しやすいプッシュミスト容器。化粧水・香り系に向く。' }],
    okGenres: ['化粧品', '雑貨', '液体'],
    bodyMaterial: 'PET',
    lidMaterial: 'プラ / プッシュヘッド',
    capacitySpecs: [
      { capacity: '30ml', dimensions: 'スリム円柱', labelSize: '横32mm × 縦58mm' },
      { capacity: '50ml', dimensions: '丸型', labelSize: '横40mm × 縦72mm' },
      { capacity: '120ml', dimensions: '肩丸型', labelSize: '横52mm × 縦95mm' },
    ],
    colors: ['透明', '黒遮光', '白マット'],
    finish: ['通常', 'マット'],
    hasLid: true,
    lidColors: ['白', '黒', '透明'],
  },
  {
    id: 'soy-ponzu',
    name: '醤油ポン酢用ボトル',
    photos: [{ src: '/images/maker-apply/containers/soy-ponzu-bottle.webp', memo: '液体調味料向けの卓上ボトル。醤油・ポン酢・ドレッシング向け。' }],
    okGenres: ['食品', '調味料', '飲料'],
    bodyMaterial: 'PET / ガラス',
    lidMaterial: 'プラ / 金属キャップ',
    capacitySpecs: [
      { capacity: '100ml', dimensions: '丸型卓上', labelSize: '横46mm × 縦68mm' },
      { capacity: '180ml', dimensions: 'スリム円柱', labelSize: '横55mm × 縦92mm' },
      { capacity: '300ml', dimensions: 'ワイド円柱', labelSize: '横70mm × 縦110mm' },
    ],
    colors: ['透明', '遮光黒', '遮光緑'],
    finish: ['通常', '鏡面'],
    hasLid: true,
    lidColors: ['白', '黒', '赤', '緑'],
  },
  {
    id: 'powder-shaker',
    name: '粉末用シェイカー',
    photos: [{ src: '/images/maker-apply/containers/powder-shaker.webp', memo: '塩・粉末調味料・スパイス向けの振り出し容器。' }],
    okGenres: ['食品', '調味料', '雑貨'],
    bodyMaterial: 'PET',
    lidMaterial: 'プラ / 穴あきキャップ',
    capacitySpecs: [
      { capacity: '20g', dimensions: '小型円柱', labelSize: '横36mm × 縦48mm' },
      { capacity: '50g', dimensions: '円柱', labelSize: '横50mm × 縦70mm' },
      { capacity: '120g', dimensions: 'ワイド円柱', labelSize: '横66mm × 縦90mm' },
    ],
    colors: ['透明', '白', '黒'],
    finish: ['通常', 'マット'],
    hasLid: true,
    lidColors: ['白', '黒', '透明'],
  },
  {
    id: 'glass-container',
    name: 'ガラス容器',
    photos: [{ src: '/images/maker-apply/containers/glass-container.webp', memo: '味噌・クリーム・バーム・オイルなどに使いやすい高級感のあるガラス容器。' }],
    okGenres: ['食品', '調味料', '化粧品', '雑貨'],
    bodyMaterial: 'グラス',
    lidMaterial: 'アルミ / プラ / 木',
    capacitySpecs: [
      { capacity: '50g', dimensions: '低型丸', labelSize: '横48mm × 縦50mm' },
      { capacity: '120g', dimensions: '丸型', labelSize: '横68mm × 縦82mm' },
      { capacity: '300g', dimensions: '広口ワイド', labelSize: '横90mm × 縦105mm' },
    ],
    colors: ['透明', '遮光黒', '遮光緑'],
    finish: ['通常', 'マット', '鏡面'],
    hasLid: true,
    lidColors: ['白', '黒', '木目', 'アルミ'],
  },
  {
    id: 'shampoo-bottle',
    name: 'シャンプーボトル',
    photos: [{ src: '/images/maker-apply/containers/shampoo-bottle.webp', memo: 'ヘアケア・バス用品向けのポンプボトル。' }],
    okGenres: ['化粧品', '雑貨', '液体'],
    bodyMaterial: 'PET / HDPE',
    lidMaterial: 'プラ / ポンプ',
    capacitySpecs: [
      { capacity: '200ml', dimensions: '角丸ボトル', labelSize: '横65mm × 縦110mm' },
      { capacity: '300ml', dimensions: '角丸ボトル', labelSize: '横75mm × 縦125mm' },
      { capacity: '500ml', dimensions: '大型ボトル', labelSize: '横88mm × 縦145mm' },
    ],
    colors: ['白', '黒', '透明'],
    finish: ['通常', 'マット'],
    hasLid: true,
    lidColors: ['白', '黒', '透明'],
  },
  {
    id: 'dropper-bottle',
    name: 'ドロッパーボトル',
    photos: [{ src: '/images/maker-apply/containers/dropper-bottle.webp', memo: '美容オイル・エッセンス向け。少量ずつ使う液体素材に向く。' }],
    okGenres: ['化粧品', '雑貨', '液体'],
    bodyMaterial: 'グラス',
    lidMaterial: 'ゴム / ガラス / プラ',
    capacitySpecs: [
      { capacity: '15ml', dimensions: '小型円柱', labelSize: '横28mm × 縦50mm' },
      { capacity: '30ml', dimensions: '丸型', labelSize: '横38mm × 縦68mm' },
      { capacity: '50ml', dimensions: '丸型', labelSize: '横45mm × 縦78mm' },
    ],
    colors: ['透明', '遮光黒', '遮光緑'],
    finish: ['通常', 'マット'],
    hasLid: true,
    lidColors: ['白', '黒', '透明'],
  },
  {
    id: 'can-container',
    name: '缶容器',
    photos: [{ src: '/images/maker-apply/containers/can-container.webp', memo: '粉末・茶葉・バーム・ギフト向け。保存性と見た目を両立する缶容器。' }],
    okGenres: ['食品', '調味料', '化粧品', '雑貨'],
    bodyMaterial: 'アルミ / スチール',
    lidMaterial: 'アルミ / スチール',
    capacitySpecs: [
      { capacity: '20g', dimensions: '小型丸缶', labelSize: '横42mm × 縦32mm' },
      { capacity: '60g', dimensions: '丸缶', labelSize: '横58mm × 縦45mm' },
      { capacity: '120g', dimensions: '大型丸缶', labelSize: '横72mm × 縦58mm' },
    ],
    colors: ['シルバー', '白', '黒'],
    finish: ['通常', 'マット', '鏡面'],
    hasLid: true,
    lidColors: ['シルバー', '白', '黒'],
  },
  {
    id: 'lipstick',
    name: 'リップスティック',
    photos: [{ src: '/images/maker-apply/containers/lipstick.webp', memo: 'リップ・スティックバーム専用容器。食品には使用しない。' }],
    okGenres: ['化粧品', '雑貨'],
    bodyMaterial: 'PP',
    lidMaterial: 'PP',
    capacitySpecs: [
      { capacity: '3g', dimensions: '細身スティック', labelSize: '横24mm × 縦42mm' },
      { capacity: '5g', dimensions: '標準スティック', labelSize: '横28mm × 縦55mm' },
      { capacity: '8g', dimensions: '太型スティック', labelSize: '横34mm × 縦58mm' },
    ],
    colors: ['白', '黒マット'],
    finish: ['通常', 'マット'],
    hasLid: true,
    lidColors: ['白', '黒'],
  },
];

export const makerRawMaterialDetails: MakerRawMaterialDetail[] = [
  { id: 'kawazu-salt', name: '河津の平釜塩', exteriorImage: '/images/maker-apply/raw-materials/kawazu-salt.webp', insideImage: '/images/maker-apply/raw-materials/kawazu-salt.webp', genre1: '食品', genre2: '塩', producer: '河津町 生産者', productionArea: '河津町', ingredients: '海水、ミネラル塩', maxProductionPerUnit: '120g', mixRule: '複数可能', priorityFeatured: true, shapeNotes: '粉末・粒状。ふりかけ系や調味料との組み合わせに向く。', allowedContainerIds: ['powder-shaker', 'can-container', 'glass-container'] },
  { id: 'kushimoto-miso', name: '串本の金山寺味噌', exteriorImage: '/images/maker-apply/raw-materials/kushimoto-kinzanji-miso.webp', insideImage: '/images/maker-apply/raw-materials/kushimoto-kinzanji-miso.webp', genre1: '食品', genre2: '味噌', producer: '串本町 生産者', productionArea: '串本町', ingredients: '米、麹、味噌原料', maxProductionPerUnit: '300g', mixRule: '1個のみ', priorityFeatured: false, shapeNotes: '粘度のある発酵食品。単体商品としての見せ方が向く。', allowedContainerIds: ['glass-container', 'can-container'] },
  { id: 'izu-onsen', name: '伊豆の温泉化粧水', exteriorImage: '/images/maker-apply/raw-materials/izu-onsen-toner.webp', insideImage: '/images/maker-apply/raw-materials/izu-onsen-toner.webp', genre1: '化粧品', genre2: '化粧水', producer: '伊豆市 生産者', productionArea: '伊豆市', ingredients: '温泉水、保湿成分', maxProductionPerUnit: '300ml', mixRule: '複数可能', priorityFeatured: true, shapeNotes: '液体素材。ミスト・化粧水ベースに向く。', allowedContainerIds: ['trigger-spray', 'push-spray', 'dropper-bottle'] },
  { id: 'minami-toner', name: '南伊豆ハーブ化粧水', exteriorImage: '/images/maker-apply/raw-materials/minami-izu-herb-toner.webp', insideImage: '/images/maker-apply/raw-materials/minami-izu-herb-toner.webp', genre1: '化粧品', genre2: '化粧水', producer: '南伊豆町 ハーブ農園', productionArea: '南伊豆町', ingredients: 'ハーブ抽出液、保湿成分', maxProductionPerUnit: '300ml', mixRule: '複数可能', priorityFeatured: false, shapeNotes: '香りを活かした液体素材。ミストやスキンケア向け。', allowedContainerIds: ['trigger-spray', 'push-spray', 'dropper-bottle'] },
  { id: 'wakayama-shampoo', name: '紀州ゆずシャンプー', exteriorImage: '/images/maker-apply/raw-materials/kishu-yuzu-shampoo.webp', insideImage: '/images/maker-apply/raw-materials/kishu-yuzu-shampoo.webp', genre1: '化粧品', genre2: 'シャンプー', producer: '和歌山県 生産者', productionArea: '和歌山県', ingredients: 'ゆず香料、ヘアケア原料', maxProductionPerUnit: '500ml', mixRule: '1個のみ', priorityFeatured: false, shapeNotes: '液体ヘアケア素材。ポンプ容器向け。', allowedContainerIds: ['shampoo-bottle'] },
  { id: 'hokkaido-lip', name: '北海道ミルクリップ', exteriorImage: '/images/maker-apply/raw-materials/hokkaido-milk-lip.webp', insideImage: '/images/maker-apply/raw-materials/hokkaido-milk-lip.webp', genre1: '化粧品', genre2: 'リップ', producer: '北海道 生産者', productionArea: '北海道', ingredients: 'ミルク由来イメージ原料、保湿成分', maxProductionPerUnit: '15g', mixRule: '1個のみ', priorityFeatured: false, shapeNotes: '固形・バーム系。リップ容器向け。', allowedContainerIds: ['lipstick', 'glass-container'] },
  { id: 'komeko-pack', name: '米麹フェイスパック', exteriorImage: '/images/maker-apply/raw-materials/komeko-face-pack.webp', insideImage: '/images/maker-apply/raw-materials/komeko-face-pack.webp', genre1: '化粧品', genre2: 'フェイスパック', producer: '新潟県 生産者', productionArea: '新潟県', ingredients: '米麹、発酵由来成分', maxProductionPerUnit: '120g', mixRule: '複数可能', priorityFeatured: false, shapeNotes: 'ペースト/粉末想定。ガラス容器・缶容器向け。', allowedContainerIds: ['glass-container', 'can-container'] },
  { id: 'shizuoka-wasabi', name: '静岡わさび塩', exteriorImage: '/images/maker-apply/raw-materials/shizuoka-wasabi-salt.webp', insideImage: '/images/maker-apply/raw-materials/shizuoka-wasabi-salt.webp', genre1: '食品', genre2: '塩', producer: '静岡県 生産者', productionArea: '静岡県', ingredients: '食塩、わさび粉末', maxProductionPerUnit: '120g', mixRule: '複数可能', priorityFeatured: true, shapeNotes: '粉末調味料。塩やスパイスとの組み合わせに向く。', allowedContainerIds: ['powder-shaker', 'can-container'] },
  { id: 'olive-oil', name: '小豆島オリーブオイル', exteriorImage: '/images/maker-apply/raw-materials/shodoshima-olive-oil.webp', insideImage: '/images/maker-apply/raw-materials/shodoshima-olive-oil.webp', genre1: '食品 / 化粧品', genre2: 'オイル', producer: '小豆島 生産者', productionArea: '小豆島', ingredients: 'オリーブオイル', maxProductionPerUnit: '300ml', mixRule: '複数可能', priorityFeatured: false, shapeNotes: '液体オイル。食品・美容どちらにも展開可能。', allowedContainerIds: ['soy-ponzu', 'glass-container', 'dropper-bottle'] },
];

export function getMakerContainerDetail(id: string) {
  return makerContainerDetails.find((item) => item.id === id);
}

export function getMakerRawMaterialDetail(id: string) {
  return makerRawMaterialDetails.find((item) => item.id === id);
}
