
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  Truck,
  ShieldCheck,
  ShoppingCart,

} from "lucide-react";

const initialCart = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 8500,
    oldPrice: 10000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    color: "Black",
  },
  {
    id: 2,
    name: "Smart Watch Series 8",
    category: "Accessories",
    price: 12500,
    oldPrice: 15000,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    color: "Silver",
  },
  {
    id: 3,
    name: "Premium Backpack",
    category: "Fashion",
    price: 4500,
    oldPrice: 5500,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    color: "Green",
  },
];

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(initialCart);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  const delivery = cart.length > 0 ? 500 : 0;

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal + delivery - discount;

  const formatPrice = (price) =>
    `${price.toLocaleString("en-US")} DA`;

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // Remove product
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setDiscount(0);
    setPromoMessage("");
  };

  // Apply promo code (demo)
  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "DZSHOPI10") {
      const newDiscount = Math.round(subtotal * 0.1);
      setDiscount(newDiscount);
      setPromoMessage("Promo code applied successfully!");
    } else {
      setDiscount(0);
      setPromoMessage("Invalid promo code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">



        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-[#00A86B]">
                <ShoppingCart size={25} />
              </div>
              <h1 className="text-3xl font-bold text-[#0B2E26]">
                Shopping Cart
              </h1>
            </div>

            <p className="text-sm text-gray-500">
              You have {cart.reduce((sum, item) => sum + item.quantity, 0)}{" "}
              items in your cart.
            </p>
          </div>

          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-semibold text-[#00A86B] transition hover:text-[#0B2E26]"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

            {/* Cart Products */}
            <div className="space-y-4 lg:col-span-2">

              <div className="hidden grid-cols-12 rounded-xl bg-[#0B2E26] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white sm:grid">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">

                    {/* Product Info */}
                    <div className="flex gap-4 sm:col-span-6">
                      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-28 sm:w-28">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain mix-blend-multiply"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <span className="mb-1 text-xs font-medium text-[#00A86B]">
                          {item.category}
                        </span>

                        <h3 className="line-clamp-2 font-bold text-[#0B2E26]">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                          Color: {item.color}
                        </p>

                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-sm font-bold text-[#0B2E26] sm:hidden">
                            {formatPrice(item.price)}
                          </span>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1 text-xs font-medium text-red-500 transition hover:text-red-700"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="hidden text-center sm:col-span-2 sm:block">
                      <p className="text-sm font-semibold text-gray-700">
                        {formatPrice(item.price)}
                      </p>
                      <p className="mt-1 text-xs text-gray-400 line-through">
                        {formatPrice(item.oldPrice)}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between sm:col-span-2 sm:justify-center">
                      <span className="text-xs text-gray-500 sm:hidden">
                        Quantity
                      </span>

                      <div className="flex items-center rounded-lg border border-gray-200">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-2 text-gray-500 transition hover:bg-emerald-50 hover:text-[#00A86B]"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="min-w-8 text-center text-sm font-bold text-[#0B2E26]">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-2 text-gray-500 transition hover:bg-emerald-50 hover:text-[#00A86B]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 sm:col-span-2 sm:block sm:border-0 sm:pt-0 sm:text-right">
                      <span className="text-xs text-gray-500 sm:hidden">
                        Total
                      </span>

                      <span className="text-sm font-bold text-[#0B2E26]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))}

              {/* Benefits */}
              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">
                  <Truck className="text-[#00A86B]" size={23} />
                  <div>
                    <p className="text-sm font-semibold text-[#0B2E26]">
                      Fast Delivery
                    </p>
                    <p className="text-xs text-gray-500">
                      Across Algeria
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4">
                  <ShieldCheck className="text-[#00A86B]" size={23} />
                  <div>
                    <p className="text-sm font-semibold text-[#0B2E26]">
                      Secure Payment
                    </p>
                    <p className="text-xs text-gray-500">
                      Safe & Protected
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-6">
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                <div className="bg-[#0B2E26] px-6 py-5 text-white">
                  <h2 className="text-lg font-bold">
                    Order Summary
                  </h2>
                  <p className="mt-1 text-xs text-white/60">
                    Review your order details
                  </p>
                </div>

                <div className="space-y-5 p-6">

                  {/* Promo Code */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Promo Code
                    </label>

                    <div className="flex gap-2">
                      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-gray-200 px-3 focus-within:border-[#00A86B]">
                        <Tag size={17} className="shrink-0 text-gray-400" />

                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="w-full min-w-0 py-3 text-sm outline-none"
                        />
                      </div>

                      <button
                        onClick={applyPromo}
                        className="rounded-xl bg-emerald-50 px-4 text-sm font-bold text-[#00A86B] transition hover:bg-[#00A86B] hover:text-white"
                      >
                        Apply
                      </button>
                    </div>

                    {promoMessage && (
                      <p
                        className={`mt-2 text-xs ${
                          discount > 0 ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {promoMessage}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-gray-400">
                      Try DZSHOPI10 for 10% off.
                    </p>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Prices */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Subtotal
                      </span>
                      <span className="font-semibold text-gray-800">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">
                        Delivery
                      </span>
                      <span className="font-semibold text-gray-800">
                        {formatPrice(delivery)}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">
                          Discount
                        </span>
                        <span className="font-semibold text-green-600">
                          -{formatPrice(discount)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-dashed border-gray-200" />

                  {/* Grand Total */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0B2E26]">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold text-[#00A86B]">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* Checkout */}
                  <button
                    onClick={() => navigate("/checkout")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A86B] py-4 text-sm font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-[#0B2E26] active:scale-[0.98]"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    Secure checkout · Fast delivery
                  </p>

                  <Link
                    to="/products"
                    className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#00A86B]"
                  >
                    <ArrowLeft size={15} />
                    Continue Shopping
                  </Link>

                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="rounded-2xl border border-gray-100 bg-white px-5 py-16 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-[#00A86B]">
              <ShoppingBag size={45} />
            </div>

            <h2 className="text-2xl font-bold text-[#0B2E26]">
              Your Cart is Empty
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Looks like you haven't added anything to your cart yet.
              Discover our products and find something you love!
            </p>

            <Link
              to="/products"
              className="mx-auto mt-7 inline-flex items-center gap-2 rounded-xl bg-[#00A86B] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#0B2E26]"
            >
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
