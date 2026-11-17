import { useState } from "react";
import {
  ShoppingCart,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const offers = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    oldPrice: 12000,
    price: 8500,
    discount: 29,
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    oldPrice: 18000,
    price: 12500,
    discount: 30,
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    oldPrice: 15000,
    price: 9500,
    discount: 37,
  },
  {
    id: 4,
    name: "Premium Backpack",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    oldPrice: 10000,
    price: 6500,
    discount: 35,
  },
  {
    id: 5,
    name: "Digital Camera",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    oldPrice: 60000,
    price: 45000,
    discount: 25,
  },
  {
    id: 6,
    name: "Modern Sunglasses",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600",
    oldPrice: 7000,
    price: 4500,
    discount: 36,
  },
  {
    id: 7,
    name: "Wireless Speaker",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    oldPrice: 11000,
    price: 7500,
    discount: 32,
  },
  {
    id: 8,
    name: "Classic Wrist Watch",
    category: "Jewelry & Watches",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
    oldPrice: 20000,
    price: 14000,
    discount: 30,
  },
  {
    id: 9,
    name: "Gaming Headset",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=600",
    oldPrice: 14000,
    price: 9900,
    discount: 29,
  },
  {
    id: 10,
    name: "Laptop Backpack",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600",
    oldPrice: 12000,
    price: 8000,
    discount: 33,
  },
  {
    id: 11,
    name: "Mechanical Keyboard",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
    oldPrice: 16000,
    price: 11500,
    discount: 28,
  },
  {
    id: 12,
    name: "Gaming Mouse",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
    oldPrice: 8500,
    price: 5900,
    discount: 31,
  },
  {
    id: 13,
    name: "Leather Handbag",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
    oldPrice: 18000,
    price: 12500,
    discount: 30,
  },
  {
    id: 14,
    name: "Bluetooth Earbuds",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600",
    oldPrice: 9500,
    price: 6500,
    discount: 32,
  },
  {
    id: 15,
    name: "Sport Sneakers",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=600",
    oldPrice: 17000,
    price: 11900,
    discount: 30,
  },
  {
    id: 16,
    name: "Portable Speaker",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600",
    oldPrice: 13000,
    price: 8900,
    discount: 32,
  },
  {
    id: 17,
    name: "Luxury Sunglasses",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
    oldPrice: 9000,
    price: 6200,
    discount: 31,
  },
  {
    id: 18,
    name: "Smartphone",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    oldPrice: 85000,
    price: 72000,
    discount: 15,
  },
  {
    id: 19,
    name: "Digital Watch",
    category: "Jewelry & Watches",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600",
    oldPrice: 15000,
    price: 10500,
    discount: 30,
  },
  {
    id: 20,
    name: "Tablet",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600",
    oldPrice: 65000,
    price: 52000,
    discount: 20,
  },
  {
    id: 21,
    name: "Travel Backpack",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600",
    oldPrice: 14000,
    price: 9800,
    discount: 30,
  },
  {
    id: 22,
    name: "Wireless Mouse",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600",
    oldPrice: 7000,
    price: 4900,
    discount: 30,
  },
  {
    id: 23,
    name: "Leather Wallet",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
    oldPrice: 6000,
    price: 4200,
    discount: 30,
  },
  {
    id: 24,
    name: "DSLR Camera",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    oldPrice: 95000,
    price: 76000,
    discount: 20,
  },
  {
    id: 25,
    name: "Fitness Smartwatch",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600",
    oldPrice: 22000,
    price: 15500,
    discount: 30,
  },
  {
    id: 26,
    name: "Casual Sneakers",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600",
    oldPrice: 13000,
    price: 9100,
    discount: 30,
  },
  {
    id: 27,
    name: "Gaming Controller",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600",
    oldPrice: 16000,
    price: 11200,
    discount: 30,
  },
  {
    id: 28,
    name: "Gold Necklace",
    category: "Jewelry & Watches",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600",
    oldPrice: 25000,
    price: 19000,
    discount: 24,
  },
  {
    id: 29,
    name: "Laptop",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    oldPrice: 145000,
    price: 125000,
    discount: 14,
  },
  {
    id: 30,
    name: "Travel Suitcase",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600",
    oldPrice: 22000,
    price: 16500,
    discount: 25,
  },
];

const SpecialOffers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;
  const totalPages = Math.ceil(offers.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentOffers = offers.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full overflow-hidden bg-white px-5 py-5 sm:px-8 lg:px-12">

      {/* Header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Zap size={18} className="text-emerald-600" />

            <span className="text-sm font-bold uppercase tracking-wider text-emerald-600">
              Discover More
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Our Collection
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Discover a wide range of products for your everyday needs.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
        {currentOffers.map((offer) => (
          <div
            key={offer.id}
            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={offer.image}
                alt={offer.name}
                loading="lazy"
                className="h-40 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
              />

              <span className="absolute left-2 top-2 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-bold text-white sm:left-3 sm:top-3">
                -{offer.discount}%
              </span>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
              <p className="mb-1 text-xs  font-semibold text-emerald-600">
                {offer.category}
              </p>

              <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base">
                {offer.name}
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-base font-extrabold text-gray-900 sm:text-lg">
                  {offer.price.toLocaleString()} DA
                </span>

                <span className="text-xs text-gray-400 line-through sm:text-sm">
                  {offer.oldPrice.toLocaleString()} DA
                </span>
              </div>

              <button className="mt-4 flex w-full hover items-center hover:cursor-pointer  justify-center gap-2 rounded-xl bg-[#0B2E26] py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600 sm:py-3 sm:text-sm">
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-10 items-center gap-1  hover:cursor-pointer rounded-xl border border-gray-200 px-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={17} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={`h-10 w-10 rounded-xl text-sm hover:cursor-pointer font-bold transition ${
                currentPage === page
                  ? "bg-[#0B2E26] text-white shadow-md"
                  : "border border-gray-200 text-gray-700 hover:border-emerald-600 hover:text-emerald-600"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-10 items-center gap-1 hover:cursor-pointer rounded-xl border border-gray-200 px-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={17} />
        </button>
      </div>

      {/* Products Count */}
      <p className="mt-4 text-center text-sm text-gray-400">
        Showing {startIndex + 1} -{" "}
        {Math.min(startIndex + productsPerPage, offers.length)} of{" "}
        {offers.length} offers
      </p>
    </section>
  );
};

export default SpecialOffers;