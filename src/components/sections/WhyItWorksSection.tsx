import { Brain, Target, Users, TrendingUp, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const WhyItWorksSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const reasons = [
    {
      icon: Brain,
      title: "Science-Based Approach",
      description: "Our programs are developed by certified nutritionists and fitness experts using peer-reviewed research.",
    },
    {
      icon: Target,
      title: "Personalized For You",
      description: "No generic plans. Every workout and meal is tailored to your body, goals, and lifestyle.",
    },
    {
      icon: Users,
      title: "Expert Support Team",
      description: "Real coaches available 24/7 to answer questions, adjust your plan, and keep you motivated.",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "94% of our users report measurable improvements within the first 30 days.",
    },
  ];

  const stats = [
    { value: "94%", label: "Report visible results in 30 days" },
    { value: "15lbs", label: "Average weight loss in 12 weeks" },
    { value: "89%", label: "Feel more energized daily" },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div ref={ref} className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image with Stats */}
          <div className={cn(
            "relative transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          )}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
                alt="Woman achieving fitness goals"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-semibold text-gray-900">Real Results</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
          )}>
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Why SlimVita Works
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              The Science Behind
              <span className="text-primary block">Your Transformation</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10">
              Unlike generic fitness apps, SlimVita combines behavioral science, personalized nutrition, and adaptive workouts to create lasting change—not quick fixes.
            </p>

            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <reason.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{reason.title}</h3>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorksSection;
