import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

export default async function SignupPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center py-8 px-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/Images/Assets/General/logo.png" alt="Mother Vegetable" width={150} height={75} className="mx-auto mb-4" />
          <h1 className="text-[#25C760] font-bold text-2xl">Sign Up</h1>
        </div>

        <div className="bg-black border-2 border-[#25C760] rounded-xl p-6 md:p-8">
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#25C760] font-semibold text-sm mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-3 bg-black border-2 border-[#25C760] rounded-md text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
                />
              </div>
              <div>
                <label className="block text-[#25C760] font-semibold text-sm mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-3 bg-black border-2 border-[#25C760] rounded-md text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#25C760] font-semibold text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-black border-2 border-[#25C760] rounded-md text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
              />
            </div>
            <div>
              <label className="block text-[#25C760] font-semibold text-sm mb-2">Phone</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 bg-black border-2 border-[#25C760] rounded-md text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
              />
            </div>
            <div>
              <label className="block text-[#25C760] font-semibold text-sm mb-2">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-black border-2 border-[#25C760] rounded-md text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
              />
            </div>
            <div>
              <label className="block text-[#25C760] font-semibold text-sm mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 bg-black border-2 border-[#25C760] rounded-md text-white text-sm outline-none focus:border-[#3C8063] focus:shadow-[0_0_0_0.2rem_rgba(37,199,96,0.25)] transition-all placeholder-white/60"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#25C760] to-[#3C8063] text-white font-semibold py-3 rounded-md border-none cursor-pointer hover:opacity-90 transition-all text-base"
            >
              SIGN UP
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-[rgba(37,199,96,0.3)]" />
            <span className="text-white/50 text-sm">OR</span>
            <div className="flex-1 h-px bg-[rgba(37,199,96,0.3)]" />
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 rounded-md border-none cursor-pointer hover:opacity-90 transition-all text-sm">
              <Image src="/Images/Authenticate/google_logo.png" alt="Google" width={20} height={20} />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white font-semibold py-3 rounded-md border-none cursor-pointer hover:opacity-90 transition-all text-sm">
              <Image src="/Images/Authenticate/fb_logo.png" alt="Facebook" width={20} height={20} />
              Continue with Facebook
            </button>
          </div>

          <p className="text-center text-white/70 text-sm mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-[#25C760] font-semibold hover:underline no-underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
