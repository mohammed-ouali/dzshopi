
import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ArrowRight,
  Zap,
} from "lucide-react";

const offers = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    oldPrice: 12000,
    newPrice: 8500,
    discount: 29,
  },
  {
    id: 2,
    name: "Smart Watch Series 8",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    oldPrice: 18000,
    newPrice: 13500,
    discount: 25,
  },
  {
    id: 3,
    name: "Premium Sneakers",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    oldPrice: 15000,
    newPrice: 10500,
    discount: 30,
  },
  {
    id: 4,
    name: "Modern Backpack",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    oldPrice: 9000,
    newPrice: 6500,
    discount: 28,
  },
  {
    id: 5,
    name: "Premium Camera",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    oldPrice: 85000,
    newPrice: 69900,
    discount: 18,
  },
  {
    id: 6,
    name: "Modern Sunglasses",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    oldPrice: 7000,
    newPrice: 4900,
    discount: 30,
  },
    {
    id: 6,
    name: "Modern Sunglasses",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    oldPrice: 7000,
    newPrice: 4900,
    discount: 30,
  },
    {
    id: 6,
    name: "Modern Sunglasses",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    oldPrice: 7000,
    newPrice: 4900,
    discount: 30,
  },
    {
    id: 6,
    name: "Modern Sunglasses",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    oldPrice: 7000,
    newPrice: 4900,
    discount: 30,
  },
  
];

const SpecialOffers = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Zap size={18} className="text-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-wider text-emerald-600">
                Don't Miss Out
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Special Offers
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Discover amazing deals and save more on your favorite products.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-[#0B2E26] hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-[#0B2E26] hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Products Slider */}
        <div
          ref={sliderRef}
          className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-5 scrollbar-hide"
        >
          {offers.map((product) => (
            <div
              key={product.id}
              className="group w-[80%] min-w-[80%] snap-start overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-[45%] sm:min-w-[45%] lg:w-[31%] lg:min-w-[31%] xl:w-[calc((100%-100px)/6)] xl:min-w-[calc((100%-100px)/6)]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-3 top-3 rounded-lg bg-red-500 px-2.5 py-1.5 text-xs font-bold text-white">
                  -{product.discount}%
                </span>

                <span className="absolute right-3 top-3 rounded-lg bg-white px-2 py-1.5 text-[10px] font-semibold text-[#0B2E26] shadow-sm">
                  Special Deal
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-gray-400">
                  {product.category}
                </p>

                <h3 className="mb-3 min-h-10 text-sm font-bold text-gray-900 transition group-hover:text-emerald-700">
                  {product.name}
                </h3>

                {/* Prices */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="text-base font-extrabold text-[#0B2E26]">
                    {product.newPrice.toLocaleString("en-US")} DA
                  </span>

                  <span className="text-xs text-gray-400 line-through">
                    {product.oldPrice.toLocaleString("en-US")} DA
                  </span>
                </div>

                {/* Add to Cart */}
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2E26] py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700">
                  <ShoppingCart size={15} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 rounded-xl border border-[#0B2E26] px-7 py-3 text-sm font-bold text-[#0B2E26] transition hover:bg-[#0B2E26] hover:text-white">
            View All Offers
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default SpecialOffers;
