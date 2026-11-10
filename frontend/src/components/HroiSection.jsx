import React from "react";
import { ArrowRight, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import mainImage from "../../assets/hirosection.jpg";

const HroiSection = () => {
  return (
    <section
      className="relative flex min-h-[600px] items-center overflow-hidden bg-cover bg-center bg-no-repeat md:min-h-[700px]"
      style={{ backgroundImage: `url(${mainImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0B2E26]/75"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
        <div className="max-w-2xl">

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-green-200 backdrop-blur-sm">
            <ShoppingBag size={16} />
            Welcome to DzShopi
          </span>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Everything You Need,
            <span className="block text-[#A7D7B5]">
              All in One Place.
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-base leading-8 text-gray-200 md:text-lg">
            Discover amazing products at great prices.
            Shop your favorite items with a simple,
            fast and secure shopping experience.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/products"
              className="group flex items-center gap-3 rounded-lg bg-[#A7D7B5] px-7 py-4 font-semibold text-[#0B2E26] transition hover:bg-white"
            >
              Shop Now
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="/categories"
              className="rounded-lg border border-white/50 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-[#0B2E26]"
            >
              Explore Categories
            </a>
          </div>

          {/* Features */}
          <div className="mt-12 flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <Truck className="text-[#A7D7B5]" size={27} />
              <div>
                <p className="font-semibold text-white">Fast Delivery</p>
                <p className="text-sm text-gray-300">To Your Door</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#A7D7B5]" size={27} />
              <div>
                <p className="font-semibold text-white">Secure Shopping</p>
                <p className="text-sm text-gray-300">Safe Experience</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HroiSection;