import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

export default async function HealthcarePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        <h1 className="text-center font-bold text-3xl md:text-4xl text-[#25C760] tracking-wider mb-2">Healthcare</h1>
        <h2 className="text-center text-white/80 text-lg mb-2">For Hospital &amp; Medical Institutions</h2>
        <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />

        <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-8">
          <h3 className="text-[#25C760] font-bold text-xl mb-4 text-center">Medical-Grade Quasi-Drug Certification</h3>
          <p className="text-white text-sm md:text-base leading-relaxed opacity-90 mb-6 text-center max-w-[800px] mx-auto">
            Mother Vegetable Confidence is certified as a medical-grade quasi-drug under the Japanese Standards of Quasi-Drug Ingredients (JSQI) by the Ministry of Health, Labour and Welfare (MHLW), Japan. It is trusted by medical institutions worldwide for its healing properties.
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            {['jfrl', 'gmp', 'haccp'].map((cert) => (
              <Image
                key={cert}
                src={`/Images/medical/${cert}.png`}
                alt={cert.toUpperCase()}
                width={120}
                height={120}
                className="w-[120px] h-auto object-contain"
              />
            ))}
          </div>
        </div>

        <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-8">
          <h3 className="text-[#25C760] font-bold text-xl mb-4">Applications</h3>
          <div className="space-y-4">
            {[
              { title: 'Post-Surgery Recovery', desc: 'Accelerates wound healing and reduces scar formation after surgical procedures.' },
              { title: 'Burn Treatment', desc: 'Supports skin regeneration and reduces visible scarring from burn injuries.' },
              { title: 'Cancer Care', desc: 'Assists in managing skin side effects from radiation and chemotherapy treatments.' },
              { title: 'Dermatological Treatments', desc: 'Helps improve various skin conditions including eczema, psoriasis, and chronic dermatitis.' },
              { title: 'Anti-Aging Therapy', desc: 'Promotes cellular regeneration and reduces visible signs of aging.' },
            ].map((app) => (
              <div key={app.title} className="flex items-start gap-3">
                <span className="text-[#25C760] font-bold text-lg shrink-0">&#10003;</span>
                <div>
                  <h4 className="text-[#25C760] font-semibold text-base">{app.title}</h4>
                  <p className="text-white text-sm opacity-90">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10">
          <h3 className="text-[#25C760] font-bold text-xl mb-4 text-center">Contact for B2B Inquiries</h3>
          <p className="text-white text-center text-sm opacity-90">
            For hospital and medical institution partnerships, please contact us through our official channels.
          </p>
        </div>
      </div>
    </div>
  );
}
