import { Link } from '@/i18n/navigation';

type PartnerKind = 'dealer' | 'maker';

export default function PartnerSwitch({ active }: { active: PartnerKind }) {
  const items = [
    {
      key: 'dealer' as const,
      href: '/dealer',
      title: 'Mazavege Dealer',
      subtitle: '商品を販売する人',
      activeClass: 'border-[#25C760] bg-[#25C760]/15 shadow-[0_0_35px_rgba(37,199,96,0.28)]',
      hoverClass: 'hover:border-[#25C760]/60 hover:bg-[#25C760]/8',
      textClass: 'text-[#25C760]',
      hoverTextClass: 'group-hover:text-[#25C760]',
      badgeClass: 'bg-[#25C760]',
    },
    {
      key: 'maker' as const,
      href: '/maker',
      title: 'Mazavege Maker',
      subtitle: '商品を作る人',
      activeClass: 'border-white/75 bg-white/[0.12] shadow-[0_0_35px_rgba(255,255,255,0.18)]',
      hoverClass: 'hover:border-white/55 hover:bg-white/[0.07]',
      textClass: 'text-white',
      hoverTextClass: 'group-hover:text-white',
      badgeClass: 'bg-white',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`group relative overflow-hidden rounded-2xl border p-6 no-underline transition-all duration-300 ${
              isActive
                ? item.activeClass
                : `border-white/10 bg-white/[0.03] ${item.hoverClass}`
            }`}
          >
            <div className="relative z-10">
              <p className={`text-xl font-bold ${isActive ? item.textClass : `text-white ${item.hoverTextClass}`}`}>
                {item.title}
              </p>
              <p className="mt-2 text-sm text-gray-300">{item.subtitle}</p>
              {isActive && (
                <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-xs font-bold text-black ${item.badgeClass}`}>
                  現在のページ
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
