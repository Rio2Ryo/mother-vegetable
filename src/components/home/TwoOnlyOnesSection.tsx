import Image from 'next/image';

export default function TwoOnlyOnesSection() {
  return (
    <div className="py-8 md:py-16">
      <h2 className="text-center font-bold text-2xl md:text-4xl text-[#25C760] tracking-wider mb-4">Two Only Ones</h2>
      <div className="max-w-[1200px] mx-auto mb-8">
        <p className="text-white text-center text-sm md:text-base leading-relaxed whitespace-pre-line opacity-95">
          {`The MOTHER VEGETABLE PROJECT is
the world's only project that aims to restore the Earth and all life,
centered around two one-of-a-kind businesses.

In this process, each facility purifies the atmosphere by absorbing CO₂
and generating oxygen 24 hours a day, 365 days a year,
while simultaneously contributing to improving the health of humans
and living organisms through Mother Vegetable products and the aquaculture of fish and shellfish.

Furthermore, by expanding these facilities around the world,
it will develop into eight additional industrial sectors.`}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <div className="text-[#25C760] text-3xl font-bold text-center mb-4">I</div>
          <div className="bg-black border border-[#25C760] rounded-lg p-6 md:p-8 flex flex-col flex-1">
            <h3 className="text-[#25C760] font-bold text-center text-xl mb-6">Mother Vegetable</h3>
            <div className="flex justify-center mb-6">
              <Image src="/Images/Assets/homepage/mother-vegetable-microscopic.png" alt="Mother Vegetable Microscopic View" width={300} height={200} className="h-[200px] w-auto object-contain" />
            </div>
            <p className="text-white text-sm leading-relaxed mb-4">By researching the evolutionary journey of Mother Vegetable, Earth&apos;s first vegetable, which culminated in humanity, we offer the following three types of Mother Vegetable products:</p>
            <div className="space-y-3 mb-4">
              <div className="text-white text-sm leading-relaxed">
                <span className="text-[#25C760] text-lg mr-2">①</span>
                <strong className="text-[#25C760]">Food:</strong><br />
                <span>Food derived from a single life form that provides all 48 nutrients essential for humanity.</span>
              </div>
              <div className="text-white text-sm leading-relaxed">
                <span className="text-[#25C760] text-lg mr-2">②</span>
                <strong className="text-[#25C760]">Skincare:</strong><br />
                <span>Skincare products designed to promote reverse aging effects for the skin.</span>
              </div>
              <div className="text-white text-sm leading-relaxed">
                <span className="text-[#25C760] text-lg mr-2">③</span>
                <strong className="text-[#25C760]">Aquaculture:</strong><br />
                <span>Aquaculture of high-protein fish and shellfish raised with zero chemical inputs.</span>
              </div>
            </div>
            <div className="flex justify-center">
              <video className="max-w-[300px] w-full h-auto rounded-lg" autoPlay muted loop playsInline>
                <source src="https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/mazavege_top.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-[#25C760] text-3xl font-bold text-center mb-4">II</div>
          <div className="bg-black border border-[#25C760] rounded-lg p-6 md:p-8 flex flex-col flex-1">
            <h3 className="text-[#25C760] font-bold text-center text-xl mb-6">Small Earth Factory (SEF)</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Image src="/Images/Assets/homepage/sef-solar-panels.jpg" alt="SEF Solar Panels" width={300} height={200} className="w-full h-[200px] object-cover rounded" />
              <Image src="/Images/Assets/homepage/sef.png" alt="SEF Greenhouse" width={300} height={200} className="w-full h-[200px] object-cover rounded" />
            </div>
            <div className="space-y-4 mb-4">
              <div className="text-white text-sm leading-relaxed">
                <span className="text-[#25C760] text-lg mr-2">①</span>
                <strong className="text-[#25C760]">CO₂ offset:</strong><br />
                <span>Recreating a small Earth through CO₂ absorption (700 times that of natural cedar) and O₂ emission by Mother Vegetable production.</span>
              </div>
              <div className="text-white text-sm leading-relaxed">
                <span className="text-[#25C760] text-lg mr-2">②</span>
                <strong className="text-[#25C760]">ZERO Emission:</strong><br />
                <span>Recreating a small Earth without relying on any CO₂-emitting energy sources, including external electricity or fossil fuels.</span>
              </div>
            </div>
            <div className="flex justify-center">
              <video className="max-w-[300px] w-full h-auto rounded-lg" autoPlay muted loop playsInline>
                <source src="https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/homepage/sef_top.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
