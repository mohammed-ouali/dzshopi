
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

const HroiSection = () => {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Across Algeria",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      description: "Safe & Protected",
    },
    {
      icon: Headset,
      title: "24/7 Support",
      description: "Always Here to Help",
    },
  ];

  return (
    <section className="relative w-full min-h-[480px] overflow-hidden bg-[#002d22] text-white">

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(0,180,110,0.25),transparent_55%)]" />

      <div className="absolute right-[10%] top-[-100px] h-[450px] w-[450px] rounded-full border-[30px] border-emerald-500/10" />

      <div className="absolute bottom-[-180px] left-[20%] h-[300px] w-[700px] rotate-[-10deg] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[480px] max-w-[1400px] flex-col items-center justify-between gap-12 px-6 py-12 md:flex-row md:px-14 md:py-10">

        {/* LEFT CONTENT */}
        <div className="z-10 w-full md:w-[48%]">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-600/40 px-4 py-2 text-sm font-semibold">
            <Tag size={17} />
            Mega Sale 🔥
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            Shop Smarter,
            <span className="block text-[#50e65e]">
              Live Better !
            </span>
          </h1>

          <p className="mt-5 max-w-[400px] text-sm leading-6 text-gray-300 sm:text-base">
            Discover the best products at unbeatable prices
            with fast delivery across Algeria.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-5">

            <button className="group flex items-center gap-3 rounded-full bg-[#43df58] px-7 py-3.5 font-bold text-black transition hover:bg-[#65f477] hover:shadow-[0_0_25px_rgba(67,223,88,0.4)]">
              Shop Now
              <ArrowRight
                size={20}
                className="transition group-hover:translate-x-1"
              />
            </button>

            <button className="flex items-center gap-3 text-sm font-medium transition hover:text-[#50e65e]">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white">
                <Play size={16} fill="currentColor" />
              </span>
              Watch Video
            </button>

          </div>

          {/* SERVICE FEATURES */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4">

            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="group flex items-center gap-3"
                >

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 transition duration-300 group-hover:bg-[#50e65e]">
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      className="text-[#50e65e] transition-colors group-hover:text-[#002d22]"
                    />
                  </div>

                  <div>
                    <h3 className="whitespace-nowrap text-xs font-bold text-white sm:text-sm">
                      {feature.title}
                    </h3>

                    <p className="mt-1 whitespace-nowrap text-[10px] text-gray-400 sm:text-xs">
                      {feature.description}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="relative flex min-h-[350px] w-full items-center justify-center md:w-[48%]">

          {/* Decorative Circle */}
          <div className="absolute right-[5%] top-[5%] h-[300px] w-[300px] rounded-full border border-emerald-400/20 bg-emerald-400/5" />

          {/* Discount Logo */}
          <div className="absolute right-[2%] top-0 z-20 flex h-[125px] w-[125px] rotate-12 flex-col items-center justify-center rounded-full border-[5px] border-dashed border-[#002d22] bg-[#50e65e] text-[#002d22] shadow-[0_10px_40px_rgba(80,230,94,0.35)] transition duration-500 hover:rotate-0 md:right-[5%]">

            <Zap size={21} fill="currentColor" />

            <span className="text-4xl font-black leading-none">
              50%
            </span>

            <span className="mt-1 text-[10px] font-extrabold uppercase tracking-widest">
              OFF
            </span>

          </div>

          {/* Product Card */}
          <div className="relative z-10 mt-10 w-full max-w-[340px] rotate-[-3deg] rounded-[28px] border border-white/10 bg-white p-4 text-gray-900 shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition duration-500 hover:rotate-0 hover:scale-[1.03]">

            {/* Card Header */}
            <div className="flex items-center justify-between px-2 py-2">
              <div>
                <p className="text-xs font-semibold text-gray-400">
                  DZSHOPI EXCLUSIVE
                </p>
                <h3 className="text-lg font-extrabold">
                  Special Offer
                </h3>
              </div>

              <div className="rounded-full bg-green-100 p-3 text-green-700">
                <ShoppingBag size={21} />
              </div>
            </div>

            {/* Product Image */}
            <div className="relative mt-3 flex h-[190px] items-center justify-center overflow-hidden rounded-2xl bg-[#f1f5f2]">

              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(80,230,94,0.18),transparent_70%)]" />

              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30a?w=700"
                alt="Premium Headphones"
                className="relative z-10 h-full w-full object-contain p-4 transition duration-500 hover:scale-110"
              />

              <span className="absolute left-3 top-3 z-20 rounded-full bg-[#50e65e] px-3 py-1 text-xs font-black text-[#002d22]">
                -50% OFF
              </span>

            </div>

            {/* Product Details */}
            <div className="px-2 pb-2 pt-4">

              <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Electronics
              </p>

              <h3 className="mt-1 text-xl font-extrabold">
                Premium Headphones
              </h3>

              <div className="mt-3 flex items-center justify-between">

                <div>
                  <p className="text-xs text-gray-400 line-through">
                    12,000 DA
                  </p>

                  <p className="text-2xl font-black text-[#087b40]">
                    6,000 DA
                  </p>
                </div>

                <button className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#002d22] text-white transition hover:bg-[#50e65e] hover:text-black">
                  <ArrowRight size={22} />
                </button>

              </div>

            </div>
          </div>



        </div>

      </div>
    </section>
  );
};

export default HroiSection;
