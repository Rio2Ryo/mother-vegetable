import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-[1]">
        <Image src="/Images/Assets/homepage/bannerImg.png" alt="Cosmic Earth Background" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-black/40 z-[2]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(37,199,96,0.1)_0%,rgba(37,199,96,0.05)_50%,transparent_70%)] z-[2] animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="relative z-[3] text-center max-w-[1400px] mx-auto px-5">
        <Image src="/Images/favicon.png" alt="Mother Vegetable Icon" width={120} height={120} className="mx-auto mb-4 drop-shadow-[0_0_20px_rgba(37,199,96,0.6)] animate-[iconFloat_3s_ease-in-out_infinite]" />
        <h1 className="mb-10 animate-[fadeInUp_1s_ease-out_0.5s_both]">
          <span className="block font-bold text-4xl md:text-7xl lg:text-8xl text-[#25C760] tracking-wider mb-2.5 [text-shadow:0_0_20px_rgba(37,199,96,0.5)]">MOTHER VEGETABLE PRODUCTS</span>
          <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto my-5 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />
        </h1>
        <div className="animate-[fadeInUp_1s_ease-out_0.8s_both]">
          <p className="text-lg md:text-xl font-light mb-4 opacity-90 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] text-[#25C760]">Vegetable at the beginning of Earth, 3.5 billion years ago</p>
          <p className="text-xl md:text-2xl font-light text-[#25C760] mb-4 [text-shadow:0_0_15px_rgba(37,199,96,0.3)]">&apos;Mother Vegetable&apos;</p>
          <p className="text-base md:text-lg font-light leading-relaxed opacity-95 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] max-w-[600px] mx-auto text-[#25C760]">Earth&apos;s life force, for you.</p>
        </div>
      </div>
    </section>
  );
}
