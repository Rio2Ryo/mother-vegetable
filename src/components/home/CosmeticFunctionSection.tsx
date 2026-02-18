import Image from 'next/image';

const concerns = [
  { name: 'Dark Spots', desc: 'Freckles' },
  { name: 'Acne', desc: 'Acne scars' },
  { name: 'Wounds', desc: 'Scars, Burn Marks' },
  { name: 'Odor', desc: 'Face, Neck, Underarms, V-Zone, Feet' },
  { name: 'Shine', desc: 'Maintains A Clean Look, Natural/ Earth Tones' },
];

export default function CosmeticFunctionSection() {
  return (
    <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-10" id="cosmetic-function">
      <h2 className="text-center font-bold text-2xl md:text-4xl text-[#25C760] tracking-wider mb-1">Cosmetic Function</h2>
      <h3 className="text-center text-[#25C760] text-lg mb-2">Confidence</h3>
      <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-2 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />
      <h6 className="text-center text-[#dc3545] mb-8">SURIKOMU / MAZEKOMU</h6>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <div className="flex justify-center">
          <video className="max-w-[100px] h-auto rounded-lg" autoPlay muted loop playsInline>
            <source src="/Images/Assets/homepage/product/cosmetic_video.mov" type="video/mp4" />
          </video>
        </div>
        <div className="flex justify-center">
          <Image src="/Images/Assets/homepage/bracket_v2.png" alt="Bracket" width={40} height={200} className="h-[200px] w-auto hidden md:block" />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {concerns.map((c) => (
            <div key={c.name} className="w-[140px] h-[140px] rounded-full border-2 border-[#25C760] flex flex-col items-center justify-center text-center p-2">
              <span className="text-[#25C760] text-xs font-semibold leading-tight">{c.name}</span>
              <span className="text-[#25C760] text-[10px] mt-1 opacity-80">{c.desc}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <p className="text-white text-sm md:text-base leading-relaxed opacity-90 flex-1">
          Mother Vegetable, certified as a medical-grade quasi-drug, is trusted by medical institutions worldwide for its healing properties — used in post-surgery recovery, burn scar improvement, cancer care, and even to help control skin shine. It supports the skin&apos;s natural ability to heal and restore balance.
        </p>
        <div className="flex-shrink-0">
          <video className="max-w-[200px] h-auto rounded-lg" autoPlay muted loop playsInline>
            <source src="/Images/Assets/homepage/product/skin.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-[#25C760] cursor-pointer hover:text-white transition-colors">
          <span className="font-bold text-lg">✓</span>
          <span className="font-medium">Before &amp; After</span>
        </div>
      </div>
    </div>
  );
}
