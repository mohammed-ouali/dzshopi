
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Package,
  HeartOff,
} from "lucide-react";

// Temporary wishlist products
// Replace these products with your Redux wishlist later.
const initialWishlist = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 8500,
    oldPrice: 10500,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Watch Series 8",
    category: "Electronics",
    price: 12500,
    oldPrice: 15000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    inStock: true,
  },
  {
    id: 3,
    name: "Modern Backpack",
    category: "Fashion",
    price: 4200,
    oldPrice: 5200,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    inStock: true,
  },
  {
    id: 4,
    name: "Premium Camera",
    category: "Electronics",
    price: 68000,
    oldPrice: null,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    inStock: false,
  },
];

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [cartMessage, setCartMessage] = useState("");

  const removeFromWishlist = (id) => {
    setWishlist((current) =>
      current.filter((product) => product.id !== id)
    );
  };

  const addToCart = (product) => {
    // Connect this function to your Redux cart action.
    setCartMessage(`${product.name} added to cart!`);

    setTimeout(() => {
      setCartMessage("");
    }, 2500);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const formatPrice = (price) => {
    return `${price.toLocaleString("en-US")} DA`;
  };

  return (
    <main className="min-h-screen bg-[#f8faf9] px-4 py-10 sm:px-6 lg:px-10">

      <div className="mx-auto max-w-7xl">



        {/* HEADER */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <div className="mb-3 flex items-center gap-2 text-[#00A86B]">
              <Heart size={19} fill="currentColor" />
              <span className="text-xs font-bold uppercase tracking-[2px]">
                Your Favorites
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#10251D] sm:text-4xl lg:text-5xl">
              My Wishlist
              <span className="ml-3 text-lg font-semibold text-gray-300">
                ({wishlist.length})
              </span>
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Keep the products you love in one place.
            </p>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs font-bold text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 sm:self-auto"
            >
              <Trash2 size={15} />
              Clear Wishlist
            </button>
          )}

        </div>

        {/* CART MESSAGE */}
        {cartMessage && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-semibold text-[#008653]">
            <ShoppingCart size={18} />
            {cartMessage}
          </div>
        )}

        {/* WISHLIST CONTENT */}
        {wishlist.length === 0 ? (

          /* EMPTY WISHLIST */
          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-20 text-center shadow-sm">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-[#00A86B]">
              <HeartOff size={42} strokeWidth={1.5} />
            </div>

            <h2 className="mt-7 text-2xl font-black text-[#10251D]">
              Your Wishlist is Empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-gray-500">
              You haven't saved any products yet. Explore our collection
              and add your favorite products to your wishlist.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#002d22] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#00A86B]"
            >
              <ShoppingBag size={18} />
              Explore Products
              <ArrowRight size={17} />
            </Link>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

            {/* PRODUCTS */}
            <section className="space-y-4">

              {wishlist.map((product) => (
                <article
                  key={product.id}
                  className="group relative flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-300 hover:border-emerald-100 hover:shadow-lg sm:flex-row sm:items-center sm:p-5"
                >

                  {/* PRODUCT IMAGE */}
                  <Link
                    to={`/product/${product.id}`}
                    className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-36 sm:w-36"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {!product.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <span className="rounded-full bg-white px-3 py-2 text-[10px] font-bold text-gray-700">
                          OUT OF STOCK
                        </span>
                      </div>
                    )}
                  </Link>

                  {/* PRODUCT DETAILS */}
                  <div className="min-w-0 flex-1">

                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#00A86B]">
                      {product.category}
                    </span>

                    <Link to={`/product/${product.id}`}>
                      <h3 className="mt-2 text-lg font-bold text-[#10251D] transition hover:text-[#00A86B]">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="text-lg font-black text-[#10251D]">
                        {formatPrice(product.price)}
                      </span>

                      {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          product.inStock
                            ? "bg-emerald-500"
                            : "bg-red-400"
                        }`}
                      />
                      <span
                        className={`text-xs font-medium ${
                          product.inStock
                            ? "text-emerald-600"
                            : "text-red-500"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">

                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#002d22] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#00A86B] disabled:cursor-not-allowed disabled:bg-gray-300 sm:flex-none"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition hover:border-red-100 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </article>
              ))}

            </section>

            {/* SUMMARY */}
            <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#00A86B]">
                  <Heart size={21} />
                </div>

                <div>
                  <h3 className="font-black text-[#10251D]">
                    Wishlist Summary
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Your saved products
                  </p>
                </div>
              </div>

              <div className="my-6 h-px bg-gray-100" />

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Total Products</span>
                <span className="font-bold text-[#10251D]">
                  {wishlist.length}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500">Available Products</span>
                <span className="font-bold text-emerald-600">
                  {wishlist.filter((product) => product.inStock).length}
                </span>
              </div>

              <div className="my-6 h-px bg-gray-100" />

              <div className="rounded-xl bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-[#008653]">
                  <Package size={17} />
                  <span className="text-xs font-bold">
                    Save your favorites
                  </span>
                </div>

                <p className="mt-2 text-xs leading-6 text-gray-600">
                  Keep your favorite products here and come back whenever
                  you're ready to shop.
                </p>
              </div>

              <Link
                to="/products"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3.5 text-xs font-bold text-[#10251D] transition hover:border-[#00A86B] hover:text-[#00A86B]"
              >
                Continue Shopping
                <ArrowRight size={16} />
              </Link>

            </aside>

          </div>
        )}

        {/* BOTTOM LINK */}
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#00A86B]"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}
