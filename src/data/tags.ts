// Tag master for regions and story attributes.
// Keep tag keys stable; labels are display strings.

export const REGION_TAGS = [
  '河津町',
  '静岡県',
  '伊豆',
  '伊豆諸島',
  '沖縄',
  '北海道',
] as const;

export type RegionTag = typeof REGION_TAGS[number];

export interface StoryTagDef {
  key: string;
  labelJa: string;
  labelEn: string;
  icon: string;     // emoji for compact chip
}

export const STORY_TAGS: StoryTagDef[] = [
  { key: '漁協連携',   labelJa: '漁協の人が作った',   labelEn: 'Made by fishery co-op',     icon: '🐟' },
  { key: '地域連携',   labelJa: '地域連携プロダクト', labelEn: 'Local partnership',         icon: '🤝' },
  { key: '伝統製法',   labelJa: '伝統製法',           labelEn: 'Traditional method',        icon: '🏯' },
  { key: '限定生産',   labelJa: '限定生産',           labelEn: 'Limited production',        icon: '🌟' },
  { key: 'オーガニック', labelJa: 'オーガニック',     labelEn: 'Organic',                   icon: '🌱' },
  { key: '無添加',     labelJa: '無添加',             labelEn: 'No additives',              icon: '✨' },
];

export type StoryTagKey = StoryTagDef['key'];

export function getStoryTagDef(key: string): StoryTagDef | undefined {
  return STORY_TAGS.find((t) => t.key === key);
}

export interface ProposerTagDef {
  key: string;
  labelJa: string;
  labelEn: string;
  icon: string;
  faceImage?: string; // path to face/avatar image under /public
}

export const PROPOSER_TAGS: ProposerTagDef[] = [
  { key: 'マザーベジタブル社', labelJa: 'Mother Vegetable社', labelEn: 'Mother Vegetable Co.', icon: '🌱', faceImage: '/cdn/mv-search-character.png' },
  { key: '佐藤はるか', labelJa: '佐藤はるか', labelEn: 'Haruka Sato', icon: '👩', faceImage: '/images/proposers/person-haruka.svg' },
  { key: '鈴木大地', labelJa: '鈴木大地', labelEn: 'Daichi Suzuki', icon: '👨', faceImage: '/images/proposers/person-daichi.svg' },
  { key: '森みお', labelJa: '森みお', labelEn: 'Mio Mori', icon: '👩', faceImage: '/images/proposers/person-mio.svg' },
  { key: '河津フーズ株式会社', labelJa: '河津フーズ株式会社', labelEn: 'Kawazu Foods Inc.', icon: '🏢', faceImage: '/images/proposers/logo-kawazu-foods.svg' },
  { key: '伊豆ウェルネスラボ', labelJa: '伊豆ウェルネスラボ', labelEn: 'Izu Wellness Lab', icon: '🏢', faceImage: '/images/proposers/logo-izu-lab.svg' },
  { key: '静岡クラフトワークス', labelJa: '静岡クラフトワークス', labelEn: 'Shizuoka Craft Works', icon: '🏢', faceImage: '/images/proposers/logo-shizuoka-works.svg' },
];

export function getProposerTagDef(key: string): ProposerTagDef | undefined {
  return PROPOSER_TAGS.find((t) => t.key === key);
}
