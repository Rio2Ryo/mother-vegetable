import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

export default async function CertifiedInstructorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        <h1 className="text-center font-bold text-3xl md:text-4xl text-[#25C760] tracking-wider mb-2">Certified Instructor</h1>
        <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />

        <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-8">
          <h3 className="text-[#25C760] font-bold text-xl mb-4 text-center">Become a Mother Vegetable Certified Instructor</h3>
          <p className="text-white text-sm md:text-base leading-relaxed opacity-90 mb-6 text-center max-w-[800px] mx-auto">
            Join our network of certified instructors and help spread the benefits of Mother Vegetable products around the world. As a certified instructor, you will receive comprehensive training, exclusive resources, and the opportunity to build a meaningful business while improving people&apos;s health.
          </p>

          <div className="flex justify-center mb-8">
            <Image
              src="/Images/Assets/mv/groupStructure_img.png"
              alt="Group Structure"
              width={600}
              height={400}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>

        <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-8">
          <h3 className="text-[#25C760] font-bold text-xl mb-6">Benefits of Becoming a Certified Instructor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Comprehensive Training', desc: 'Receive in-depth product knowledge and sales training from our expert team.' },
              { title: 'Exclusive Resources', desc: 'Access marketing materials, product samples, and business tools.' },
              { title: 'Earning Potential', desc: 'Build your own business with attractive commission structures.' },
              { title: 'Global Network', desc: 'Connect with instructors worldwide and expand your professional network.' },
              { title: 'Product Discounts', desc: 'Enjoy special pricing on all Mother Vegetable products.' },
              { title: 'Ongoing Support', desc: 'Receive continuous mentorship and support from the Mother Vegetable team.' },
            ].map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-3">
                <span className="text-[#25C760] font-bold text-lg shrink-0">&#10003;</span>
                <div>
                  <h4 className="text-[#25C760] font-semibold text-base">{benefit.title}</h4>
                  <p className="text-white text-sm opacity-90">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
