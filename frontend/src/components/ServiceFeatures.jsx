
import { Truck, ShieldCheck, Headset } from "lucide-react";

const ServiceFeatures = () => {
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
      description: "We're Here to Help",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-5 mt-8">
      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <div key={index} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10
              border border-white/10 flex items-center justify-center">
              <Icon size={23} className="text-emerald-300" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">
                {feature.title}
              </h3>
              <p className="text-xs text-white/60 mt-1">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceFeatures;
