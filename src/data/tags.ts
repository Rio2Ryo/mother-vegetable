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
  { key: 'マザーベジタブル社', labelJa: 'マザーベジタブル社', labelEn: 'Mother Vegetable Co.', icon: '🌱', faceImage: '/cdn/mv-search-character.png' },
  { key: 'アスリート',         labelJa: 'アスリート',           labelEn: 'Athlete',                icon: '🏃' },
  { key: '小学生',             labelJa: '小学生',               labelEn: 'Elementary Student',     icon: '📚' },
  { key: '河津住民',           labelJa: '河津住民',             labelEn: 'Kawazu Resident',        icon: '🏘️' },
];

export function getProposerTagDef(key: string): ProposerTagDef | undefined {
  return PROPOSER_TAGS.find((t) => t.key === key);
}
