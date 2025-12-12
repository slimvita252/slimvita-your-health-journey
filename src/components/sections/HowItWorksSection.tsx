import { ClipboardCheck, Sparkles, Rocket, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HowItWorksSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const steps = [
    {
      number: "01",
      icon: ClipboardCheck,
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.desc"),
      image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=600&q=80",
      color: "from-blue-500 to-blue-600",
    },
    {
      number: "02",
      icon: Sparkles,
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.desc"),
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
      color: "from-primary to-primary-dark",
    },
    {
      number: "03",
      icon: Rocket,
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.desc"),
      image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=80",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div ref={ref} className="container mx-auto px-6">
        {/* Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-20 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            {t("howItWorks.badge")}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            {t("howItWorks.title")}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-20">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={cn(
                "grid lg:grid-cols-2 gap-12 items-center transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                index % 2 === 1 && "lg:flex-row-reverse"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className={cn("relative", index % 2 === 1 && "lg:order-2")}>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className={cn(
                  "absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl",
                  step.color
                )}>
                  <span className="text-3xl font-bold text-white">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className={cn(index % 2 === 1 && "lg:order-1")}>
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6",
                  step.color
                )}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {step.description}
                </p>
                {index === 2 && (
                  <Button asChild className="rounded-full px-8">
                    <Link to="/questionario">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
