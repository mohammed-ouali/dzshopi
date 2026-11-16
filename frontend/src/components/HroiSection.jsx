import {
  Tag,
  ArrowRight,
  Play,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  Headset,
} from "lucide-react";

const HeroSection = () => {
  const features = [
    { icon: Truck, title: "Fast Delivery", description: "Across Algeria" },
    { icon: ShieldCheck, title: "Secure Payment", description: "Safe & Protected" },
    { icon: Headset, title: "24/7 Support", description: "Always Here to Help" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[#002d22] text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(0,180,110,0.25),transparent_55%)]" />
      <div className="absolute right-[-60px] top-[-80px] h-[250px] w-[250px] rounded-full border-[20px] border-emerald-500/10 sm:right-[5%] sm:h-[350px] sm:w-[350px] lg:right-[10%] lg:top-[-100px] lg:h-[450px] lg:w-[450px] lg:border-[30px]" />
      <div className="absolute bottom-[-120px] left-[-20%] h-[220px] w-[450px] rotate-[-10deg] rounded-full bg-emerald-500/10 blur-3xl sm:left-[10%] lg:bottom-[-180px] lg:left-[20%] lg:h-[300px] lg:w-[700px]" />

      {/* MAIN CONTAINER */}
<div className="relative flex min-h-[480px] w-full flex-col lg:mx-auto items-center justify-center gap-8 px-5 py-12 sm:px-8 md:flex-row md:gap-28 md:px-10 md:py-10">
        {/* LEFT CONTENT */}
        <div className="z-10 w-full text-center lg:w-[52%] lg:ml-22  lg:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-600/40 px-3 py-1.5 text-xs font-semibold sm:mb-5 sm:px-4 sm:py-2 sm:text-sm">
            <Tag size={16} />
            Mega Sale
          </div>

          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight min-[400px]:text-4xl sm:text-5xl xl:text-6xl">
            Shop Smarter,
            <span className="block text-[#50e65e]">Live Better !</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[460px] text-sm leading-6 text-gray-300 sm:mt-5 sm:text-base lg:mx-0">
            Discover the best products at unbeatable prices with fast delivery
            across Algeria.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col items-center gap-4 min-[480px]:flex-row min-[480px]:justify-center sm:mt-7 sm:gap-5 lg:justify-start">
            <button
              type="button"
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#43df58] px-6 py-3 font-bold text-black transition hover:bg-[#65f477] hover:shadow-[0_0_25px_rgba(67,223,88,0.4)] min-[480px]:w-auto sm:px-7 sm:py-3.5"
            >
              Shop Now
              <ArrowRight size={20} className="transition group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              className="flex items-center gap-3 text-sm font-medium transition hover:text-[#50e65e]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white">
                <Play size={16} fill="currentColor" />
              </span>
              Watch Video
            </button>
          </div>

          {/* SERVICE FEATURES */}
          <div className="mx-auto hidden sm:grid mt-8  max-w-[520px]  gap-4 sm:mt-10 grid-cols-3 sm:gap-3 lg:mx-0 lg:max-w-none">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group flex items-center justify-center gap-3 text-left sm:justify-start"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 transition duration-300 group-hover:bg-[#50e65e] sm:h-11 sm:w-11">
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      className="text-[#50e65e] transition-colors group-hover:text-[#002d22]"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold leading-tight text-white sm:text-sm">
                      {feature.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] leading-tight text-gray-400 sm:text-xs">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative hidden lg:flex min-h-[340px] w-full items-center  justify-center sm:min-h-[400px] lg:w-[42%]">
          {/* Decorative Circle */}
          <div className="absolute h-[240px] w-[240px] rounded-full border border-emerald-400/20 bg-emerald-400/5 sm:h-[300px] sm:w-[300px]" />

          {/* Product Card wrapper (to position the badge relative to the card) */}
          <div className="relative z-10 mt-8 w-full max-w-[290px] sm:mt-10 sm:max-w-[340px]">
            {/* Discount Logo */}
            <div className="absolute -right-6 -top-10 z-20 flex h-[90px] w-[90px] rotate-12 flex-col items-center justify-center rounded-full border-4 border-dashed border-[#002d22] bg-[#50e65e] text-[#002d22] shadow-[0_10px_40px_rgba(80,230,94,0.35)] transition duration-500 hover:rotate-0 sm:-right-8 sm:-top-12 sm:h-[110px] sm:w-[110px] lg:h-[125px] lg:w-[125px] lg:border-[5px]">
              <Zap size={18} fill="currentColor" />
              <span className="text-2xl font-black leading-none sm:text-3xl lg:text-4xl">
                50%
              </span>
              <span className="mt-1 text-[9px] font-extrabold uppercase tracking-widest sm:text-[10px]">
                OFF
              </span>
            </div>

            {/* Card */}
            <div className="w-full rotate-[-3deg] rounded-[24px] border border-white/10 bg-white p-3 text-gray-900 shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition duration-500 hover:rotate-0 hover:scale-[1.03] sm:rounded-[28px] sm:p-4">
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 px-2 py-1 pr-12 sm:py-2 sm:pr-14">
                <div>
                  <p className="text-[10px] font-semibold text-gray-400 sm:text-xs">
                    DZSHOPI EXCLUSIVE
                  </p>
                  <h3 className="text-base font-extrabold sm:text-lg">Special Offer</h3>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative mt-2 flex h-[150px] items-center justify-center overflow-hidden rounded-2xl bg-[#f1f5f2] sm:mt-3 sm:h-[190px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(80,230,94,0.18),transparent_70%)]" />

                {/* Fallback icon (visible if the image fails to load) */}
                <ShoppingBag
                  size={56}
                  className="absolute text-emerald-600/30"
                  aria-hidden="true"
                />

                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30a?w=700"
                  alt="Premium Headphones"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="relative z-10 h-full w-full object-contain p-4 transition duration-500 hover:scale-110"
                />

                <span className="absolute left-3 top-3 z-20 rounded-full bg-[#50e65e] px-2.5 py-1 text-[10px] font-black text-[#002d22] sm:px-3 sm:text-xs">
                  -50% OFF
                </span>
              </div>

              {/* Product Details */}
              <div className="px-2 pb-2 pt-3 sm:pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-green-700 sm:text-xs">
                  Electronics
                </p>
                <h3 className="mt-1 text-lg font-extrabold sm:text-xl">
                  Premium Headphones
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 line-through">12,000 DA</p>
                    <p className="text-xl font-black text-[#087b40] sm:text-2xl">
                      6,000 DA
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="View offer"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#002d22] text-white transition hover:bg-[#50e65e] hover:text-black sm:h-12 sm:w-12"
                  >
                    <ArrowRight size={22} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
