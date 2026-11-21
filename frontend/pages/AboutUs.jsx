
import {
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  Heart,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    number: "01",
    label: "Technology",
    title: "Electronics & IT",
    description:
      "Discover the latest technology, smart devices and accessories.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700",
    color: "bg-[#DDF8EF]",
    link: "/category/Electronics",
  },
  {
    id: 2,
    number: "02",
    label: "Lifestyle",
    title: "Fashion & Style",
    description:
      "Explore modern fashion and everyday essentials for everyone.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700",
    color: "bg-[#FFF0E3]",
    link: "/category/Fashion%20%26%20Clothing",
  },
  {
    id: 3,
    number: "03",
    label: "Your Home",
    title: "Home & Kitchen",
    description:
      "Make your home more comfortable with useful everyday products.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700",
    color: "bg-[#F1EDFF]",
    link: "/category/Home%20%26%20Kitchen",
  },
  {
    id: 4,
    number: "04",
    label: "Daily Needs",
    title: "Food & Groceries",
    description:
      "Find everyday essentials and products for your daily needs.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=700",
    color: "bg-[#FFF2DF]",
    link: "/category/Food%20%26%20Groceries",
  },
];

const services = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Delivery across Algeria.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Safe and protected shopping.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "We're here to help you.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction matters.",
  },
];

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-[#F3F1E9] px-3 py-5 sm:px-6 sm:py-8 lg:px-10">

      <div className="mx-auto max-w-[1450px] overflow-hidden rounded-[24px] bg-white p-4 shadow-sm sm:rounded-[30px] sm:p-6 lg:p-8">

        {/* HERO SECTION */}
        <section className="relative min-h-[340px] overflow-hidden rounded-2xl bg-[#002d22] sm:min-h-[390px] lg:min-h-[430px]">



          <div className="absolute inset-0 bg-gradient-to-r from-[#002d22] via-[#002d22]/90 to-transparent" />

          <div className="relative z-10 flex min-h-[340px] max-w-2xl flex-col justify-center px-6 py-12 text-white sm:min-h-[390px] sm:px-10 lg:min-h-[430px] lg:px-12">

            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-semibold text-emerald-300 sm:text-sm">
              <ShoppingBag size={16} />
              Welcome to DzShopi
            </span>

            <h1 className="max-w-xl text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Shopping Made
              <span className="block text-[#50e65e]">
                Simple & Better.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-200 sm:text-base">
              Discover a world of products, great prices and
              an easier shopping experience. Everything you
              need, all in one place.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#002d22] transition hover:bg-[#50e65e]"
            >
              Explore Products
              <ArrowRight size={17} />
            </Link>

          </div>
        </section>

        {/* ABOUT INTRO */}
        <section className="grid gap-8 py-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">

          <div>
            <span className="mb-3 block text-sm font-bold uppercase tracking-widest text-[#00A86B]">
              About DzShopi
            </span>

            <h2 className="max-w-lg text-4xl font-black leading-[1.08] tracking-tight text-[#10251D] sm:text-5xl lg:text-[58px]">
              Your World.
              <span className="block text-[#00A86B]">
                Your Shopping.
              </span>
              Your Way.
            </h2>

            <p className="mt-5 text-sm font-medium text-gray-500">
              Shop Smarter, Live Better!
            </p>
          </div>

          <div className="lg:pl-5">

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              At DzShopi, we believe shopping should be simple,
              convenient and enjoyable. Our goal is to bring
              different product categories together in one place
              and make it easier for everyone to find what they need.
            </p>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              From electronics and fashion to home essentials
              and everyday products, we want to make your
              shopping experience better with quality products,
              competitive prices and delivery across Algeria.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#0B2E26] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00A86B]"
            >
              Start Shopping
              <ArrowRight size={17} />
            </Link>

          </div>
        </section>

        {/* CATEGORY CARDS */}
        <section className="pb-12 sm:pb-16">

          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#00A86B]">
                Discover More
              </span>

              <h2 className="mt-2 text-2xl font-black text-[#10251D] sm:text-3xl">
                Everything You Need
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Explore our wide range of shopping categories.
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#00A86B] transition hover:gap-3"
            >
              View All Products
              <ArrowRight size={17} />
            </Link>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {categories.map((item) => (
              <article
                key={item.id}
                className={`group overflow-hidden rounded-2xl ${item.color}`}
              >

                {/* CARD CONTENT */}
                <div className="flex min-h-[175px] flex-col p-5">

                  <div className="mb-5 flex items-center justify-between">

                    <span className="rounded-full bg-white/80 px-3 py-1.5 text-[10px] font-bold text-gray-700">
                      {item.number} / {item.label}
                    </span>

                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[#00A86B] transition group-hover:bg-[#00A86B] group-hover:text-white">
                      <ArrowRight size={15} />
                    </span>

                  </div>

                  <h3 className="text-xl font-black text-[#10251D]">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-[260px] text-xs leading-5 text-gray-600">
                    {item.description}
                  </p>

                </div>

                {/* CARD IMAGE */}
                <div className="relative h-40 overflow-hidden sm:h-44">

                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  <Link
                    to={item.link}
                    className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#10251D] backdrop-blur-sm transition hover:bg-[#00A86B] hover:text-white"
                  >
                    Explore
                    <ArrowRight size={13} />
                  </Link>

                </div>

              </article>
            ))}

          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="rounded-2xl bg-[#002d22] px-5 py-10 text-white sm:px-8 sm:py-12 lg:px-10">

          <div className="mb-9 text-center">

            <span className="text-xs font-bold uppercase tracking-widest text-[#50e65e]">
              Why DzShopi?
            </span>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Shopping With Confidence
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-300">
              We focus on making every step of your shopping
              experience simple, convenient and reliable.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00A86B]/20 text-[#50e65e]">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-4 text-base font-bold">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-300">
                    {service.description}
                  </p>

                </div>
              );
            })}

          </div>
        </section>

        {/* FINAL CTA */}
        <section className="flex flex-col items-center justify-between gap-6 py-12 text-center sm:py-16 lg:flex-row lg:text-left">

          <div>
            <div className="flex items-center justify-center gap-2 text-[#00A86B] lg:justify-start">
              <Sparkles size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Your Shopping Journey Starts Here
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-black text-[#10251D] sm:text-3xl">
              Ready to Discover DzShopi?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Find your favorite products and enjoy shopping.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#00A86B] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#008F5B]"
          >
            Shop Now
            <ArrowRight size={18} />
          </Link>

        </section>

      </div>
    </main>
  );
}
