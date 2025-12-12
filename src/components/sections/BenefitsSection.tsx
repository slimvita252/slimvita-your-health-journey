import { Dumbbell, Users, LayoutDashboard, Headphones, Apple, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const BenefitsSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const benefits = [
    {
      icon: Dumbbell,
      title: t("benefits.1.title"),
      description: t("benefits.1.desc"),
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
    },
    {
      icon: Users,
      title: t("benefits.2.title"),
      description: t("benefits.2.desc"),
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
    },
    {
      icon: LayoutDashboard,
      title: t("benefits.3.title"),
      description: t("benefits.3.desc"),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    },
    {
      icon: Headphones,
      title: t("benefits.4.title"),
      description: t("benefits.4.desc"),
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80",
    },
    {
      icon: Apple,
      title: t("benefits.5.title"),
      description: t("benefits.5.desc"),
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
    },
    {
      icon: Target,
      title: t("benefits.6.title"),
      description: t("benefits.6.desc"),
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80",
    },
  ];

  return (
    <section id="beneficios" className="py-24 bg-white">
      <div ref={ref} className="container mx-auto px-6">
        {/* Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            {t("benefits.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            {t("benefits.title")}
          </h2>
          <p className="text-xl text-gray-600">
            {t("benefits.subtitle")}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={cn(
                "group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={benefit.image} 
                  alt={benefit.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
