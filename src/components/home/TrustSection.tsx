import Image from 'next/image';

export default function TrustSection() {
  return (
    <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]">
      <h2 className="text-center font-bold text-2xl md:text-4xl text-[#25C760] tracking-wider mb-2">Our Trust</h2>
      <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />
      <div className="flex justify-center items-center flex-wrap gap-4 md:gap-8 max-w-[1400px] mx-auto mb-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex justify-center items-center p-2.5">
            <Image src={`/Images/Assets/homepage/company/partner_${i}.png`} alt={`Partner ${i}`} width={120} height={120} className="max-w-[120px] max-h-[120px] w-auto h-auto hover:scale-110 transition-transform duration-300" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1.5 max-w-[820px] mx-auto w-fit py-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white text-sm md:text-base">
          <span className="min-w-[110px] text-right font-bold text-[#25C760]">Achieve</span>
          <span className="flex-1 text-left"></span>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white text-sm md:text-base">
          <span className="min-w-[110px] text-right font-bold text-[#25C760]">Confidence</span>
          <span className="flex-1 text-left">certified cosmetic &ldquo;The Japanese Standards of Quasi-Drug Ingredients (JSQI)&rdquo; by MHLW, Japan</span>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white text-sm md:text-base">
          <span className="min-w-[110px] text-right font-bold text-[#25C760]">Forever</span>
          <span className="flex-1 text-left">certified by pet grade food by Ministry of Agriculture, Forestry and Fisheries (MAFF), Japan</span>
        </div>
      </div>
    </div>
  );
}
