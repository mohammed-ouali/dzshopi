
import { ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export default function WelcomeBanner() {
  const message =
    "Welcome to DzShopi! Discover your favorite products and enjoy our special offers. Explore our store today!";

  return (
    <div className="w-full overflow-hidden bg-[#0B2E26] py-3 text-white">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[1, 2].map((group) => (
          <div
            key={group}
            aria-hidden={group === 2}
            className="flex shrink-0"
          >
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex shrink-0 items-center gap-2 px-6"
              >
                <ShoppingBag size={18} />
                <p className="whitespace-nowrap text-sm font-medium">
                  {message}
                </p>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
