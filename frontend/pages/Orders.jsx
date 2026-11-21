
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Search,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  CalendarDays,
  CreditCard,
} from "lucide-react";

const initialOrders = [
  {
    id: "DZ-2026-001",
    date: "November 18, 2026",
    status: "Delivered",
    total: 18500,
    payment: "Cash on Delivery",
    address: "Algiers, Algeria",
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
        price: 8500,
        quantity: 1,
      },
      {
        id: 2,
        name: "Smart Watch",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
        price: 10000,
        quantity: 1,
      },
    ],
  },
  {
    id: "DZ-2026-002",
    date: "November 19, 2026",
    status: "Shipped",
    total: 12500,
    payment: "Cash on Delivery",
    address: "Oran, Algeria",
    items: [
      {
        id: 3,
        name: "Smart Watch Series",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
        price: 12500,
        quantity: 1,
      },
    ],
  },
  {
    id: "DZ-2026-003",
    date: "November 20, 2026",
    status: "Processing",
    total: 4200,
    payment: "Cash on Delivery",
    address: "Constantine, Algeria",
    items: [
      {
        id: 4,
        name: "Modern Backpack",
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
        price: 4200,
        quantity: 1,
      },
    ],
  },
  {
    id: "DZ-2026-004",
    date: "November 15, 2026",
    status: "Cancelled",
    total: 68000,
    payment: "Cash on Delivery",
    address: "Blida, Algeria",
    items: [
      {
        id: 5,
        name: "Premium Camera",
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300",
        price: 68000,
        quantity: 1,
      },
    ],
  },
];

const filters = [
  "All",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const statusStyles = {
  Processing: "bg-amber-50 text-amber-700 border-amber-100",
  Shipped: "bg-blue-50 text-blue-700 border-blue-100",
  Delivered: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Cancelled: "bg-red-50 text-red-600 border-red-100",
};

function StatusBadge({ status }) {
  const icons = {
    Processing: Clock,
    Shipped: Truck,
    Delivered: CheckCircle2,
    Cancelled: XCircle,
  };

  const StatusIcon = icons[status] || Package;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold ${statusStyles[status]}`}
    >
      <StatusIcon size={13} />
      {status}
    </span>
  );
}



export default function Orders() {
  const [orders] = useState(initialOrders);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const formatPrice = (price) =>
    `${price.toLocaleString("en-US")} DA`;

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      activeFilter === "All" || order.status === activeFilter;

    const matchesSearch = order.id
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getCount = (status) => {
    if (status === "All") return orders.length;

    return orders.filter((order) => order.status === status).length;
  };

  return (
    <main className="min-h-screen bg-[#f8faf9] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">



        {/* HEADER */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[#00A86B]">
              <Package size={19} />
              <span className="text-xs font-bold uppercase tracking-[2px]">
                Order History
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-[#10251D] sm:text-4xl lg:text-5xl">
              My Orders
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Track, manage and review all your purchases.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#002d22] px-5 py-3.5 text-xs font-bold text-white transition hover:bg-[#00A86B] sm:self-auto"
          >
            <ShoppingBag size={16} />
            Continue Shopping
          </Link>
        </div>

        {/* STATISTICS */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "Total Orders",
              value: orders.length,
              icon: Package,
              color: "text-[#00A86B]",
              bg: "bg-emerald-50",
            },
            {
              label: "Processing",
              value: getCount("Processing"),
              icon: Clock,
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
            {
              label: "Shipped",
              value: getCount("Shipped"),
              icon: Truck,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Delivered",
              value: getCount("Delivered"),
              icon: CheckCircle2,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
          ].map((item) => {
            const ItemIcon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                  >
                    <ItemIcon size={20} />
                  </div>

                  <span className="text-2xl font-black text-[#10251D]">
                    {item.value}
                  </span>
                </div>

                <p className="mt-4 text-xs font-semibold text-gray-500">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* FILTERS + SEARCH */}
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex gap-2 overflow-x-auto pb-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition ${
                    activeFilter === filter
                      ? "bg-[#002d22] text-white"
                      : "bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-[#00A86B]"
                  }`}
                >
                  {filter}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                      activeFilter === filter
                        ? "bg-white/15 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {getCount(filter)}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search order number..."
                className="w-full rounded-xl border border-gray-200 bg-[#fbfdfc] py-3 pl-11 pr-4 text-xs outline-none transition focus:border-[#00A86B] focus:ring-4 focus:ring-emerald-50"
              />
            </div>

          </div>
        </div>

        {/* ORDERS LIST */}
        <div className="space-y-5">

          {filteredOrders.length === 0 ? (
            <div className="rounded-3xl border border-gray-100 bg-white px-6 py-20 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-[#00A86B]">
                <ShoppingBag size={35} />
              </div>

              <h2 className="mt-6 text-xl font-black text-[#10251D]">
                No Orders Found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                No orders match your search or selected filter.
              </p>

              <button
                onClick={() => {
                  setActiveFilter("All");
                  setSearch("");
                }}
                className="mt-6 rounded-full bg-[#002d22] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#00A86B]"
              >
                Clear Filters
              </button>
            </div>
          ) : (

            filteredOrders.map((order) => {
              const isExpanded = expandedOrder === order.id;

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                >

                  {/* ORDER HEADER */}
                  <div className="flex flex-col justify-between gap-5 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:px-7">

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-sm font-black text-[#10251D]">
                          Order #{order.id}
                        </h3>

                        <StatusBadge status={order.status} />
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={14} />
                          {order.date}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Package size={14} />
                          {order.items.length} Products
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="sm:text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                          Order Total
                        </p>
                        <p className="mt-1 text-lg font-black text-[#10251D]">
                          {formatPrice(order.total)}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setExpandedOrder(
                            isExpanded ? null : order.id
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-[#00A86B] hover:text-[#00A86B]"
                        aria-label="Toggle order details"
                      >
                        {isExpanded ? (
                          <ChevronUp size={19} />
                        ) : (
                          <ChevronDown size={19} />
                        )}
                      </button>
                    </div>

                  </div>

                  {/* PRODUCTS PREVIEW */}
                  <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:px-7">

                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {order.items.slice(0, 3).map((item) => (
                          <img
                            key={item.id}
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded-xl border-2 border-white bg-gray-100 object-cover"
                          />
                        ))}
                      </div>

                      <div>
                        <p className="text-xs font-bold text-[#10251D]">
                          {order.items[0].name}
                          {order.items.length > 1 &&
                            ` + ${order.items.length - 1} more`}
                        </p>
                        <p className="mt-1 text-[11px] text-gray-400">
                          {order.items.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}{" "}
                          items in this order
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setExpandedOrder(
                          isExpanded ? null : order.id
                        )
                      }
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#00A86B] transition hover:text-[#002d22]"
                    >
                      {isExpanded ? "Hide Details" : "View Details"}
                      <ArrowRight size={15} />
                    </button>

                  </div>

                  {/* EXPANDED DETAILS */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-[#fbfdfc] p-5 sm:p-7">



                      <div className="grid gap-7 lg:grid-cols-2">

                        {/* ORDER ITEMS */}
                        <div>
                          <h4 className="mb-4 text-sm font-black text-[#10251D]">
                            Ordered Products
                          </h4>

                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-4"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-16 w-16 rounded-xl border border-gray-100 bg-white object-cover"
                                />

                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-bold text-[#10251D]">
                                    {item.name}
                                  </p>
                                  <p className="mt-1 text-[11px] text-gray-400">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>

                                <p className="text-xs font-bold text-[#10251D]">
                                  {formatPrice(item.price * item.quantity)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* ORDER INFORMATION */}
                        <div>
                          <h4 className="mb-4 text-sm font-black text-[#10251D]">
                            Order Information
                          </h4>

                          <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-5">

                            <div className="flex items-start gap-3">
                              <MapPin
                                size={17}
                                className="shrink-0 text-[#00A86B]"
                              />
                              <div>
                                <p className="text-xs font-bold text-[#10251D]">
                                  Delivery Address
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                  {order.address}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <CreditCard
                                size={17}
                                className="shrink-0 text-[#00A86B]"
                              />
                              <div>
                                <p className="text-xs font-bold text-[#10251D]">
                                  Payment Method
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                  {order.payment}
                                </p>
                              </div>
                            </div>

                            <div className="h-px bg-gray-100" />

                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">
                                Total
                              </span>
                              <span className="font-black text-[#10251D]">
                                {formatPrice(order.total)}
                              </span>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </article>
              );
            })
          )}

        </div>

        {/* BOTTOM LINK */}
        <div className="mt-10">
          <Link
            to="/account"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#00A86B]"
          >
            <ArrowLeft size={17} />
            Back to My Account
          </Link>
        </div>

      </div>
    </main>
  );
}
