import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

const petItems = [
  { name: 'Dry Food', image: '/Images/Assets/forever/mazekomu/dryFood.png' },
  { name: 'Wet Food', image: '/Images/Assets/forever/mazekomu/wetFood.png' },
  { name: 'Dog Water', image: '/Images/Assets/forever/mazekomu/dogWater.png' },
  { name: 'Cat Water', image: '/Images/Assets/forever/mazekomu/catWater.png' },
  { name: 'Dog Treats', image: '/Images/Assets/forever/mazekomu/dogTreats.png' },
  { name: 'Cat Treats', image: '/Images/Assets/forever/mazekomu/catTreats.png' },
];

export default async function ForeverHowToPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        <h1 className="text-center font-bold text-3xl md:text-4xl text-[#25C760] tracking-wider mb-2">How to Use Forever</h1>
        <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />

        {/* MAZEKOMU method */}
        <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-8 mb-8">
          <h2 className="text-white font-bold text-xl mb-4">MAZEKOMU - Mix In</h2>
          <p className="text-white text-sm leading-relaxed opacity-90 mb-4">
            Simply open one capsule of Forever and mix it into your pet&apos;s food or water. The powder blends naturally and does not change the taste, making it easy for your pet to take in all the essential nutrients for a healthier, longer life.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
            {petItems.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                <Image src={item.image} alt={item.name} width={60} height={60} className="w-15 h-15 object-contain" />
                <span className="text-white text-xs text-center">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-8 mb-8">
          <h3 className="text-[#25C760] font-bold text-lg mb-4">Recommended Usage</h3>
          <div className="space-y-3 text-white text-sm">
            <div className="flex items-start gap-2">
              <span className="text-[#25C760] font-bold">&#10003;</span>
              <span>For dogs under 10kg: 1/3 stick per day</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#25C760] font-bold">&#10003;</span>
              <span>For dogs 10-25kg: 1/2 stick per day</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#25C760] font-bold">&#10003;</span>
              <span>For dogs over 25kg: 1 stick per day</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#25C760] font-bold">&#10003;</span>
              <span>For cats: 1/3 stick per day</span>
            </div>
          </div>
        </div>

        {/* Buy link */}
        <div className="text-center py-8">
          <a
            href="/product/forever"
            className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-lg no-underline hover:bg-[#25C760] hover:text-white transition-all duration-300"
          >
            To Buy Forever
          </a>
        </div>

        <div className="text-center py-8">
          <Image src="/Images/favicon.png" alt="Mazavege Family" width={64} height={64} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
