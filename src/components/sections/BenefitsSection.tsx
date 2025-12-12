import { Dumbbell, Users, LayoutDashboard, HeadphonesIcon, Salad, Target } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const BenefitsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Dumbbell,
      title: t("benefits.1.title"),
      description: t("benefits.1.desc"),
    },
    {
      icon: Users,
      title: t("benefits.2.title"),
      description: t("benefits.2.desc"),
    },
    {
      icon: LayoutDashboard,
      title: t("benefits.3.title"),
      description: t("benefits.3.desc"),
    },
    {
      icon: HeadphonesIcon,
      title: t("benefits.4.title"),
      description: t("benefits.4.desc"),
    },
    {
      icon: Salad,
      title: t("benefits.5.title"),
      description: t("benefits.5.desc"),
    },
    {
      icon: Target,
      title: t("benefits.6.title"),
      description: t("benefits.6.desc"),
    },
  ];

  return (
    <section id="beneficios" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={ref} className={cn("text-center mb-16", isVisible && "animate-fade-in-up")}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            {t("benefits.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            {t("benefits.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            {t("benefits.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={cn(
                "group relative bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${(index + 1) * 80}ms` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
                  <benefit.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
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
