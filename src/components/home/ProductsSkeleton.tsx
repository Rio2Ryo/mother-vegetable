export default function ProductsSkeleton() {
  return (
    <div className="bg-black border-2 border-[#25C760] rounded-lg p-4 md:p-8 my-5 md:my-5">
      {/* Title */}
      <div className="flex justify-center mb-2 md:mb-4">
        <div className="h-7 md:h-12 w-40 md:w-56 bg-[#25c760]/20 rounded animate-pulse" />
      </div>

      <div className="w-32 md:w-48 h-1 md:h-1.5 bg-[#25c760]/20 mx-auto rounded-full mt-4 md:mt-6 mb-6 md:mb-12" />

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
        {[0, 1].map((i) => (
          <div key={i} className="rounded-lg p-3 md:p-6 border border-[#25c760]/40">
            <div className="flex flex-row md:flex-col gap-3 md:gap-0">
              {/* Video placeholder */}
              <div className="flex-shrink-0 md:mb-4 md:flex md:justify-center">
                <div className="w-24 h-32 md:w-28 md:h-52 bg-[#25c760]/10 rounded-lg animate-pulse" />
              </div>

              {/* Text placeholders */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-5 md:h-8 w-28 md:w-40 bg-[#25c760]/20 rounded animate-pulse md:mx-auto" />
                <div className="h-3 md:h-4 w-20 md:w-28 bg-[#25c760]/10 rounded animate-pulse md:mx-auto" />
                <div className="h-3 md:h-4 w-24 md:w-32 bg-[#25c760]/10 rounded animate-pulse md:mx-auto" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 md:h-5 w-full bg-white/5 rounded animate-pulse" />
                  <div className="h-3 md:h-5 w-3/4 bg-white/5 rounded animate-pulse" />
                </div>
                <div className="mt-3 md:mt-6">
                  <div className="h-4 md:h-5 w-48 md:w-56 bg-[#25c760]/10 rounded animate-pulse mx-auto" />
                </div>
              </div>
            </div>

            {/* Button placeholder */}
            <div className="mt-4 md:mt-6 px-2 md:px-4 pb-1 md:pb-2">
              <div className="h-10 md:h-12 w-full bg-white/10 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
