import { Shield, Award, CheckCircle, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const TrustBadgesSection = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation();

  const badges = [
    {
      icon: Award,
      title: "Most Loved Wellness Program",
      subtitle: "2025 Health & Fitness Awards",
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      icon: Shield,
      title: "100% Secure & Private",
      subtitle: "Your data is encrypted",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: CheckCircle,
      title: "Clinically Backed Methods",
      subtitle: "Science-based approach",
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: Heart,
      title: "150,000+ Lives Changed",
      subtitle: "Real transformations",
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div 
        ref={ref}
        className={cn(
          "container mx-auto px-6 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4", badge.bg)}>
                <badge.icon className={cn("w-7 h-7", badge.color)} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{badge.title}</h3>
              <p className="text-gray-500 text-xs">{badge.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
